import React, { useEffect, useState } from "react";
import { Empty, Pagination, Spin, Input, Switch } from "antd";
import { Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { Modal } from "react-bootstrap";
import AddPopupSettings from "./AddPopupSettings";
import { useSelector } from "react-redux";
// import EditPopup from "./EditPopup";
import { Tooltip } from "antd";
import Table from "react-bootstrap/Table";
import { PlusOutlined } from "@ant-design/icons";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";

const PopupSettings = () => {
  const [currentPagination, setCurrentPagination] = useState(1);
  const dispatch = useDispatch();
  const [isAddPopupModalOpen, setIsAddPopupModalOpen] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const { allLoading, addSuccess, deleteSuccess, popupList } = useSelector(
    (state) => state.popupSettingsReducer
  );
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch({
      type: "GET_ALL_POPUP_REQUEST",
      payload: {
        Page: 1,
        pageSize: 10,
        SearchKeywords: searchkeyword,
      },
    });
  }, []);
  useEffect(() => {
    if (addSuccess || deleteSuccess) {
      dispatch({
        type: "GET_ALL_POPUP_REQUEST",
        payload: {
          Page: 1,
          pageSize: 10,
          SearchKeywords: searchkeyword,
        },
      });
      setIsAddPopupModalOpen(false);
      setBulkSelected([]);
      setEditClicked(false);
    }
  }, [addSuccess, deleteSuccess]);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_POPUP_REQUEST",
      payload: {
        Page: 1,
        pageSize: 10,
        SearchKeywords: searchkeyword,
      },
    });
  }, [searchkeyword]);

  return (
    <>
      <Modal
        show={isAddPopupModalOpen || editClicked}
        onHide={() => {
          setIsAddPopupModalOpen(false);
          setEditClicked(false);
        }}
        size=""
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            {editClicked ? "Edit " : "Add "} Popup
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPopupSettings
            setIsAddPopupModalOpen={(val) => {
              setIsAddPopupModalOpen(val);
              setEditClicked(val);
            }}
            editClicked={editClicked}
          />
        </Modal.Body>
      </Modal>
      <div className="card">
        <div className="card-body">
          <div className="table-body">
            <div className="table-responsive">
              <div
                style={{
                  display: "flex",
                  margin: "0",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Button
                    icon={<PlusOutlined />}
                    style={{
                      background: "#03205B",
                      color: "white",

                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setIsAddPopupModalOpen(true);
                    }}
                  >
                    Add Popup
                  </Button>
                  {bulkSelected.length > 0 && (
                    <Button
                      onClick={() => {
                        dispatch({
                          type: "DELETE_POPUP_REQUEST",
                          payload: bulkSelected,
                        });
                      }}
                      style={{
                        background: "#EF2016",
                        color: "white",

                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "8px",
                      }}
                    >
                      <i
                        className="fas fa-trash-alt"
                        aria-hidden="true"
                        style={{ marginRight: "10px" }}
                      />
                      Delete
                    </Button>
                  )}
                </div>
                <div className="table_search">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text h-100 rounded-0"
                        id="search"
                      >
                        <i className="fas fa-search" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search now"
                      aria-label="search"
                      aria-describedby="search"
                      value={searchkeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      spellCheck="false"
                      data-ms-editor="true"
                    />
                  </div>
                </div>
              </div>
              {allLoading ? (
                <TableSkeleton />
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover  align-middle table-nowrap mb-0">
                    <thead>
                      <tr style={{ background: "#EFEFEE" }}>
                        <th>
                          {" "}
                          <input
                            className="form-check-input mt-2 catcheck"
                            type="checkbox"
                            checked={
                              popupList?.data?.length == bulkSelected.length
                            }
                            value={
                              popupList?.data?.length == bulkSelected.length
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBulkSelected(
                                  popupList?.data?.map((category) => {
                                    return {
                                      Id: category.id,
                                      Name: category.name,
                                    };
                                  })
                                );
                              } else {
                                setBulkSelected([]);
                              }
                            }}
                            id="defaultCheck1"
                          />
                        </th>
                        <th>Title</th>
                        <th>Button Label</th>
                        <th>Button Link</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {popupList?.data?.length > 0 ? (
                        popupList?.data?.map((popup) => {
                          return (
                            <tr key={popup.id}>
                              <td>
                                <input
                                  className="form-check-input mt-2 catcheck"
                                  type="checkbox"
                                  checked={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == popup.id
                                    )
                                      ? true
                                      : false
                                  }
                                  value={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == popup.id
                                    )
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    if (!e.target.checked) {
                                      setBulkSelected((prev) => {
                                        return prev.filter(
                                          (prevEach) => prevEach.Id != popup.id
                                        );
                                      });
                                    } else {
                                      setBulkSelected((prev) => {
                                        return [
                                          ...prev,
                                          {
                                            Id: popup.id,
                                            Name: popup.name,
                                          },
                                        ];
                                      });
                                    }
                                  }}
                                  id="defaultCheck1"
                                />
                              </td>
                              <td>{popup.title}</td>
                              <td>{popup.buttonLabel}</td>
                              <td>{popup.buttonLink}</td>
                              <td>
                                <Switch
                                  loading={allLoading}
                                  checked={popup.isActive}
                                  readOnly
                                />
                              </td>
                              <td>
                                <Tooltip title="Edit Popup">
                                  <a
                                    className="btn btn-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="left"
                                    style={{ marginRight: "5px" }}
                                    onClick={() => {
                                      dispatch({
                                        type: "EDIT_POPUP_REQUEST",
                                        payload: popup.id,
                                      });
                                      setEditClicked(true);
                                    }}
                                    data-bs-original-title="Edit"
                                  >
                                    <i
                                      className="fas fa-edit"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </Tooltip>
                                <Popconfirm
                                  okText="Yes"
                                  onConfirm={() => {
                                    dispatch({
                                      type: "DELETE_POPUP_REQUEST",
                                      payload: [
                                        {
                                          Id: popup.id,
                                        },
                                      ],
                                    });
                                  }}
                                  cancelText="No"
                                  title="Are you sure you want to delete?"
                                >
                                  <Tooltip title="Delete Popup">
                                    <a
                                      className="btn btn-danger btn-sm"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="left"
                                      title=""
                                      onClick={(e) => e.preventDefault()}
                                      data-bs-original-title="Delete"
                                    >
                                      <i
                                        className="fas fa-trash-alt"
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </Tooltip>
                                </Popconfirm>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td align="center" colSpan={6}>
                            {" "}
                            No Records Found !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="company_footer d-flex justify-content-end mt-3">
              <Pagination
                total={popupList?.total ? popupList?.total : 2}
                pageSize={10}
                current={currentPagination}
                onChange={(val) => setCurrentPagination(val)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupSettings;

import React, { useEffect, useState } from "react";
import { Empty, Pagination, Spin, Input } from "antd";
import { Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { Modal } from "react-bootstrap";
import AddFranchise from "./AddFranchise";
import { useSelector } from "react-redux";
import EditFranchise from "./EditFranchise";
import { Tooltip } from "antd";
import Table from "react-bootstrap/Table";
import { PlusOutlined } from "@ant-design/icons";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";
const { Search } = Input;

const FranchiseSetting = () => {
  const [currentPagination, setCurrentPagination] = useState(1);
  const dispatch = useDispatch();
  const [isAddFranchiseOpen, setIsFranchiseOpen] = useState(false);
  const { isLoading, isOperatioSuccessful, franchiseList } = useSelector(
    (state) => state.superAdminReducer
  );
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("");
  const [isEditFranchiseOpen, setIsEditFranchiseOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isPreviewImageoPne, setIsPreviewImageOpen] = useState();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (isOperatioSuccessful) {
      dispatch({
        type: "GET_ALL_FRANCHISE_REQUEST",
        payload: {
          Page: 1,
          pageSize: 10,
          ExternalFilter: { Id: "", Name: "" },
          SearhcKeywords: searchkeyword,
        },
      });
      setIsEditFranchiseOpen(false);
      setIsFranchiseOpen(false);
      setBulkSelected([]);
    }
  }, [isOperatioSuccessful]);
  useEffect(() => {
    if (searchkeyword) {
      const searchTimeout = setTimeout(() => {
        dispatch({
          type: "GET_ALL_FRANCHISE_REQUEST",
          payload: {
            Page: 1,
            pageSize: 10,
            ExternalFilter: { Id: "", Name: "" },
            SearchKeywords: searchkeyword,
          },
        });
      }, 500);
      return () => {
        clearTimeout(searchTimeout);
      };
    } else {
      dispatch({
        type: "GET_ALL_FRANCHISE_REQUEST",
        payload: {
          Page: 1,
          pageSize: 10,
          ExternalFilter: { Id: "", Name: "" },
          SearchKeywords: searchkeyword,
        },
      });
    }
  }, [searchkeyword]);

  return (
    <>
      <Modal
        show={isEditFranchiseOpen}
        onHide={() => {
          setIsEditFranchiseOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Edit Franchise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditFranchise
            setIsEditFranchiseOpen={setIsEditFranchiseOpen}
            activeItem={activeItem}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={isAddFranchiseOpen}
        onHide={() => {
          setIsFranchiseOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Add Franchise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddFranchise setIsFranchiseOpen={setIsFranchiseOpen} />
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
                    s
                    style={{
                      background: "#00205A",
                      color: "white",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setIsFranchiseOpen(true);
                    }}
                  >
                    Add Franchise
                  </Button>
                  {bulkSelected.length > 0 && (
                    <Popconfirm
                      onConfirm={() => {
                        dispatch({
                          type: "DELETE_FRANCHISE_REQUEST",
                          payload: bulkSelected,
                        });
                      }}
                      cancelText="No"
                      title="Are you sure you want to delete?"
                    >
                      <Button
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
                    </Popconfirm>
                  )}
                </div>
                <Search
                  style={{ width: "28%" }}
                  placeholder="Search For Banner"
                  onSearch={() => {}}
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                  }}
                  enterButton="Search"
                />
              </div>

              {isLoading ? (
                <TableSkeleton />
              ) : (
                <Table bordered hover className="table-banner">
                  <thead>
                    <tr style={{ background: "#EFEFEE" }}>
                      <th>
                        {" "}
                        <input
                          className="form-check-input mt-2 catcheck"
                          type="checkbox"
                          checked={
                            franchiseList?.data?.length == bulkSelected.length
                          }
                          value={
                            franchiseList?.data?.length == bulkSelected.length
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBulkSelected(
                                franchiseList?.data?.map((category) => {
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
                      <th>Name</th>
                      <th>Template</th>
                      <th>Url</th>
                      <th>Franchise Location Count</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {franchiseList?.data?.length > 0 ? (
                      franchiseList?.data?.map((franchise) => {
                        return (
                          <tr key={franchise.id}>
                            <td style={{ textAlign: "center" }}>
                              <input
                                className="form-check-input mt-2 catcheck"
                                type="checkbox"
                                checked={
                                  bulkSelected.find(
                                    (eachPrev) => eachPrev.Id == franchise.id
                                  )
                                    ? true
                                    : false
                                }
                                value={
                                  bulkSelected.find(
                                    (eachPrev) => eachPrev.Id == franchise.id
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  if (!e.target.checked) {
                                    setBulkSelected((prev) => {
                                      return prev.filter(
                                        (prevEach) =>
                                          prevEach.Id != franchise.id
                                      );
                                    });
                                  } else {
                                    setBulkSelected((prev) => {
                                      return [
                                        ...prev,
                                        {
                                          Id: franchise.id,
                                          Name: franchise.name,
                                        },
                                      ];
                                    });
                                  }
                                }}
                                id="defaultCheck1"
                              />
                            </td>
                            <td>{franchise.name}</td>
                            <td>{franchise.templateName}</td>
                            <td>{franchise.url}</td>

                            <td>{franchise.franchiseLocationMaxCount}</td>

                            <td>
                              <Tooltip title="Edit Banner">
                                <a
                                  className="btn btn-info btn-sm"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="left"
                                  onClick={(e) => {
                                    setActiveItem(franchise);
                                    setIsEditFranchiseOpen(true);
                                  }}
                                  style={{ marginRight: "5px" }}
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
                                    type: "DELETE_FRANCHISE_REQUEST",
                                    payload: [
                                      {
                                        Id: franchise.id,
                                        Name: franchise.name,
                                      },
                                    ],
                                  });
                                }}
                                cancelText="No"
                                title="Are you sure you want to delete?"
                              >
                                <Tooltip title="Delete Banner">
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
                        <td align="center" colSpan={7}>
                          {" "}
                          No Records Found !
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </div>
            <div className="company_footer d-flex justify-content-end mt-3">
              <Pagination
                total={franchiseList?.total ? franchiseList?.total : 2}
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

export default FranchiseSetting;

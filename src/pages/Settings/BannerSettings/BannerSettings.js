import React, { useEffect, useState } from "react";
import { Empty, Pagination, Spin, Input } from "antd";
import { Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { Modal } from "react-bootstrap";
import AddBannerSettings from "./AddBannerSettings";
import { useSelector } from "react-redux";
import EditBanner from "./EditBanner";
import { Tooltip } from "antd";
import Table from "react-bootstrap/Table";
import { PlusOutlined } from "@ant-design/icons";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";
const { Search } = Input;

const BannerSettings = () => {
  const [currentPagination, setCurrentPagination] = useState(1);
  const dispatch = useDispatch();
  const [isAddBannerModalOpen, setIsAddBannerModalOpen] = useState(false);
  const { isLoading, isOperatioSuccessful, bannersList } = useSelector(
    (state) => state.bannerSettingsReducer
  );
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("");
  const [isEditBannerOpen, setIsEditBannerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isPreviewImageoPne, setIsPreviewImageOpen] = useState();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_BANNERS_REQUEST",
      payload: {
        Page: 1,
        pageSize: 10,
        ExternalFilter: { Id: "", Name: "" },
        SearhcKeywords: searchkeyword,
      },
    });
  }, []);
  useEffect(() => {
    if (isOperatioSuccessful) {
      dispatch({
        type: "GET_ALL_BANNERS_REQUEST",
        payload: {
          Page: 1,
          pageSize: 10,
          ExternalFilter: { Id: "", Name: "" },
          SearhcKeywords: searchkeyword,
        },
      });
      setIsEditBannerOpen(false);
      setIsAddBannerModalOpen(false);
      setBulkSelected([]);
    }
  }, [isOperatioSuccessful]);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_BANNERS_REQUEST",
      payload: {
        Page: 1,
        pageSize: 10,
        ExternalFilter: { Id: "", Name: "" },
        SearhcKeywords: searchkeyword,
      },
    });
  }, [searchkeyword]);

  return (
    <>
      <Modal
        show={isPreviewImageoPne}
        onHide={() => {
          setIsPreviewImageOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Preview Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={activeImage}
            style={{ margin: "auto", height: "400px", width: "100%" }}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={isEditBannerOpen}
        onHide={() => {
          setIsEditBannerOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Edit Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditBanner
            setIsEditBannerOpen={setIsEditBannerOpen}
            activeItem={activeItem}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={isAddBannerModalOpen}
        onHide={() => {
          setIsAddBannerModalOpen(false);
        }}
        size=""
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Add Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddBannerSettings
            setIsAddBannerModalOpen={setIsAddBannerModalOpen}
          />
        </Modal.Body>
      </Modal>
      {/* <h6
        className="fw-bold text-theme"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <span> Online Banner Settings </span>
      </h6> */}

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
                      setIsAddBannerModalOpen(true);
                    }}
                  >
                    Add Banner
                  </Button>{" "}
                  {bulkSelected.length > 0 && (
                    <Button
                      onClick={() => {
                        dispatch({
                          type: "DELETE_BANNER_REQUEST",
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
              {isLoading ? (
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
                              bannersList?.data?.length == bulkSelected.length
                            }
                            value={
                              bannersList?.data?.length == bulkSelected.length
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBulkSelected(
                                  bannersList?.data?.map((category) => {
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
                        <th>Url</th>
                        <th>Image</th>
                        <th>Banner Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bannersList?.data?.length > 0 ? (
                        bannersList?.data?.map((banner) => {
                          return (
                            <tr key={banner.id}>
                              <td>
                                <input
                                  className="form-check-input mt-2 catcheck"
                                  type="checkbox"
                                  checked={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == banner.id
                                    )
                                      ? true
                                      : false
                                  }
                                  value={
                                    bulkSelected.find(
                                      (eachPrev) => eachPrev.Id == banner.id
                                    )
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    if (!e.target.checked) {
                                      setBulkSelected((prev) => {
                                        return prev.filter(
                                          (prevEach) => prevEach.Id != banner.id
                                        );
                                      });
                                    } else {
                                      setBulkSelected((prev) => {
                                        return [
                                          ...prev,
                                          {
                                            Id: banner.id,
                                            Name: banner.name,
                                          },
                                        ];
                                      });
                                    }
                                  }}
                                  id="defaultCheck1"
                                />
                              </td>
                              <td>{banner.name}</td>
                              <td>{banner.url}</td>
                              <td>
                                <img
                                  style={{ width: "50px", height: "50px" }}
                                  src={banner.image}
                                  onClick={() => {
                                    setIsPreviewImageOpen(true);
                                    setActiveImage(banner.image);
                                  }}
                                />
                              </td>
                              <td>{banner.adsType}</td>
                              <td>
                                <Tooltip title="Edit Banner">
                                  <a
                                    className="btn btn-info btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="left"
                                    onClick={(e) => {
                                      dispatch({
                                        type: "EDIT_BANNER_REQUEST",
                                        payload: banner.id,
                                      });
                                      setIsEditBannerOpen(true);
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
                                      type: "DELETE_BANNER_REQUEST",
                                      payload: [
                                        {
                                          Id: banner.id,
                                          Name: banner.name,
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
                total={bannersList?.total ? bannersList?.total : 2}
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

export default BannerSettings;

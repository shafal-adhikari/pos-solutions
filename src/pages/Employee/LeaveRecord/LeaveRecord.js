import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Button, Popconfirm } from "antd";
import AddLeaveRecord from "../AddLeaveRecord/AddLeaveRecord";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { dayjs } from "../../../helpers/frontendHelper";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";
import SendForApproval from "../../Suppliers/SendForApproval";
function LeaveRecord() {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState();
  useEffect(() => {
    dispatch({
      type: "GET_ALL_LEAVE_RECORD_STATUS_REQUEST",
    });
  }, []);
  const {
    leaveRecordStatusList,
    allLeaveRecords,
    totalLeaveRecords,
    deleteSuccess,
    addSuccess,
    allLoading,
  } = useSelector((state) => state.leaveRecordsReducer);
  const {
    activeStore: { dateFormat },
  } = useSelector((state) => state.authenticationReducer);
  const [searchkeyword, setSearchKeyword] = useState();
  useLayoutEffect(() => {
    if (leaveRecordStatusList) setSelectedStatus(leaveRecordStatusList[0]);
  }, [leaveRecordStatusList]);
  useEffect(() => {
    if (addSuccess) {
      setIsAddClicked(false);
      setIsEditClicked(false);
    }
  }, [addSuccess]);
  useEffect(() => {
    if (selectedStatus)
      dispatch({
        type: "GET_ALL_LEAVE_RECORDS_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: { StatusId: selectedStatus.id },
        },
      });
  }, [selectedStatus]);
  //   useEffect(() => {
  //     if (selectedStatus) {
  //       dispatch({
  //         type: "GET_ALL_PURCHASE_ORDER_REQUEST",
  //         payload: {
  //           Page: 1,
  //           PageSize: 10,
  //           SearchKeywords: "",
  //           ExternalFilter: { StatusId: selectedStatus.id },
  //         },
  //       });
  //     }
  //   }, [selectedStatus, deleteSuccess, addSuccess]);
  //   useEffect(() => {
  //     if (searchkeyword) {
  //       const searchTimeout = setTimeout(() => {
  //         dispatch({
  //           type: "GET_ALL_PURCHASE_ORDER_REQUEST",
  //           payload: {
  //             Page: 1,
  //             PageSize: 10,
  //             SearchKeywords: searchkeyword,
  //             ExternalFilter: { StatusId: selectedStatus?.id },
  //           },
  //         });
  //       }, [400]);
  //       return () => clearTimeout(searchTimeout);
  //     }
  //   }, [searchkeyword]);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    // setPageSize(pageSize);

    dispatch({
      type: "GET_ALL_PURCHASE_ORDER_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
        ExternalFilter: { StatusId: selectedStatus.id },
      },
    });
  }
  const [bulkSelected, setBulkSelected] = useState([]);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  return (
    <>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap align-items-center">
            <div className="d-flex align-items-end flex-wrap">
              <div className="d-flex align-items-center mb-3">
                {(isEditClicked || isAddClicked) && (
                  <BsFillArrowLeftCircleFill
                    size={22}
                    className="me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsAddClicked(false);
                      setIsEditClicked(false);
                    }}
                  />
                )}
                <h4 className="fw-bold m-0">
                  {isEditClicked && "Edit "} {isAddClicked && "Add "}Leave
                  Record
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditClicked || isAddClicked ? (
        <AddLeaveRecord
          editClicked={isEditClicked}
          setIsAddClicked={setIsAddClicked}
          setIsEditClicked={setIsEditClicked}
        />
      ) : (
        <>
          <div className="row project-tabs">
            <div className="col-md-12">
              {/* {allLoading ? (
            <Skeleton count={0.4} height={30} className="mb-2" />
          ) : ( */}
              <nav>
                <div className="nav nav-tabs pb-0" id="nav-tab" role="tablist">
                  {leaveRecordStatusList?.map((status) => {
                    const isActive = status.id == selectedStatus?.id;
                    return (
                      <a
                        key={status.id}
                        className={`nav-item nav-link ${isActive && "active"}`}
                        onClick={() => setSelectedStatus(status)}
                      >
                        {status.value}
                      </a>
                    );
                  })}
                </div>
              </nav>
              {/* )} */}

              <div className="tab-content" id="nav-tabContent">
                <div
                  id="nav-all"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="card rounded-0">
                    <div className="card-body">
                      <div className="table_card d-flex justify-content-between">
                        <div className="table_btn mb-3 d-flex">
                          <a
                            onClick={() => setIsAddClicked(true)}
                            className="btn btn- all_btn text-white"
                          >
                            Add Leave
                          </a>
                          {bulkSelected.length > 0 && (
                            <Popconfirm
                              onConfirm={() => {
                                dispatch({
                                  type: "DELETE_PURCHASE_ORDER_REQUEST",
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
                        <div className="table_search">
                          <div className="input-group ">
                            <div className="input-group-prepend ">
                              <span
                                className="input-group-text  h-100 rounded-0"
                                id="search"
                              >
                                <i className="fas fa-search" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search now"
                              value={searchkeyword}
                              onChange={(e) => setSearchKeyword(e.target.value)}
                              aria-label="search"
                              aria-describedby="search"
                            />
                          </div>
                        </div>
                      </div>
                      {allLoading ? (
                        <>
                          <div className="m-2">
                            <TableSkeleton column={7} row={2} />
                          </div>
                          <div className="p-2"></div>
                        </>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-hover  align-middle table-nowrap mb-0">
                            <thead>
                              <tr className="table-light">
                                <th>
                                  <input
                                    className="form-check-input mt-2 catcheck"
                                    type="checkbox"
                                    checked={
                                      allLeaveRecords?.length ==
                                      bulkSelected.length
                                    }
                                    value={
                                      allLeaveRecords?.length ==
                                      bulkSelected.length
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setBulkSelected(
                                          allLeaveRecords?.map(
                                            (purchaseOrder) => {
                                              return {
                                                Id: purchaseOrder.id,
                                                Name: purchaseOrder.name,
                                              };
                                            }
                                          )
                                        );
                                      } else {
                                        setBulkSelected([]);
                                      }
                                    }}
                                    id="defaultCheck1"
                                  />
                                </th>
                                <th>Name</th>
                                <th>No. of Days</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Action</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {!allLeaveRecords ||
                              allLeaveRecords?.length < 1 ? (
                                <tr style={{ textAlign: "center" }}>
                                  <td colSpan={8}>No Records Found</td>
                                </tr>
                              ) : (
                                allLeaveRecords?.map((leaveRecord) => {
                                  return (
                                    <tr key={leaveRecord.id}>
                                      <td>
                                        <input
                                          className="form-check-input mt-2 catcheck"
                                          type="checkbox"
                                          checked={
                                            bulkSelected.find(
                                              (eachPrev) =>
                                                eachPrev.Id == leaveRecord.id
                                            )
                                              ? true
                                              : false
                                          }
                                          value={
                                            bulkSelected.find(
                                              (eachPrev) =>
                                                eachPrev.Id == leaveRecord.id
                                            )
                                              ? true
                                              : false
                                          }
                                          onChange={(e) => {
                                            if (!e.target.checked) {
                                              setBulkSelected((prev) => {
                                                return prev.filter(
                                                  (prevEach) =>
                                                    prevEach.Id !=
                                                    leaveRecord.id
                                                );
                                              });
                                            } else {
                                              setBulkSelected((prev) => {
                                                return [
                                                  ...prev,
                                                  {
                                                    Id: leaveRecord.id,
                                                    Name: leaveRecord.name,
                                                  },
                                                ];
                                              });
                                            }
                                          }}
                                          id="defaultCheck1"
                                        />
                                      </td>
                                      <td>
                                        <a
                                          onClick={() => {
                                            dispatch({
                                              type: "EDIT_PURCHASE_ORDER_REQUEST",
                                              payload: leaveRecord.id,
                                            });
                                            setIsEditClicked(true);
                                          }}
                                        >
                                          {leaveRecord.name}
                                        </a>
                                      </td>
                                      <td>
                                        {dayjs(leaveRecord.endDate).diff(
                                          leaveRecord.startDate,
                                          "day"
                                        )}
                                      </td>
                                      <td>
                                        {
                                          dayjs(leaveRecord.startDate)
                                            .format(dateFormat.toUpperCase())
                                            .split(" ")[0]
                                        }
                                      </td>
                                      <td>
                                        {
                                          dayjs(leaveRecord.endDate)
                                            .format(dateFormat.toUpperCase())
                                            .split(" ")[0]
                                        }
                                      </td>
                                      <td>
                                        <a className="btn btn-success btn-sm text-white">
                                          <i
                                            className="fas fa-eye"
                                            aria-hidden="true"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="left"
                                            title=""
                                            data-bs-original-title="View"
                                          />
                                        </a>
                                        <a
                                          className="btn btn-info btn-sm ms-1"
                                          onClick={() => {
                                            dispatch({
                                              type: "EDIT_LEAVE_RECORD_REQUEST",
                                              payload: leaveRecord.id,
                                            });
                                            setIsEditClicked(true);
                                          }}
                                        >
                                          <i
                                            className="fas fa-edit"
                                            aria-hidden="true"
                                          />
                                        </a>
                                        <Popconfirm
                                          title={
                                            "Are you sure you want to delete"
                                          }
                                          okText="Yes"
                                          cancelText="No"
                                          onConfirm={() => {
                                            dispatch({
                                              type: "DELETE_LEAVE_RECORD_REQUEST",
                                              payload: [
                                                {
                                                  id: leaveRecord.id,
                                                  name: leaveRecord.name,
                                                },
                                              ],
                                            });
                                          }}
                                        >
                                          <a className="btn btn-danger btn-sm text-white ms-1">
                                            <i
                                              className="fas fa-trash"
                                              aria-hidden="true"
                                            />
                                          </a>
                                        </Popconfirm>
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </table>
                          <div className="justify-content-end d-flex pt-3">
                            <Pagination
                              total={totalLeaveRecords}
                              showSizeChanger
                              showTotal={(total, range) =>
                                `${
                                  allLeaveRecords ? allLeaveRecords.length : 0
                                } out of ${total ? total : 0} items`
                              }
                              onShowSizeChange={onShowSizeChange}
                              defaultCurrent={1}
                              onChange={onShowSizeChange}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Purchase Order tab ends here */}
    </>
  );
}

export default LeaveRecord;

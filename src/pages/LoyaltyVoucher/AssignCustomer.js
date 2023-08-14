/** @format */

import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";

const AssignCustomer = ({ setIsAddGroupModalVisible }) => {
  const dispatch = useDispatch();
  const { allCustomers, totalCustomers, isLoading } = useSelector(
    (state) => state.loyaltyReducer
  );
  const {
    assignCustomerSectionList,
    isOperatioSuccessful,
    assignCustomerLoading,
  } = useSelector((state) => state.loyaltyReducer);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    if (searchKeyword) {
      const searchTimeout = setTimeout(() => {
        dispatch({
          type: "GET_ALL_VOUCHER_CUSTOMER_REQUEST",
          payload: {
            Page: 1,
            pageSize: 10,
            ExternalFilter: { Id: "", Name: "" },
            SearchKeywords: searchKeyword,
          },
        });
      }, 500);
      return () => {
        clearTimeout(searchTimeout);
      };
    } else {
      dispatch({
        type: "GET_ALL_VOUCHER_CUSTOMER_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          SearchKeywords: "",
          ExternalFilter: { Id: "", Name: "" },
        },
      });
    }
  }, [searchKeyword]);

  useEffect(() => {
    dispatch({
      type: "GET_ASSIGN_GROUP_SECTION_LIST_REQUEST",
    });
  }, []);
  // console.log(
  //   selectedGroups,
  //   bulkSelected.map((item) => item.Id)
  // );
  const assignCustomerHandler = () => {
    // console.log("safajkldfas");
    dispatch({
      type: "ASSIGN_CUSTOMER_TO_GROUP_REQUEST",
      payload: {
        GroupIds: selectedGroups,
        CustomerIds: bulkSelected.map((item) => item.Id),
      },
    });
  };
  useEffect(() => {
    if (isOperatioSuccessful) {
      setBulkSelected([]);
      setSelectedGroups([]);
    }
  }, [isOperatioSuccessful]);
  return (
    <div className="card rounded-0 group-voucher-select">
      <div className="card-body">
        <div className="table_card d-flex justify-content-between">
          <div className="table_btn mb-3">
            <Select
              mode="multiple"
              showArrow={true}
              placeholder="Please select groups"
              onChange={(e) => {
                setSelectedGroups(e);
              }}
              style={{ width: "100%", minWidth: "250px", maxWidth: "450px" }}
              options={assignCustomerSectionList?.voucherGroups?.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })}
            />
          </div>
          <div className="table_search">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text rounded-0" id="search">
                  <i className="mdi mdi-magnify" />
                </span>
              </div>
              <input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                type="text"
                className="form-control rounded-0"
                placeholder="Search now"
                aria-label="search"
                aria-describedby="search"
              />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          {isLoading ? (
            <TableSkeleton row={2} column={5} />
          ) : (
            <table className="table table-hover align-middle table-nowrap mb-0">
              <thead>
                <tr className="table-light">
                  <th>
                    <div className="form-check">
                      <input
                        className="form-check-input mt-2 catcheck"
                        type="checkbox"
                        checked={allCustomers?.length == bulkSelected.length}
                        value={allCustomers?.length == bulkSelected.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkSelected(
                              allCustomers?.map((customer) => {
                                return {
                                  Id: customer.id,
                                  Name: customer.name,
                                };
                              })
                            );
                          } else {
                            setBulkSelected([]);
                          }
                        }}
                        id="defaultCheck1"
                      />
                    </div>
                  </th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Postal Code</th>
                </tr>
              </thead>
              <tbody>
                {allCustomers && allCustomers.length > 0 ? (
                  allCustomers?.map((customer) => {
                    return (
                      <tr key={customer.id}>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input mt-2 catcheck"
                              type="checkbox"
                              checked={
                                bulkSelected.find(
                                  (eachPrev) => eachPrev.Id == customer.id
                                )
                                  ? true
                                  : false
                              }
                              value={
                                bulkSelected.find(
                                  (eachPrev) => eachPrev.Id == customer.id
                                )
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  setBulkSelected((prev) => {
                                    return prev.filter(
                                      (prevEach) => prevEach.Id != customer.id
                                    );
                                  });
                                } else {
                                  setBulkSelected((prev) => {
                                    return [
                                      ...prev,
                                      {
                                        Id: customer.id,
                                        Name: customer.name,
                                      },
                                    ];
                                  });
                                }
                              }}
                              id="defaultCheck1"
                            />
                          </div>
                        </td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.postalCode}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan={7}>No Customers Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="add_btn mt-3">
          <div className="col-md-12 d-flex">
            <Button
              loading={assignCustomerLoading}
              onClick={(e) => {
                e.preventDefault();
                assignCustomerHandler();
              }}
              // htmlType="submit"
              type="primary"
              className="btn btn-success btn-sm bg-theme border-0"
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setIsAddGroupModalVisible(false);
              }}
              type="danger"
              style={{ marginLeft: "5px" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignCustomer;

import { Spin, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ViewCustomerLoyalty from "./ViewCustomerLoyalty";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";

const Loyalty = () => {
  const dispatch = useDispatch();
  const { activeStore } = useSelector((state) => state.authenticationReducer);
  const { isLoading, allLoyaltyList } = useSelector(
    (state) => state.loyaltyReducer
  );
  const [customerId, setCustomerId] = useState("");
  const [isViewCustomerLoyaltyOpen, setIsViewCustomerLoyaltyOpen] =
    useState(false);

  useEffect(() => {
    dispatch({
      type: "GET_LOYALTY_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
        ExternalFilter: {},
      },
    });
  }, []);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_LOYALTY_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
        ExternalFilter: {},
      },
    });
  }
  return (
    <div
      className="tab-pane fade show active"
      id="v-pills-enrolloyalty"
      role="tabpanel"
      aria-labelledby="v-pills-enrolloyalty-tab"
    >
      <Modal
        show={isViewCustomerLoyaltyOpen}
        onHide={() => {
          setIsViewCustomerLoyaltyOpen(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            Customers Loyalty Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewCustomerLoyalty customerId={customerId} />
        </Modal.Body>
      </Modal>
      <div className="enrolloyalty_top">
        <div className="card">
          <div className="card-body">
            <div className="table_card d-flex justify-content-end align-items-center mb-3">
              <div className="table_search">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="search">
                      <i className="mdi mdi-magnify" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Items Here"
                    aria-label="search"
                    aria-describedby="search"
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                </div>
              </div>
            </div>
            <div className="table-body">
              <div className="table-responsive">
                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  <table className="table table-hover align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Redeem Points</th>
                        <th scope="col">Redeem Amount</th>
                        <th scope="col">Accured Points</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allLoyaltyList?.data?.length > 0 ? (
                        allLoyaltyList?.data?.map((item) => (
                          <tr key={item.id}>
                            <td>{item.customerName}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.email}</td>
                            <td>{item.reedemPoints}</td>
                            <td>
                              {activeStore?.currencySymbol} {item.reedemAmount}
                            </td>
                            <td>{item.accuredPoints}</td>
                            <td>
                              <a
                                onClick={() => {
                                  setIsViewCustomerLoyaltyOpen(true);
                                  setCustomerId(item.id);
                                }}
                              >
                                <i
                                  className="fas fa-eye"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="Add New Item Type From Here"
                                />
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td align="center" colSpan={7}>
                            No Records Found !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="company_footer d-flex justify-content-between mt-3">
                <div className="table_btn"></div>
                <div className="company_footer d-flex justify-content-end mt-3">
                  <Pagination
                    total={allLoyaltyList?.total ? allLoyaltyList?.total : 2}
                    showTotal={(total, range) =>
                      `${
                        allLoyaltyList ? allLoyaltyList?.data?.length : 0
                      } out of ${total} items`
                    }
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    onChange={onShowSizeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;

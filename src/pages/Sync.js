import { Button, Form, Select } from "antd";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../components/FormItemSkeleton/FormItemSkeleton";
function Sync() {
  const dispatch = useDispatch();
  const { syncLoading, syncSectionList, isLoading } = useSelector(
    (state) => state.syncReducer
  );
  useEffect(() => {
    dispatch({
      type: "GET_SYNC_SECTION_REQUEST",
    });
  }, []);
  const syncHandler = (values) => {
    dispatch({
      type: "SYNC_PRODUCT_REQUEST",
      payload: {
        SyncFrom: {
          StoreChannelId: values.syncFrom,
        },
        SyncTo: {
          StoreChannelId: values.syncTo,
        },
      },
    });
  };
  return (
    <div className="container-fluid page-body-wrapper1">
      <div className=" main_panel_inner">
        <div className="content-wrapper">
          <div className="content">
            <div className="row  d-flex justify-content-center">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="breadcrumb_top ">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-custom">
                      <Link to="/" className="breadcrumb-item fw-bold">
                        Home
                      </Link>
                      <li
                        className="breadcrumb-item active fw-bold"
                        aria-current="page"
                      >
                        <span>Sync</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="menu_Sync">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-8">
                  <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                      <h2 className="text-center fw-bold">
                        Sync all your Products
                        <br className="hide-when-mobile" /> From One Channel to
                        Another.
                      </h2>
                      <p className="fw-bold fs-6">
                        Where you can sync your menu from online order system
                        and update or where on trial version is provided by the
                        company.
                      </p>
                    </div>
                  </div>
                  <Form onFinish={syncHandler}>
                    <div className="row justify-content-center categoryField">
                      <div className="col-12 col-md-12">
                        <div className="card px-2 py-3 p-md-4 border-0  mt-4">
                          {isLoading ? (
                            <div className="row">
                              <div className="col-md-6 col-lg-6">
                                <div className="form-group">
                                  <FormItemSkeleton />
                                </div>
                              </div>
                              <div className="col-md-6 col-lg-6">
                                <div className="form-group">
                                  <FormItemSkeleton />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <Skeleton count={1} height={30} />
                              </div>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-md-6 col-lg-6">
                                <div className="form-group">
                                  <Form.Item
                                    label="Sync From"
                                    name="syncFrom"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please select the channel to sync",
                                      },
                                    ]}
                                  >
                                    <Select
                                      placeholder="Sync From"
                                      options={syncSectionList?.channels.map(
                                        (channel) => {
                                          return {
                                            label: channel.value,
                                            value: channel.id,
                                          };
                                        }
                                      )}
                                    ></Select>
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-md-6 col-lg-6">
                                <div className="form-group">
                                  <Form.Item
                                    label="Sync To"
                                    name="syncTo"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please select the channel to sync",
                                      },
                                    ]}
                                  >
                                    <Select
                                      placeholder="Sync To"
                                      options={syncSectionList?.channels.map(
                                        (channel) => {
                                          return {
                                            label: channel.value,
                                            value: channel.id,
                                          };
                                        }
                                      )}
                                    ></Select>
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <Button
                                  type="primary"
                                  loading={syncLoading}
                                  htmlType="submit"
                                >
                                  Sync Now
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          {/* End Content */}
        </div>
        {/* End Content Wrapper */}
        {/* content-wrapper ends */}
        {/* partial:partials/_footer.html */}
        <footer className="footer">
          <div className="container-fluid clearfix">
            <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
              Copyright © POSApt 2022
            </span>
          </div>
        </footer>
        {/* partial */}
      </div>
    </div>
  );
}

export default Sync;

import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import GetStarted from "./GetStarted";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

function Integeration() {
  const dispatch = useDispatch();
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const { accountingIntegerationList, isLoading } = useSelector(
    (state) => state.integerationReducer
  );
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    dispatch({
      type: "GET_ACCOUNTING_INTEGERATION_REQUEST",
    });
  }, []);
  return (
    <div className="container-fluid page-body-wrapper1">
      {/* partial:partials/_sidebar.html */}
      {/* Sidebar */}
      {/* End sidebar */}
      {/* partial */}
      <Modal
        show={isGetStartedOpen}
        onHide={() => {
          setIsGetStartedOpen(false);
        }}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>
            {activeItem?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GetStarted activeItem={activeItem} />
        </Modal.Body>
      </Modal>

      <div className="main_panel_inner">
        <div className="content-wrapper">
          <div className="content">
            {/* main Breadcrumb Area */}
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="breadcrumb_top">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-custom">
                      <Link to="/" className="breadcrumb-item fw-bold">
                        Home
                      </Link>
                      <li
                        className="breadcrumb-item active fw-bold"
                        aria-current="page"
                      >
                        <span>Integration</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="menu_integration">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-8">
                  <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                      <h2 className="text-center fw-bold">
                        Sync all your apps
                        <br className="hide-when-mobile" />
                        with VolgAI
                      </h2>
                      <p className="fw-bold fs-6">
                        From accounting apps and eCommerce solutions to
                        inventory and employee management, Square works with
                        apps for any need.
                      </p>
                    </div>
                  </div>
                  {isLoading ? (
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-6">
                        <div className="card px-2 py-3 p-md-4 border-0 mt-4">
                          <div className="row">
                            <div className="col-3 col-md-3 text-center">
                              <Skeleton circle={true} height={50} width={50} />
                            </div>
                            <div className="col-9 col-md-9">
                              <h6 className="fw-bold">
                                <Skeleton />
                              </h6>
                              <p>
                                <Skeleton />
                              </p>

                              <Skeleton />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="card px-2 py-3 p-md-4 border-0 mt-4">
                          <div className="row">
                            <div className="col-3 col-md-3 text-center">
                              <Skeleton circle={true} height={50} width={50} />
                            </div>
                            <div className="col-9 col-md-9">
                              <h6 className="fw-bold">
                                <Skeleton />
                              </h6>
                              <p>
                                <Skeleton />
                              </p>

                              <Skeleton />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row justify-content-center">
                      {accountingIntegerationList?.accountingPlatForms?.map(
                        (item) => (
                          <div className="col-12 col-md-6" key={item.id}>
                            <div className="card px-2 py-3 p-md-4 border-0 mt-4">
                              <div className="row">
                                <div className="col-3 col-md-3 text-center">
                                  <img
                                    src={item.image}
                                    alt=""
                                    height="100px"
                                    width="100px"
                                    className="int_logo"
                                  />
                                </div>
                                <div className="col-9 col-md-9">
                                  <h6 className="fw-bold">{item.name}</h6>
                                  <p>
                                    {item.description}
                                    with.
                                  </p>
                                  <a
                                    onClick={() => {
                                      setActiveItem(item);
                                      setIsGetStartedOpen(true);
                                    }}
                                    className="btn btn-success btn-lg bg-theme border-0"
                                  >
                                    Get started
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
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
      {/* main-panel ends */}
    </div>
  );
}

export default Integeration;

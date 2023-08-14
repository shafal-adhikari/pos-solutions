import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

function Home() {
  return (
    <div className="container-fluid page-body-wrapper">
      <Sidebar />
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="content">
            <div className="statstop">
              <div className="row">
                <div className="col-md-5 col-xxl-5">
                  <div className="d-flex flex-column h-100">
                    <div className="row h-100">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-body p-0">
                            <div
                              className="alert alert-warning border-0 rounded-0 m-0 d-flex align-items-center"
                              role="alert"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-alert-triangle text-warning me-2 icon-sm"
                              >
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                              <div className="flex-grow-1 text-truncate">
                                Your free trial expired in <b>17</b> days.
                              </div>
                              <div className="flex-shrink-0">
                                <a
                                  href="pages-pricing.html"
                                  className="text-reset text-decoration-underline"
                                >
                                  <b>Upgrade</b>
                                </a>
                              </div>
                            </div>

                            <div className="row align-items-end">
                              <div className="col-sm-8">
                                <div className="p-3">
                                  <p className="fs-16 lh-base">
                                    Upgrade your plan from a
                                    <span className="fw-semibold">
                                      Free trial
                                    </span>
                                    , to Premium Plan
                                    <i className="mdi mdi-arrow-right"></i>
                                  </p>
                                  <div className="mt-3">
                                    <a
                                      href="pages-pricing.html"
                                      className="btn btn-success"
                                    >
                                      Upgrade Account!
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div className="px-3">
                                  <img
                                    src="assets/images/user-illustarator-2.png"
                                    className="img-fluid"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="card card-animate">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="fw-medium text-muted mb-0">
                                  Users
                                </p>
                                <h2 className="mt-4 ff-secondary fw-semibold">
                                  <span
                                    className="counter-value"
                                    data-target="28.05"
                                  >
                                    28.05
                                  </span>
                                  k
                                </h2>
                                <p className="mb-0 text-muted">
                                  <span className="badge bg-light text-success mb-0">
                                    <i className="ri-arrow-up-line align-middle"></i>
                                    16.24 %
                                  </span>
                                  vs. previous month
                                </p>
                              </div>
                              <div>
                                <div className="avatar-sm flex-shrink-0">
                                  <span className="avatar-title bg-soft-info rounded-circle fs-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-users text-info"
                                    >
                                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="9" cy="7" r="4"></circle>
                                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card card-animate">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="fw-medium text-muted mb-0">
                                  Sessions
                                </p>
                                <h2 className="mt-4 ff-secondary fw-semibold">
                                  <span
                                    className="counter-value"
                                    data-target="97.66"
                                  >
                                    97.66
                                  </span>
                                  k
                                </h2>
                                <p className="mb-0 text-muted">
                                  <span className="badge bg-light text-danger mb-0">
                                    <i className="ri-arrow-down-line align-middle"></i>
                                    3.96 %
                                  </span>
                                  vs. previous month
                                </p>
                              </div>
                              <div>
                                <div className="avatar-sm flex-shrink-0">
                                  <span className="avatar-title bg-soft-info rounded-circle fs-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-activity text-info"
                                    >
                                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <!-- end card body --> */}
                        </div>
                        {/* <!-- end card--> */}
                      </div>
                      {/* <!-- end col--> */}
                    </div>
                    {/* <!-- end row--> */}

                    <div className="row">
                      <div className="col-md-6">
                        <div className="card card-animate">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="fw-medium text-muted mb-0">
                                  Avg. Visit Duration
                                </p>
                                <h2 className="mt-4 ff-secondary fw-semibold">
                                  <span
                                    className="counter-value"
                                    data-target="3"
                                  >
                                    3
                                  </span>
                                  m
                                  <span
                                    className="counter-value"
                                    data-target="40"
                                  >
                                    40
                                  </span>
                                  sec
                                </h2>
                                <p className="mb-0 text-muted">
                                  <span className="badge bg-light text-danger mb-0">
                                    <i className="ri-arrow-down-line align-middle"></i>
                                    0.24 %
                                  </span>
                                  vs. previous month
                                </p>
                              </div>
                              <div>
                                <div className="avatar-sm flex-shrink-0">
                                  <span className="avatar-title bg-soft-info rounded-circle fs-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-clock text-info"
                                    >
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <!-- end card body --> */}
                        </div>
                        {/* <!-- end card--> */}
                      </div>
                      {/* <!-- end col--> */}

                      <div className="col-md-6">
                        <div className="card card-animate">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="fw-medium text-muted mb-0">
                                  Bounce Rate
                                </p>
                                <h2 className="mt-4 ff-secondary fw-semibold">
                                  <span
                                    className="counter-value"
                                    data-target="33.48"
                                  >
                                    33.48
                                  </span>
                                  %
                                </h2>
                                <p className="mb-0 text-muted">
                                  <span className="badge bg-light text-success mb-0">
                                    <i className="ri-arrow-up-line align-middle"></i>
                                    7.05 %
                                  </span>
                                  vs. previous month
                                </p>
                              </div>
                              <div>
                                <div className="avatar-sm flex-shrink-0">
                                  <span className="avatar-title bg-soft-info rounded-circle fs-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-external-link text-info"
                                    >
                                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                      <polyline points="15 3 21 3 21 9"></polyline>
                                      <line
                                        x1="10"
                                        y1="14"
                                        x2="21"
                                        y2="3"
                                      ></line>
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card height-100">
                    <div className="card-header border-0 align-items-center d-flex">
                      <h4 className="card-title mb-0 flex-grow-1">
                        Audiences Metrics
                      </h4>
                      <div>
                        <button
                          type="button"
                          className="btn btn-soft-secondary btn-sm"
                        >
                          ALL
                        </button>
                        <button
                          type="button"
                          className="btn btn-soft-secondary btn-sm"
                        >
                          1M
                        </button>
                        <button
                          type="button"
                          className="btn btn-soft-secondary btn-sm"
                        >
                          6M
                        </button>
                        <button
                          type="button"
                          className="btn btn-soft-primary btn-sm"
                        >
                          1Y
                        </button>
                      </div>
                    </div>
                    <div className="card-header p-0 border-0 bg-soft-light">
                      <div className="row no-gutters text-center">
                        <div className="col-6 col-sm-4">
                          <div className="p-3 border border-dashed border-start-0">
                            <h5 className="mb-1">
                              <span className="counter-value" data-target="854">
                                0
                              </span>
                              <span className="text-success ms-1 fs-12">
                                49%
                                <i className="ri-arrow-right-up-line ms-1 align-middle"></i>
                              </span>
                            </h5>
                            <p className="text-muted mb-0">Avg. Session</p>
                          </div>
                        </div>
                        <div className="col-6 col-sm-4">
                          <div className="p-3 border border-dashed border-start-0">
                            <h5 className="mb-1">
                              <span
                                className="counter-value"
                                data-target="1278"
                              >
                                0
                              </span>
                              <span className="text-success ms-1 fs-12">
                                60%
                                <i className="ri-arrow-right-up-line ms-1 align-middle"></i>
                              </span>
                            </h5>
                            <p className="text-muted mb-0">Conversion Rate</p>
                          </div>
                        </div>
                        <div className="col-6 col-sm-4">
                          <div className="p-3 border border-dashed border-start-0 border-end-0">
                            <h5 className="mb-1">
                              <span className="counter-value" data-target="3">
                                0
                              </span>
                              m
                              <span className="counter-value" data-target="40">
                                0
                              </span>
                              sec
                              <span className="text-success ms-1 fs-12">
                                37%
                                <i className="ri-arrow-right-up-line ms-1 align-middle"></i>
                              </span>
                            </h5>
                            <p className="text-muted mb-0">
                              Avg. Session Duration
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-0 pb-2">
                      <div>
                        <div
                          id="audiences_metrics_charts"
                          data-colors='["--vz-success", "--vz-gray-300"]'
                          className="apex-charts"
                          dir="ltr"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboardcard">
              <div className="row">
                <div className="col-xl-4">
                  <div className="card height-100 border-0">
                    <div className="card-header align-items-center d-flex border-0">
                      <h4 className="card-title mb-0 flex-grow-1">
                        Users by Device
                      </h4>
                      <div className="flex-shrink-0">
                        <div className="dropdown card-header-dropdown">
                          <a
                            className="text-reset dropdown-btn"
                            href="#"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="text-muted fs-16">
                              <i className="mdi mdi-dots-vertical align-middle"></i>
                            </span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">
                              Today
                            </a>
                            <a className="dropdown-item" href="#">
                              Last Week
                            </a>
                            <a className="dropdown-item" href="#">
                              Last Month
                            </a>
                            <a className="dropdown-item" href="#">
                              Current Year
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div
                        id="user_device_pie_charts"
                        data-colors='["--vz-primary", "--vz-warning", "--vz-info"]'
                        className="apex-charts"
                        dir="ltr"
                      ></div>

                      <div className="table-responsive mt-3">
                        <table className="table table-borderless table-sm table-centered align-middle table-nowrap mb-0">
                          <tbody className="border-0">
                            <tr>
                              <td>
                                <h4 className="text-truncate fs-14 fs-medium mb-0">
                                  <i className="fas fa-square-full align-middle fs-11 text-primary me-2"></i>
                                  Desktop Users
                                </h4>
                              </td>
                              <td>
                                <p className="text-muted mb-0">
                                  <i className="fas fa-users me-2 icon-sm"></i>
                                  78.56k
                                </p>
                              </td>
                              <td className="text-end">
                                <p className="text-success fw-medium fs-12 mb-0">
                                  <i className="fas fa-angle-up fs-5 align-middle me-2"></i>
                                  2.08%
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h4 className="text-truncate fs-14 fs-medium mb-0">
                                  <i className="fas fa-square-full align-middle fs-11 text-warning me-2"></i>
                                  Mobile Users
                                </h4>
                              </td>
                              <td>
                                <p className="text-muted mb-0">
                                  <i className="fas fa-users me-2 icon-sm"></i>
                                  105.02k
                                </p>
                              </td>
                              <td className="text-end">
                                <p className="text-danger fw-medium fs-12 mb-0">
                                  <i className="fas fa-angle-down fs-5 align-middle me-2"></i>
                                  10.52%
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h4 className="text-truncate fs-14 fs-medium mb-0">
                                  <i className="fas fa-square-full align-middle fs-11 text-info me-2"></i>
                                  Tablet Users
                                </h4>
                              </td>
                              <td>
                                <p className="text-muted mb-0">
                                  <i className="fas fa-users me-2 icon-sm"></i>
                                  42.89k
                                </p>
                              </td>
                              <td className="text-end">
                                <p className="text-danger fw-medium fs-12 mb-0">
                                  <i className="fas fa-angle-down fs-5 align-middle me-2"></i>
                                  7.36%
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6">
                  <div className="card height-100 border-0">
                    <div className="card-header align-items-center d-flex border-0">
                      <h4 className="card-title mb-0 flex-grow-1">
                        Top Items by Sales
                      </h4>
                      <div className="flex-shrink-0">
                        <div className="dropdown card-header-dropdown">
                          <a
                            className="text-reset dropdown-btn"
                            href="#"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="text-muted fs-16">
                              <i className="mdi mdi-dots-vertical align-middle"></i>
                            </span>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">
                              Today
                            </a>
                            <a className="dropdown-item" href="#">
                              Last Week
                            </a>
                            <a className="dropdown-item" href="#">
                              Last Month
                            </a>
                            <a className="dropdown-item" href="#">
                              Current Year
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="table-responsive table-card">
                        <table className="table table-hover align-middle table-nowrap mb-0">
                          <thead className="text-muted table-light">
                            <tr>
                              <th scope="col" style={{ width: 62 }}>
                                Items
                              </th>
                              <th scope="col">Sales</th>
                              <th scope="col">Users</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Bath Soap</td>
                              <td>99</td>
                              <td>25.3%</td>
                            </tr>

                            <tr>
                              <td>C. Momo</td>
                              <td>86</td>
                              <td>22.7%</td>
                            </tr>

                            <tr>
                              <td>Appetizer</td>
                              <td>64</td>
                              <td>18.7%</td>
                            </tr>

                            <tr>
                              <td>Dessert</td>
                              <td>53</td>
                              <td>14.2%</td>
                            </tr>

                            <tr>
                              <td>Food</td>
                              <td>33</td>
                              <td>12.6%</td>
                            </tr>

                            <tr>
                              <td>Vegetables</td>
                              <td>20</td>
                              <td>10.9%</td>
                            </tr>

                            <tr>
                              <td>Others</td>
                              <td>10</td>
                              <td>07.3%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card height-100 border-0">
                    <div className="card-header align-items-center d-flex border-0">
                      <h4 className="card-title">Last 30 Days</h4>
                    </div>

                    <div className="card-body">
                      <div className="table-responsive table-card">
                        <table className="table table-hover align-middle table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <td>Total Customers</td>
                              <td>0</td>
                            </tr>

                            <tr>
                              <td>New Customers</td>
                              <td>10</td>
                            </tr>

                            <tr>
                              <td>Returning Customers</td>
                              <td>4</td>
                            </tr>

                            <tr>
                              <td>Avg. Spend Per Visit</td>
                              <td>53</td>
                            </tr>

                            <tr>
                              <td>Positive Feedback</td>
                              <td>33</td>
                            </tr>

                            <tr>
                              <td>Negative Feedback</td>
                              <td>20</td>
                            </tr>

                            <tr>
                              <td>Others</td>
                              <td>10</td>
                            </tr>
                            {/* <!-- end --> */}
                          </tbody>
                          {/* <!-- end tbody --> */}
                        </table>
                        {/* <!-- end table --> */}
                      </div>
                      {/* <!-- end --> */}
                    </div>
                    {/* <!-- end cardbody --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-4 col-md-6">
                <div className="card height-100 border-0">
                  <div className="card-header align-items-center d-flex border-0">
                    <h4 className="card-title mb-0 flex-grow-1">
                      Top Items by Customers
                    </h4>
                    <div className="flex-shrink-0">
                      <div className="dropdown card-header-dropdown">
                        <a
                          className="text-reset dropdown-btn"
                          href="#"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="text-muted fs-16">
                            <i className="mdi mdi-dots-vertical align-middle"></i>
                          </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                          <a className="dropdown-item" href="#">
                            Last Week
                          </a>
                          <a className="dropdown-item" href="#">
                            Last Month
                          </a>
                          <a className="dropdown-item" href="#">
                            Current Year
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- end card header --> */}
                  <div className="card-body">
                    <div className="table-responsive table-card">
                      <table className="table table-hover align-middle table-nowrap mb-0">
                        <thead className="text-muted table-light">
                          <tr>
                            <th scope="col" style={{ width: 62 }}>
                              Items
                            </th>
                            <th scope="col">Sales</th>
                            <th scope="col">Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Bath Soap</td>
                            <td>99</td>
                            <td>25.3%</td>
                          </tr>
                          {/* <!-- end --> */}
                          <tr>
                            <td>C. Momo</td>
                            <td>86</td>
                            <td>22.7%</td>
                          </tr>
                          {/* <!-- end --> */}
                          <tr>
                            <td>Appetizer</td>
                            <td>64</td>
                            <td>18.7%</td>
                          </tr>
                          {/* <!-- end --> */}
                          <tr>
                            <td>Dessert</td>
                            <td>53</td>
                            <td>14.2%</td>
                          </tr>
                          {/* <!-- end --> */}
                          <tr>
                            <td>Food</td>
                            <td>33</td>
                            <td>12.6%</td>
                          </tr>
                          {/* <!-- end --> */}
                          <tr>
                            <td>Vegetables</td>
                            <td>20</td>
                            <td>10.9%</td>
                          </tr>
                          {/* <!-- end --> */}
                          <tr>
                            <td>Others</td>
                            <td>10</td>
                            <td>07.3%</td>
                          </tr>
                          {/* <!-- end --> */}
                        </tbody>
                        {/* <!-- end tbody --> */}
                      </table>
                      {/* <!-- end table --> */}
                    </div>
                    {/* <!-- end --> */}
                  </div>
                  {/* <!-- end cardbody --> */}
                </div>
                {/* <!-- end card --> */}
              </div>

              <div className="col-md-4">
                <div className="card height-100 border-0">
                  <div className="card-header align-items-center d-flex border-0">
                    <h4 className="card-title mb-0 flex-grow-1">
                      Sessions by Countries
                    </h4>
                    <div>
                      <button
                        type="button"
                        className="btn btn-soft-secondary btn-sm"
                      >
                        ALL
                      </button>
                      <button
                        type="button"
                        className="btn btn-soft-primary btn-sm"
                      >
                        1M
                      </button>
                      <button
                        type="button"
                        className="btn btn-soft-secondary btn-sm"
                      >
                        6M
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div>
                      <div
                        id="countries_charts"
                        data-colors='["--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-danger", "--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-info"]'
                        className="apex-charts"
                        dir="ltr"
                      ></div>
                    </div>
                  </div>
                  {/* <!-- end card body --> */}
                </div>
                {/* <!-- end card --> */}
              </div>
              <div className="col-md-4">
                <div className="card height-100 border-0">
                  <div className="card-header align-items-center d-flex border-0">
                    <h4 className="card-title">Recommended Products</h4>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center border-bottom pb-3 pt-3">
                      <div className="me-2">
                        <img
                          src="assets/images/retail.svg"
                          alt=""
                          className="img-fluid"
                          height="40"
                          width="40"
                        />
                      </div>
                      <div>
                        <h6 className="fs-16 mb-0 font-weight-bold">
                          VolgAI for Retail
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center border-bottom pb-3 pt-3">
                      <div className="me-2">
                        <img
                          src="assets/images/restaurant.svg"
                          alt=""
                          className="img-fluid"
                          height="40"
                          width="40"
                        />
                      </div>
                      <div>
                        <h6 className="fs-16 mb-0 font-weight-bold">
                          VolgAI for Restaurants
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center border-bottom pb-3 pt-3">
                      <div className="me-2">
                        <img
                          src="assets/images/gift.svg"
                          alt=""
                          className="img-fluid"
                          height="40"
                          width="40"
                        />
                      </div>
                      <div>
                        <h6 className="fs-16 mb-0 font-weight-bold">
                          Gift Cards
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center border-bottom pb-3 pt-3">
                      <div className="me-2">
                        <img
                          src="assets/images/cart.svg"
                          alt=""
                          className="img-fluid"
                          height="40"
                          width="40"
                        />
                      </div>
                      <div>
                        <h6 className="fs-16 mb-0 font-weight-bold">
                          Gift Cards
                        </h6>
                      </div>
                    </div>
                  </div>
                  {/* <!-- end card body --> */}
                </div>
                {/* <!-- end card --> */}
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container-fluid clearfix">
            <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
              Copyright © POSApt 2022
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;

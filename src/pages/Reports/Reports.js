import { Outlet, Routes, Route, Navigate, Link } from "react-router-dom";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";
import { useDispatch, useSelector } from "react-redux";
import SalesSummary from "./SalesSummary";

function Reports() {
  return (
    <div className="container-fluid page-body-wrapper1">
      <div className=" main_panel_inner">
        <div className="content-wrapper">
          <div className="content">
            {/* main Breadcrumb Area */}
            <div className="row  ">
              <div className="col-md-8 grid-margin stretch-card">
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
                        <span>Reports</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/* order tabs */}
            <div className="menu_inner myorders">
              <div className="row">
                <SIdeBarPage
                  pages={[
                    {
                      name: "Sales Summary",
                      path: "reports/sales-summary",
                    },
                  ]}
                  //   loading={isLoading}
                />
                <Outlet />
                <Routes>
                  <Route path="/sales-summary" element={<SalesSummary />} />
                  <Route path="/*" element={<Navigate to="/404" replace />} />
                </Routes>
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
          {/* partial */}
        </div>
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
}

export default Reports;

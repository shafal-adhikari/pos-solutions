import React from "react";
import { Navigate, Outlet, Route, Routes, Link } from "react-router-dom";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";
import ProductList from "./ProductList";
import SetMenu from "./SetMenu";
import AddProduct from "./AddProduct";
function Inventory() {
  return (
    <div className="container-fluid page-body-wrapper1">
      {/* partial:partials/_sidebar.html */}
      {/* Sidebar */}
      {/* End sidebar */}
      {/* partial */}
      <div className=" main_panel_inner">
        <div className="content-wrapper">
          <div className="content">
            {/* main Breadcrumb Area */}
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
                        <span>Inventory</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/* order tabs */}
            <div className="menu_inner myvendors">
              <div className="row">
                {/* <div className="col-md-2 col-xxl-2">
                  <div className="menu_left">
                    <div className="card">
                      <div className="card-body p-0">
                        <div className="d-flex align-items-start  innerpills">
                          <div
                            className="nav flex-column nav-pills w-100"
                            id="v-pills-tab"
                            role="tablist"
                            aria-orientation="vertical"
                          >
                            <a
                              href=""
                              className="nav-link active"
                              id="v-pills-productlist-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-productlist"
                              role="tab"
                              aria-controls="v-pills-productlist"
                              aria-selected="true"
                            >
                              Product List
                            </a>
                            <a
                              href=""
                              className="nav-link"
                              id="v-pills-addinventoryproducts-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-addinventoryproducts"
                              role="tab"
                              aria-controls="v-pills-addinventoryproducts"
                              aria-selected="false"
                            >
                              Add Product
                            </a>
                            <a
                              href=""
                              className="nav-link"
                              id="v-pills-setmenu-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-setmenu"
                              role="tab"
                              aria-controls="v-pills-setmenu"
                              aria-selected="false"
                            >
                              Set menu
                            </a>
                            <a
                              href=""
                              className="nav-link"
                              id="v-pills-featuredproduct-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-featuredproduct"
                              role="tab"
                              aria-controls="v-pills-featuredproduct"
                              aria-selected="false"
                            >
                              Featured product
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <SIdeBarPage
                  pages={[
                    { name: "Product List", path: "inventory/list" },
                    {
                      name: "Add Product",
                      path: "inventory/add-product",
                    },
                    {
                      name: "Set Menu",
                      path: "inventory/set-menu",
                    },
                    {
                      name: "Featured Product",
                      path: "inventory/featured-product",
                    },
                  ]}
                />

                {/* end menu left */}
                {/* start menu right */}
                <div className="col-md-10 col-xxl-10">
                  <Outlet />
                  <Routes>
                    <Route path="/list" element={<ProductList />} />
                    <Route path="/set-menu" element={<SetMenu />} />
                    <Route
                      path="/add-product"
                      element={<AddProduct isEdit={false} />}
                    />
                    <Route path="/*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
          {/* End Content Wrapper */}
          {/* content-wrapper ends */}
          {/* partial:partials/_footer.html */}
          <footer className="footer ">
            <div className="container-fluid clearfix ">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block ">
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

export default Inventory;

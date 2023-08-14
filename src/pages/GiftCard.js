import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Routes, Route, Navigate, Link } from "react-router-dom";
import AddNewGiftCard from "../components/AddNewGiftCard/AddNewGiftCard";
import GiftCardList from "../components/GiftCardList/GiftCardList";
import SIdeBarPage from "../components/SideBarPage/SIdeBarPage";

function GiftCard() {
  const { addGiftSuccess, deactivateSuccess } = useSelector(
    (state) => state.giftCardReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_GIFT_CARD_SECTION_REQUEST",
    });
  }, [addGiftSuccess, deactivateSuccess]);

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
                        <span>Gift Cards</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="menu_inner myvendors">
              <div className="row">
                {/* <div className="col-md-3 col-xxl-2">
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
                              id="v-pills-newgiftcard-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-newgiftcard"
                              role="tab"
                              aria-controls="v-pills-newgiftcard"
                              aria-selected="true"
                            >
                              New Gift Card
                            </a>
                            <a
                              href=""
                              className="nav-link"
                              id="v-pills-giftcardbalance-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-giftcardbalance"
                              role="tab"
                              aria-controls="v-pills-giftcardbalance"
                              aria-selected="false"
                            >
                              Gift Card List
                            </a>
                            {/* <a href="" class="nav-link" id="v-pills-totalactivegiftcard-tab" data-bs-toggle="pill" data-bs-target="#v-pills-totalactivegiftcard" role="tab" aria-controls="v-pills-totalactivegiftcard" aria-selected="false">Total active gift card</a>
                                                  <a href="" class="nav-link" id="v-pills-totalexpiredgiftcard-tab" data-bs-toggle="pill" data-bs-target="#v-pills-totalexpiredgiftcard" role="tab" aria-controls="v-pills-totalexpiredgiftcard" aria-selected="false">Total expired gift card</a> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* end menu left */}
                {/* start menu right */}
                <SIdeBarPage
                  pages={[
                    {
                      name: "New Gift Card",
                      path: "giftcards/add-card",
                    },
                    {
                      name: "Gift Card List",
                      path: "giftcards/list",
                    },
                  ]}
                />
                <div className="col-md-9 col-xxl-10">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="menu_right">
                        <div className="right_top mb-4">
                          <div className="tab-content" id="v-pills-tabContent">
                            <Outlet />
                            <Routes>
                              <Route
                                path="/add-card"
                                element={<AddNewGiftCard />}
                              />
                              <Route path="/list" element={<GiftCardList />} />
                              <Route
                                path="/*"
                                element={<Navigate to="/404" replace />}
                              />
                            </Routes>
                            {/* <GiftCardList />
                            <AddNewGiftCard /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default GiftCard;

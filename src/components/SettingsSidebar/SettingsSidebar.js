import React from "react";
function SettingsSidebar() {
  return (
    <div className="col-md-2">
      <div className="menu_left">
        <div className="card">
          <div className="card-body p-0">
            <div className="d-flex align-items-start innerpills">
              <div
                className="nav flex-column nav-pills w-100"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  href=""
                  className="nav-link active"
                  id="v-pills-personalsettings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-personalsettings"
                  role="tab"
                  aria-controls="v-pills-personalsettings"
                  aria-selected="false"
                >
                  General Settings
                </a>
                <a
                  href=""
                  className="nav-link"
                  id="v-pills-storesettings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-storesettings"
                  role="tab"
                  aria-controls="v-pills-storesettings"
                  aria-selected="false"
                >
                  Store Settings
                </a>
                <a
                  href=""
                  className="nav-link"
                  id="v-pills-eodsettings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-eodsettings"
                  role="tab"
                  aria-controls="v-pills-eodsettings"
                  aria-selected="true"
                >
                  Payment Method Settings
                </a>
                <a
                  href=""
                  className="nav-link"
                  id="v-pills-printersetting-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-printersetting"
                  role="tab"
                  aria-controls="v-pills-printersetting"
                  aria-selected="false"
                >
                  Printer Settings
                </a>
                <a
                  href=""
                  className="nav-link"
                  id="v-pills-bannersetup-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-bannersetup"
                  role="tab"
                  aria-controls="v-pills-bannersetup"
                  aria-selected="false"
                >
                  Online Banner Settings
                </a>
                <a
                  href=""
                  className="nav-link"
                  id="v-pills-emailsettings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-emailsettings"
                  role="tab"
                  aria-controls="v-pills-emailsettings"
                  aria-selected="false"
                >
                  Notifications Settings
                </a>
                {/* <a href="" class="nav-link" id="v-pills-accountingsettings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-accountingsettings" role="tab" aria-controls="v-pills-accountingsettings" aria-selected="false">Accounting Settings</a> */}
                {/* <a href="" class="nav-link" id="v-pills-loyaltysettings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-loyaltysettings" role="tab" aria-controls="v-pills-loyaltysettings" aria-selected="false">Loyalty Settings</a>
                                                  <a href="" class="nav-link" id="v-pills-giftcardsetting-tab" data-bs-toggle="pill" data-bs-target="#v-pills-giftcardsetting" role="tab" aria-controls="v-pills-giftcardsetting" aria-selected="false">Gift Card Settings</a>
                                                  <a href="" class="nav-link" id="v-pills-inventorysetup-tab" data-bs-toggle="pill" data-bs-target="#v-pills-inventorysetup" role="tab" aria-controls="v-pills-inventorysetup" aria-selected="false">Inventory SetUp</a>
                                                  <a href="" class="nav-link" id="v-pills-customersetup-tab" data-bs-toggle="pill" data-bs-target="#v-pills-customersetup" role="tab" aria-controls="v-pills-customersetup" aria-selected="false">Customer SetUp</a>
                                                  <a href="" class="nav-link" id="v-pills-suppliersetup-tab" data-bs-toggle="pill" data-bs-target="#v-pills-suppliersetup" role="tab" aria-controls="v-pills-suppliersetup" aria-selected="false">Supplier SetUp</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsSidebar;

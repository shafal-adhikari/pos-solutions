import React from "react";

function SuppliersSidebar() {
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
                  id="v-pills-franchisesetting-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-franchisesetting"
                  role="tab"
                  aria-controls="v-pills-franchisesetting"
                  aria-selected="false"
                >
                  Suppliers
                </a>
                <a
                  href=""
                  className="nav-link"
                  id="v-pills-languagesetting-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-languagesetting"
                  role="tab"
                  aria-controls="v-pills-languagesetting"
                  aria-selected="false"
                >
                  Purchase Order
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
                  Purchase Order Credit Note
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuppliersSidebar;

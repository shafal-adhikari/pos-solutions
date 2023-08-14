import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useLocation } from "react-router-dom";
function SIdeBarPage({ pages, loading }) {
  const location = useLocation();
  const path =
    location.pathname.split("/")[1] + "/" + location.pathname.split("/")[2];
  return (
    <div className="col-md-2 ">
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
                {pages?.map((page, i) => {
                  return (
                    <Link
                      to={"/" + page.path}
                      key={i}
                      className={`nav-link ${
                        page.path == path ? "active" : ""
                      }`}
                    >
                      {page.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SIdeBarPage);

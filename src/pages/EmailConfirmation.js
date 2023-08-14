/** @format */
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function EmailConfirmation() {
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const dispatch = useDispatch();
  const query = useQuery();
  const { data, error } = useSelector(
    (state) => state.emailConfirmationReducer
  );
  console.log(data, error);
  useEffect(() => {
    const code = query.get("code");
    const email = query.get("email");
    dispatch({
      type: "EMAIL_CONFIRMATION_REQUEST",
      payload: {
        Code: code,
        email,
      },
    });
  }, []);
  return (
    <section className="emailconfirm height100">
      <div className="container text-center">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-7">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="emailicon">
                  <img
                    src="assets/images/emailconfirm.png"
                    className="w-15"
                    alt=""
                  />
                </div>
                <div className="emailpara mt-3">
                  <h4 className="fw-bold">Email Confirmed Successfully!</h4>
                  <p>
                    Thank You! Your Email has been verified and account has been
                    activated. To continue please login from here.
                  </p>
                  <Link
                    to={"/login"}
                    className="btn btn-success all_btn btn-lg rounded-0 mt-3"
                  >
                    Login Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailConfirmation;

import React from "react";

function PhoneVerification() {
  return (
    <div
      className="tab-pane fade"
      id="v-pills-verifyphone"
      role="tabpanel"
      aria-labelledby="v-pills-verifyphone-tab"
    >
      <div className="card card0 border-0 ">
        <div className=" text-center">
          <h4>Phone Verification</h4>
          <p>
            When you enable this feature, you need to enter your password and a
            code that is generated by a two-factor authentication to sign in.
          </p>
          <div className="enter_code">
            <div className="bg-light p-3">
              <div className="row align-items-center">
                <div className="col-md-9">
                  <input
                    className="m-2 text-center form-control rounded w-100"
                    type="text"
                    placeholder="Enter your Phone no."
                    id="first"
                  />
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-sm all_btn text-white m-auto w-100"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
              <div className="inputs d-flex flex-row justify-content-center mt-2">
                <input
                  className="m-2 text-center form-control rounded"
                  type="text"
                  placeholder="Enter 6 digit code."
                  id="first"
                />
              </div>
              <p>
                <small>6 Disgit is sent to your phone.</small>
              </p>
            </div>
            <div className="mt-4">
              <button type="button" className="btn btn- all_btn text-white">
                Validate
              </button>
              <button
                type="button"
                className="btn btn-danger text-white border-0"
              >
                Cancel
              </button>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input mt-2 catcheck"
                type="checkbox"
                defaultValue=""
                id="defaultCheck1"
              />
              <label className="form-check-label" htmlFor="defaultCheck1">
                Skip for 30 Days
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneVerification;

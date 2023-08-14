/** @format */

import React from "react";
import { Form } from "antd";
import Skeleton from "react-loading-skeleton";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";

const AddEmployeeSkeleton = () => {
  return (
    <Form>
      <div className="card mt-2">
        <div className="card-body bg-light-blue">
          <div className="contact_form">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <div className=" pt-0">
                    <FormItemSkeleton />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <div className=" pt-0">
                    <FormItemSkeleton />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <FormItemSkeleton />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <FormItemSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency contact */}
      <div className="card mt-2">
        <div className="card-body bg-light-blue">
          <div className="contact_form">
            {/*  details */}
            <div className="emergency_info">
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="form-group">
                    <div className=" pt-0">
                      <FormItemSkeleton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* General Information */}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AddEmployeeSkeleton;

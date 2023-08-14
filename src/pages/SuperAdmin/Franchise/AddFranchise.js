import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import FormItemSkeleton from "../../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";

const AddFranchise = ({ setIsFranchiseOpen }) => {
  const [addFranchiseForm] = Form.useForm();
  const dispatch = useDispatch();
  const {
    isLoading,
    franchiseAddSection,
    getFranchiseSectionLoading,
    isOperatioSuccessful,
    addFranchiseLoading,
  } = useSelector((state) => state.superAdminReducer);

  useEffect(() => {
    dispatch({
      type: "GET_ADD_FRANCHISE_SECTION_REQUEST",
    });
  }, []);

  const onAddFranchiseFormSUbmit = (values) => {
    // console.log("values", values);
    dispatch({
      type: "ADD_FRANCHISE_REQUEST",
      payload: [
        {
          Id: "",
          TemplateId: values.template,
          Name: values.name,
          Description: values.description,
          Url: values.url,
          FranchiseLocationMaxCount: parseInt(values.franchiseLocationCount),
        },
      ],
    });
  };

  return (
    <>
      {getFranchiseSectionLoading ? (
        <Form form={addFranchiseForm} onFinish={onAddFranchiseFormSUbmit}>
          <div className="row">
            <div className="col-md-12" style={{ marginBottom: "-6px" }}>
              <div className="form-group categoryField">
                <FormItemSkeleton />
              </div>
            </div>
            <div className="col-md-12" style={{ marginBottom: "-6px" }}>
              <div className="form-group categoryField">
                <FormItemSkeleton />
              </div>
            </div>
            <div className="col-md-12" style={{ marginBottom: "-6px" }}>
              <div className="form-group categoryField">
                <FormItemSkeleton />
              </div>
            </div>
            <div className="col-md-12" style={{ marginBottom: "-6px" }}>
              <div className="form-group categoryField">
                <FormItemSkeleton />
              </div>
            </div>

            {/* <input type={"file"} /> */}

            <div className="col-md-12 col-lg-12 mt-3">
              <Skeleton width={100} height={40} inline={true} />
              <Skeleton width={100} height={40} />
            </div>
          </div>
        </Form>
      ) : (
        <Form form={addFranchiseForm} onFinish={onAddFranchiseFormSUbmit}>
          <div className="row">
            <div className="col-md-12" style={{ marginBottom: "-6px" }}>
              <div className="form-group categoryField">
                <Form.Item
                  label="Template"
                  name="template"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Template !",
                    },
                  ]}
                >
                  <Select placeholder="Select Template">
                    {franchiseAddSection?.templates?.map((item) => {
                      return (
                        <Select.Option value={item.id} key={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="col-md-12" style={{ marginBottom: "-6px" }}>
              <div className="form-group categoryField">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Franchise Name !",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Franchise Name"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-md-12" style={{ marginBottom: "-6px" }}>
              <div className="form-group categoryField">
                <Form.Item label="Url" name="url">
                  <Input placeholder="Franchise Url" />
                </Form.Item>
              </div>
            </div>
            <div className="col-md-12" style={{ marginBottom: "-6px" }}>
              <div className="form-group categoryField">
                <Form.Item
                  label="Franchise Location Count"
                  name="franchiseLocationCount"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Franchise Location Count !",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Franchise Location Count" />
                </Form.Item>
              </div>
            </div>

            {/* <input type={"file"} /> */}

            <div className="col-md-12 col-lg-12 mt-3">
              <Button
                htmlType="submit"
                loading={addFranchiseLoading}
                type="primary"
                className="btn btn-primary all_btn rounded-0"
                style={{ marginRight: "5px" }}
              >
                Save
              </Button>
              <button
                type="button"
                onClick={() => {
                  setIsFranchiseOpen(false);
                }}
                className="btn btn-primary all_btn btn_red rounded-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </Form>
      )}
    </>
  );
};

export default AddFranchise;

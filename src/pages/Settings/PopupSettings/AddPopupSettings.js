import React, { useEffect } from "react";
import { Button, Form, Input, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";
import "./style.css";
const AddPopupSettings = ({ setIsAddPopupModalOpen, editClicked }) => {
  const [addPopupForm] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoading, addLoading, editData } = useSelector(
    (state) => state.popupSettingsReducer
  );
  const onAddPopupFormSUbmit = (values) => {
    dispatch({
      type: "ADD_POPUP_REQUEST",
      payload: [
        {
          ...values,
          id: editClicked && editData ? editData.id : "",
        },
      ],
    });
  };
  useEffect(() => {
    if (editData && editClicked) {
      addPopupForm.setFields([
        {
          name: "title",
          value: editData.title,
        },
        {
          name: "buttonLabel",
          value: editData.buttonLabel,
        },
        {
          name: "buttonLink",
          value: editData.buttonLink,
        },
        {
          name: "description",
          value: editData.description,
        },
        {
          name: "isActive",
          value: editData.isActive,
        },
      ]);
    }
  }, [editData, editClicked]);
  return (
    <>
      <Form
        form={addPopupForm}
        onFinish={onAddPopupFormSUbmit}
        initialValues={{
          isActive: true,
        }}
      >
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {isLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Title!",
                    },
                  ]}
                >
                  <Input placeholder="Title" />
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {isLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item
                  label="Button Label"
                  name="buttonLabel"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Button Label!",
                    },
                  ]}
                >
                  <Input placeholder="Button Label" />
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {isLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item label="Button Link" name="buttonLink">
                  <Input placeholder="Button Link" />
                </Form.Item>
              )}
            </div>
          </div>
          {/* <input type={"file"} /> */}
          <div
            className="col-md-12"
            style={{ marginTop: "3px", alignItems: "center" }}
          >
            {isLoading ? (
              <div className="form-group categoryField">
                <FormItemSkeleton />
              </div>
            ) : (
              <div className="form-group categoryField">
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter description",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Description" />
                </Form.Item>
              </div>
            )}
          </div>

          <div
            className="col-md-12"
            style={{ marginTop: "3px", alignItems: "center" }}
          >
            {isLoading ? (
              <div className="form-group categoryField">
                <FormItemSkeleton />
              </div>
            ) : (
              <div className="form-group categoryField">
                <Form.Item
                  label="Status"
                  name="isActive"
                  valuePropName="checked"
                >
                  <Switch defaultChecked={true} />
                </Form.Item>
              </div>
            )}
          </div>

          <div className="col-md-12 col-lg-12 mt-3 ">
            {isLoading ? (
              <Skeleton width={100} height={40} inline={true} />
            ) : (
              <Button
                loading={addLoading}
                type="primary"
                htmlType="submit"
                className="btn btn-primary all_btn rounded-0 me-2"
              >
                Save
              </Button>
            )}
            {isLoading ? (
              <Skeleton width={100} height={40} />
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsAddPopupModalOpen(false);
                }}
                type="danger"
                className="btn btn-primary all_btn btn_red rounded-0"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Form>
    </>
  );
};

export default AddPopupSettings;

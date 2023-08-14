import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EyeFilled } from "@ant-design/icons";
import { Modal } from "react-bootstrap";
import FormItemSkeleton from "../../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";
const EditFranchise = ({ setIsEditFranchiseOpen, activeItem }) => {
  const [editFranchiseForm] = Form.useForm();
  const dispatch = useDispatch();
  const {
    isLoading,
    franchiseAddSection,
    isOperatioSuccessful,
    addFranchiseLoading,
    getFranchiseSectionLoading,
  } = useSelector((state) => state.superAdminReducer);

  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    setEditingItem(activeItem);
  }, [activeItem]);
  useEffect(() => {
    dispatch({
      type: "GET_ADD_FRANCHISE_SECTION_REQUEST",
    });
  }, []);

  const onEditFranchiseFormSUbmit = (values) => {
    dispatch({
      type: "ADD_FRANCHISE_REQUEST",
      payload: [
        {
          TemplateId: values.template,
          Name: values.name,
          Description: values.description,
          Url: values.url,
          FranchiseLocationMaxCount: parseInt(values.franchiseLocationCount),
          Id: editingItem.id,
        },
      ],
    });
  };

  // useEffect(() => {
  //   if (isOperatioSuccessful) {
  //     setIsEditBannerOpen(false);
  //   }
  // }, [isOperatioSuccessful]);
  return (
    <>
      {getFranchiseSectionLoading ? (
        <Form>
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
        <Form
          form={editFranchiseForm}
          onFinish={onEditFranchiseFormSUbmit}
          fields={[
            {
              name: "name",
              value: editingItem?.name,
            },
            {
              name: "template",
              value: franchiseAddSection?.templates?.filter(
                (item) => item.name == editingItem?.templateName
              )?.[0]?.id,
            },
            {
              name: "url",
              value: editingItem?.url,
            },
            {
              name: "franchiseLocationCount",
              value: editingItem?.franchiseLocationMaxCount,
            },
          ]}
        >
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
                onClick={() => {
                  setIsEditFranchiseOpen(false);
                }}
                type="button"
                className="btn btn-primary all_btn btn_red rounded-0"
              >
                Cancel
              </button>
            </div>
            =
          </div>
        </Form>
      )}
    </>
  );
};

export default EditFranchise;

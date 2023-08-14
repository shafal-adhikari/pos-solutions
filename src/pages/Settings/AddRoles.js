import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

const AddRoles = ({
  setIsRoleAddOpen,
  activeRoleName,
  setActiveRoleName,
  activeRoleId,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoading, isOperatioSuccessful, addRoleLoading } = useSelector(
    (state) => state.userManagement
  );
  const onAddRoleFormsubmit = (values) => {
    dispatch({
      type: "ADD_ROLE_REQUEST",
      payload: [
        {
          Id: activeRoleName ? activeRoleId : "",
          Name: values.roleName,
        },
      ],
    });
  };

  useEffect(() => {
    if (isOperatioSuccessful) {
      setIsRoleAddOpen(false);
      setActiveRoleName("");
      form.resetFields();
    }
  }, [isOperatioSuccessful]);
  useEffect(() => {
    if (activeRoleName) {
      form.setFieldValue("roleName", activeRoleName);
    }
  }, [activeRoleName]);
  return (
    <Form form={form} onFinish={onAddRoleFormsubmit}>
      <div className="card-body">
        <div className="" style={{ border: "none" }}>
          <div className="row categoryField">
            <div className="col-md-12">
              <div className="form-group">
                <Form.Item
                  label="Role"
                  name="roleName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Role Name",
                    },
                  ]}
                >
                  <Input placeholder="Enter Role Name" />
                </Form.Item>
              </div>
            </div>

            <div className="justify-content-start col-md-12">
              <Button
                type="primary"
                loading={addRoleLoading}
                htmlType="submit"
                className="btn btn-success rounded-0"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setIsRoleAddOpen(false);
                }}
                type="danger"
                className="btn btn-danger rounded-0 border-0 ms-2"
                data-dismiss="modal"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </Form>
  );
};

export default AddRoles;

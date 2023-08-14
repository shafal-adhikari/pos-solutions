import { Button, Checkbox, Slider, Switch, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MoreOutlined,
  EditOutlined,
  BarsOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Modal } from "react-bootstrap";
import { Menu, Spin, Dropdown, Popover, Segmented, Collapse } from "antd";
import AddRoles from "./AddRoles";
import { Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Panel } = Collapse;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const RolesAndPermission = () => {
  const dispatch = useDispatch();
  const [isAddRoleOpen, setIsRoleAddOpen] = useState(false);
  const {
    isLoading,
    isOperatioSuccessful,
    rolesList,
    permissionAddSectionList,
    selectedRolesPermission,
    updateRolesPermisssionLoading,
  } = useSelector((state) => state.userManagement);
  const [defaultRole, setDefaultRole] = useState();
  const [selectedModule, setSelectedModule] = useState();
  const [selectedRole, setSelectedRole] = useState("0");
  const [checkedPermission, setCheckedPermission] = useState([]);
  const [activeRoleName, setActiveRoleName] = useState("");
  const [activeRoleId, setActiveRoleId] = useState();

  useEffect(() => {
    if (selectedRolesPermission) {
      setCheckedPermission(selectedRolesPermission);
    }
  }, [selectedRolesPermission]);

  const onActionClickhandler = (e, id, name) => {
    if (e.key == 1) {
      setActiveRoleName(name);
      setIsRoleAddOpen(true);
      setActiveRoleId(id);
    } else if (e.key == 2) {
      dispatch({
        type: "DELETE_ROLE_REQUEST",
        payload: [
          {
            Id: id,
            Name: name,
          },
        ],
      });
    }
  };
  const items = rolesList?.data?.map((item, index) =>
    getItem(
      <div className="d-flex justify-content-between align-items-center">
        <span
          style={{
            fontSize: "14px",
            textOverflow: "ellipsis",
            width: 120,
            wordWrap: "break-word",
            overflow: "clip",
          }}
        >
          {item.name}
        </span>
        <Dropdown
          trigger={["click"]}
          classNa
          overlay={
            <Menu
              onClick={(e) => {
                onActionClickhandler(e, item.id, item.name);
              }}
              style={{ width: "120px" }}
              items={[
                {
                  key: 1,
                  label: "Edit",
                  icon: <EditOutlined />,
                },
                {
                  key: 2,
                  label: "Delete",
                  icon: <DeleteOutlined />,
                  danger: true,
                },
              ]}
            ></Menu>
          }
        >
          <MoreOutlined />
        </Dropdown>
      </div>,
      index,
      <SettingOutlined />
    )
  );

  useEffect(() => {
    if (rolesList?.data?.length > 0) {
      setDefaultRole(rolesList?.data?.[0]?.id);
    }
  }, [rolesList]);
  useEffect(() => {
    dispatch({
      type: "GET_ROLES_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
        ExternalFilter: { Id: "test", Name: "" },
      },
    });
    dispatch({
      type: "GET_PERMISSION_ADD_SECTION_LIST_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
        ExternalFilter: { Id: "test", Name: "" },
      },
    });
  }, []);
  useEffect(() => {
    if (isOperatioSuccessful) {
      dispatch({
        type: "GET_ROLES_REQUEST",
        payload: {
          Page: 1,
          PageSize: 10,
          ExternalFilter: { Id: "test", Name: "" },
        },
      });
    }
  }, [isOperatioSuccessful]);
  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {
    if (!selectedModule) {
      setSelectedModule(permissionAddSectionList?.channelPlatforms?.[0]?.value);
    }
    if (rolesList?.data?.[selectedRole]?.id && selectedModule) {
      dispatch({
        type: "GET_PERMISSION_BY_ROLE_REQUEST",
        payload: {
          roleId: rolesList?.data?.[selectedRole]?.id,
          channelplatformid: permissionAddSectionList?.channelPlatforms?.find(
            (item) => item.value == selectedModule
          )?.id,
        },
      });
    }
  }, [permissionAddSectionList, rolesList, selectedModule, selectedRole]);

  const updatePermissionHandler = () => {
    dispatch({
      type: "UPDATE_PERMISSION_REQUEST",
      payload: {
        roleId: rolesList?.data?.[selectedRole]?.id,
        ChannelPlatformId: permissionAddSectionList?.channelPlatforms?.find(
          (item) => item.value == selectedModule
        )?.id,
        TaskActionIds: checkedPermission,
      },
    });
  };
  console.log("checked permission", checkedPermission);
  return (
    <div>
      <Modal
        show={isAddRoleOpen}
        onHide={() => {
          setIsRoleAddOpen(false);
          setActiveRoleName("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Add Role</Modal.Title>
        </Modal.Header>

        <AddRoles
          setActiveRoleName={setActiveRoleName}
          activeRoleName={activeRoleName}
          setIsRoleAddOpen={setIsRoleAddOpen}
          activeRoleId={activeRoleId}
        />
      </Modal>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            loading={false}
            style={{ borderRadius: "8px" }}
            onClick={() => {
              setIsRoleAddOpen(true);
            }}
            htmlType="submit"
            className="btn btn-success rounded-0"
          >
            Add Role
          </Button>
          <Button
            icon={<UploadOutlined />}
            type="primary"
            loading={updateRolesPermisssionLoading}
            style={{ borderRadius: "8px", marginLeft: "1rem" }}
            onClick={() => {
              updatePermissionHandler();
            }}
            htmlType="submit"
            className="btn btn-success rounded-0"
          >
            Update Permission
          </Button>
        </div>

        <Segmented
          value={selectedModule}
          onChange={(e) => {
            setSelectedModule(e);
          }}
          options={permissionAddSectionList?.channelPlatforms?.map((item) => {
            return {
              value: item.value,
              icon: <BarsOutlined />,
              label: item.value,
            };
          })}
        />
      </div>
      {isLoading ? (
        <>
          <Skeleton loading={true} active={true}></Skeleton>
        </>
      ) : (
        <div className="d-flex" style={{ position: "relative" }}>
          <Menu
            onClick={(e) => setSelectedRole(e.key)}
            onChange={(e) => setSelectedRole(e.key)}
            style={{
              width: "20%",
              background: "#F3F6F9",
            }}
            defaultSelectedKeys={[selectedRole]}
            mode="inline"
            items={items}
          />
          <Collapse
            className="roles-collapse"
            style={{
              marginLeft: "1rem",
              overflowY: "scroll",
              height: "60vh",
              width: "80%",
            }}
            defaultActiveKey={[
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
            ]}
            onChange={onChange}
          >
            {permissionAddSectionList?.moduleWithChannelPlatformAndPermissions
              ?.find((item) => item.channelName == selectedModule)
              ?.modules?.map((module, index) => (
                <Panel
                  key={index}
                  header={
                    <div>
                      <span>{module.name}</span>
                    </div>
                  }
                >
                  <div className="checkbox-container">
                    {module?.permissionViewModels?.length > 0 ? (
                      <>
                        {" "}
                        <div className="d-flex justify-content-end align-items-center">
                          <Switch
                            unCheckedChildren="Select All"
                            onChange={(e) => {
                              if (e) {
                                setCheckedPermission((prev) => [
                                  ...prev,
                                  ...module?.permissionViewModels?.map((item) =>
                                    item.id.toUpperCase()
                                  ),
                                ]);
                              } else {
                                module.permissionViewModels?.map((item) => {
                                  if (
                                    checkedPermission?.includes(
                                      item?.id?.toUpperCase()
                                    )
                                  ) {
                                    setCheckedPermission((prev) =>
                                      prev.filter(
                                        (old) => old != item?.id?.toUpperCase()
                                      )
                                    );
                                  }
                                });
                              }
                            }}
                            checkedChildren="Selected"
                          />
                        </div>
                        {module?.permissionViewModels?.map(
                          (permission, index) => {
                            return (
                              <Checkbox
                                className="checkbox-roles"
                                key={permission.id}
                                checked={checkedPermission?.includes(
                                  permission.id?.toUpperCase()
                                )}
                                onChange={(e) => {
                                  if (
                                    checkedPermission?.includes(
                                      permission.id.toUpperCase()
                                    )
                                  ) {
                                    setCheckedPermission((prev) =>
                                      prev.filter(
                                        (item) =>
                                          item != permission.id.toUpperCase()
                                      )
                                    );
                                  } else {
                                    setCheckedPermission((prev) => [
                                      ...prev,
                                      permission.id.toUpperCase(),
                                    ]);
                                  }
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: "normal",
                                    fontSize: "12px",
                                  }}
                                >
                                  {permission.name}
                                </span>
                              </Checkbox>
                            );
                          }
                        )}
                      </>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center">
                        <span style={{ margin: "auto", color: "#979797" }}>
                          No Permissions in this module !
                        </span>
                      </div>
                    )}
                  </div>
                </Panel>
              ))}
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default RolesAndPermission;

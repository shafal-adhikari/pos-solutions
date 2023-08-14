import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Pagination,
  Popconfirm,
  Select,
  Spin,
  Switch,
} from "antd";
import { Input } from "antd";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";
function AddPrinterLocation({ isOpen, setIsOpen }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [bulkSelected, setBulkSelected] = useState([]);

  const {
    allPrinterLocations,
    totalPrinterLocations,
    editLoading,
    printerLocationAddSection,
    addPrinterLocationSuccess,
    editData,
    addLoading,
    allLoading,
    deletePrinterLocationSuccess,
  } = useSelector((state) => state.posDeviceSettingsReducer);

  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_PRINTER_LOCATION_REQUEST",
      payload: [...bulkSelected],
    });
  };
  useEffect(() => {
    dispatch({
      type: "GET_ALL_PRINTER_LOCATION_REQUEST",
      payload: {
        Page: 1,
        PageSize: 5,
      },
    });
    setBulkSelected([]);
  }, [addPrinterLocationSuccess, deletePrinterLocationSuccess]);
  useEffect(() => {
    if (addPrinterLocationSuccess) {
      form.resetFields();
    }
  }, [addPrinterLocationSuccess]);
  useEffect(() => {
    // dispatch({
    //   type: "GET_POS_DEVICE_SECTION_LIST_REQUEST",
    // });
    form.setFieldValue("isActive", true);
  }, []);
  const editprinterLocationHandler = (id) => {
    dispatch({
      type: "EDIT_PRINTER_LOCATION_REQUEST",
      payload: id,
    });
  };
  const deleteprinterLocationHandler = (id, name) => {
    dispatch({
      type: "DELETE_PRINTER_LOCATION_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  const [searchKeyword, setSearchKeyword] = useState("");
  const addPrinterLocationHandler = (values) => {
    dispatch({
      type: "ADD_PRINTER_LOCATION_REQUEST",
      payload: {
        ...values,
        sortOrder: parseInt(values.sortOrder),
        Id: editData?.id ? editData.id : "",
      },
    });
  };
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_ALL_PRINTER_LOCATION_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
      },
    });
  }
  return (
    <Modal
      show={isOpen}
      size="lg"
      backdrop="static"
      onHide={() => setIsOpen(false)}
      id="businessModal"
      tabIndex={-1}
    >
      <Modal.Header className="modal-header">
        <h5 className="modal-title" id="businessnamemodalLabel">
          Add New Printer Location
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
        ></button>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form
          form={form}
          onFinish={addPrinterLocationHandler}
          fields={[
            {
              name: ["Name"],
              value: editData ? editData.name : form.getFieldValue("Name"),
            },
            {
              name: ["Description"],
              value: editData
                ? editData.description
                : form.getFieldValue("Description"),
            },
            {
              name: ["port"],
              value: editData ? editData.port : form.getFieldValue("port"),
            },
            {
              name: ["ipAddress"],
              value: editData
                ? editData.ipAddress
                : form.getFieldValue("ipAddress"),
            },
            {
              name: ["isActive"],
              value: editData
                ? editData?.isActive
                  ? true
                  : false
                : form.getFieldValue("isActive"),
            },
          ]}
        >
          <div className="newsupplier_form bg-light p-3">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12 categoryField">
                <div className=" form-group ">
                  <div className="row control-group">
                    <div className="col-md-4">
                      <div className="form-group">
                        <Form.Item
                          label="Name"
                          name="Name"
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Name",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <Form.Item
                          label="IP Address"
                          name="ipAddress"
                          rules={[
                            {
                              required: true,
                              message: "Please enter IP Address",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="IP Address"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <Form.Item
                          label="Port"
                          name="port"
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Port",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Port"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <Form.Item label="Description" name="Description">
                          <Input.TextArea
                            type="text"
                            className="form-control"
                            placeholder="Description"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <Form.Item
                        name="isActive"
                        label="Status"
                        valuePropName="checked"
                      >
                        <Switch defaultChecked={true} defaultChecked={true} />
                      </Form.Item>
                    </div>
                    <div className="col-md-12 d-flex mt-3">
                      <Button
                        htmlType="submit"
                        type="primary"
                        loading={addLoading}
                        className="btn btn-success btn-sm bg-theme border-0"
                      >
                        Save
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => setIsOpen(false)}
                        style={{ marginLeft: "5px" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <div className="card mt-2 ">
          <div className="card-body">
            <div className="table-body">
              <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
                <div className="delete_btn">
                  {bulkSelected.length > 0 && (
                    <a
                      onClick={bulkDeleteHandler}
                      className="btn btn-danger border-0 rounded-0"
                    >
                      <i className="fas fa-trash-alt me-1 " />
                      Delete
                    </a>
                  )}
                </div>
                <div className="table_search">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text  h-100 rounded-0"
                        id="search"
                      >
                        <i className="fas fa-search" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search now"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      aria-label="search"
                      aria-describedby="search"
                      spellCheck="false"
                      data-ms-editor="true"
                    />
                  </div>
                </div>
              </div>

              {allLoading ? (
                <TableSkeleton row={2} column={5} />
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input mt-2 catcheck"
                              type="checkbox"
                              checked={
                                allPrinterLocations?.length ==
                                bulkSelected.length
                              }
                              value={
                                allPrinterLocations?.length ==
                                bulkSelected.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelected(
                                    allPrinterLocations?.map((brand) => {
                                      return {
                                        Id: brand.id,
                                        Name: brand.name,
                                      };
                                    })
                                  );
                                } else {
                                  setBulkSelected([]);
                                }
                              }}
                              id="defaultCheck1"
                            />
                          </div>
                        </th>
                        <th>Name</th>
                        <th>IP Address</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPrinterLocations?.length > 0 ? (
                        allPrinterLocations?.map((printerLocation) => {
                          return (
                            <tr key={printerLocation.id}>
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input mt-2 catcheck"
                                    type="checkbox"
                                    checked={
                                      bulkSelected.find(
                                        (eachPrev) =>
                                          eachPrev.Id == printerLocation.id
                                      )
                                        ? true
                                        : false
                                    }
                                    value={
                                      bulkSelected.find(
                                        (eachPrev) =>
                                          eachPrev.Id == printerLocation.id
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (!e.target.checked) {
                                        setBulkSelected((prev) => {
                                          return prev.filter(
                                            (prevEach) =>
                                              prevEach.Id != printerLocation.id
                                          );
                                        });
                                      } else {
                                        setBulkSelected((prev) => {
                                          return [
                                            ...prev,
                                            {
                                              Id: printerLocation.id,
                                              Name: printerLocation.name,
                                            },
                                          ];
                                        });
                                      }
                                    }}
                                    id="defaultCheck1"
                                  />
                                </div>
                              </td>
                              <td>{printerLocation.name}</td>
                              <td>{printerLocation.ipAddress}</td>
                              <td>
                                <div
                                  className="form-check form-switch form-switch-lg text-start"
                                  dir="ltr"
                                >
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    readOnly
                                    checked={
                                      printerLocation.isActive ? true : false
                                    }
                                  />
                                </div>
                              </td>
                              <td>
                                <a
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    editprinterLocationHandler(
                                      printerLocation.id
                                    );
                                  }}
                                  className="btn btn-info btn-sm"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="left"
                                  title=""
                                  data-bs-original-title="Edit"
                                >
                                  <i
                                    className="fas fa-edit"
                                    aria-hidden="true"
                                  />
                                </a>
                                <Popconfirm
                                  title="Are you sure you want to delete"
                                  okText="Yes"
                                  cancelText="No"
                                  onConfirm={() =>
                                    deleteprinterLocationHandler(
                                      printerLocation.id,
                                      printerLocation.name
                                    )
                                  }
                                >
                                  <a
                                    className="btn btn-danger btn-sm ms-1"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="left"
                                    title=""
                                    data-bs-original-title="Delete"
                                  >
                                    <i
                                      className="fas fa-trash-alt"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </Popconfirm>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr style={{ textAlign: "center" }}>
                          <td colSpan={5}>No Records Found !</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="company_footer d-flex justify-content-end mt-3">
                <Pagination
                  total={totalPrinterLocations}
                  showTotal={(total, range) =>
                    `${
                      allPrinterLocations ? allPrinterLocations.length : 0
                    } out of ${total ? total : 0} items`
                  }
                  pageSize={5}
                  onShowSizeChange={onShowSizeChange}
                  defaultCurrent={1}
                  onChange={onShowSizeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddPrinterLocation;

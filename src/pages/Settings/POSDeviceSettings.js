import { Select, Switch, Form, Button } from "antd";
import Skeleton from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddDepartment from "./AddDepartment/AddDepartment";
import AddPOSDevice from "./AddPOSDevice/AddPOSDevice";
import AddPrinterLocation from "./AddPrinterLocation/AddPrinterLocation";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";

function POSDeviceSettings() {
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isPOSDeviceModalOpen, setIsPOSDeviceModalOpen] = useState(false);
  const [selectedPOSDevice, setSelectedPOSDevice] = useState();
  const [isPrinterLocationModalOpen, setIsPrinterLocationModalOpen] =
    useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    printerSetupSectionList,
    posDeviceSetup,
    allLoading,
    posDevices,
    departments,
    updateSetupLoading,
    posPrinters,
  } = useSelector((state) => state.posDeviceSettingsReducer);
  // console.log("sdfjaslkfjalfa", printerSetupSectionList);
  useEffect(() => {
    dispatch({
      type: "GET_PRINTER_SETUP_SECTION_REQUEST",
    });
    dispatch({
      type: "GET_POS_DEVICE_SETTINGS_REQUEST",
    });
  }, []);
  useEffect(() => {
    if (posDevices) {
      setSelectedPOSDevice(posDevices[0]?.id);
    }
  }, [posDevices]);
  useEffect(() => {
    if (selectedPOSDevice) {
      dispatch({
        type: "GET_PRINTER_DETAILS_REQUEST",
        payload: {
          id: selectedPOSDevice,
        },
      });
    }
  }, [selectedPOSDevice]);
  const [body, setBody] = useState({
    Id: "",
    PosDeviceIdentifier: "",
    OrderPrintAutomatically: true, //bool
    PrintBillAutomatically: false, //bool
    PrinterCategoryTypeAddViewModels: printerSetupSectionList?.posPrinters.map(
      (printer) => {
        return {
          PosPrinterId: printer.id,
          PrintSetMenuKit: true,
          CategoryTypeIds: printerSetupSectionList.cateogoryTypes.map(
            (category) => category.id
          ),
          PaperSize: "0mm",
          PrintInvoice: true,
        };
      }
    ),
  });

  console.log("edit pos device", posDeviceSetup);
  const foundData = (id) =>
    posDeviceSetup?.printerCategoryTypeAddViewModels.find(
      (eachPrinter) => eachPrinter.posPrinterId == id
    );
  const updateHandler = () => {
    dispatch({
      type: "UPDATE_PRINTER_SETUP_REQUEST",
      payload: {
        ...body,
        PrinterCategoryTypeAddViewModels:
          body.PrinterCategoryTypeAddViewModels.filter(
            (printer) => printer.PrintSize !== ""
          ),
      },
    });
  };
  useEffect(() => {
    if (printerSetupSectionList && posDeviceSetup) {
      setBody((prev) => {
        return {
          ...prev,
          Id: posDeviceSetup.id,
          OrderPrintAutomatically: posDeviceSetup.orderPrintAutomatically,
          PrintBillAutomatically: posDeviceSetup.printBillAutomatically,
          PrinterCategoryTypeAddViewModels:
            printerSetupSectionList?.posPrinters.map((printer, ind) => {
              return {
                PosPrinterId: printer.id,
                PrintSetMenuKit: foundData(printer.id)
                  ? foundData(printer.id).printSetMenuKit
                  : false,
                CategoryTypeIds: printerSetupSectionList.cateogoryTypes
                  .filter((category) =>
                    foundData(printer.id)?.categoryTypeIds.includes(category.id)
                  )
                  .map((item) => item.id),
                PaperSize: foundData(printer.id)?.paperSize,
                PrintInvoice: foundData(printer.id)
                  ? foundData(printer.id).printInvoice
                  : false,
              };
            }),
        };
      });
    }
  }, [printerSetupSectionList, posDeviceSetup]);
  const categoryAddHandler = (val, id, ind) => {
    console.log(val);
    setBody((prev) => {
      const newCategoryType = prev.PrinterCategoryTypeAddViewModels[
        ind
      ].CategoryTypeIds.filter((cat) => cat != id);
      if (val) {
        newCategoryType.push(id);
      }
      const newAddViewModel = [...prev.PrinterCategoryTypeAddViewModels];
      newAddViewModel[ind].CategoryTypeIds = newCategoryType;

      return {
        ...prev,
        PrinterCategoryTypeAddViewModels: newAddViewModel,
      };
    });
  };
  const switchHandler = (val, ind, name) => {
    setBody((prev) => {
      const newAddViewModel = [...prev.PrinterCategoryTypeAddViewModels];
      newAddViewModel[ind][name] = val;
      return {
        ...prev,
        PrinterCategoryTypeAddViewModels: newAddViewModel,
      };
    });
  };
  console.log("new body", body);
  return (
    <>
      <div className="possetting">
        <h6 className="fw-bold text-theme">Printer Settings</h6>
        {allLoading ? (
          <div className="card text-left border-0">
            <Form>
              <div className="card-body categoryField">
                <div className="supplier_filter1">
                  <div className="row">
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <FormItemSkeleton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        ) : (
          <div className="card text-left border-0">
            <div className="card-body">
              <div className="supplier_filter1">
                <div className="row">
                  <div className="col-md-3 col-lg-3">
                    <div className="form-group d-flex flex-column">
                      <div>
                        <label className="control-label">Departments</label>
                        <a
                          onClick={() => setIsDepartmentModalOpen(true)}
                          data-bs-toggle="modal"
                          data-bs-target="#printerlocationModal"
                        >
                          <i
                            className="fas fa-plus ms-1"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Add New Supplier From Here"
                            aria-label="Add New Supplier From Here"
                          />
                        </a>
                      </div>
                      <Select
                        placeholder="Departments"
                        showSearch
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={departments?.map((department) => {
                          return {
                            value: department.id,
                            label: department.value,
                          };
                        })}
                      ></Select>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3">
                    <div className="form-group d-flex flex-column">
                      <div>
                        <label className="control-label">POS Device</label>
                        <a
                          onClick={() => setIsPOSDeviceModalOpen(true)}
                          data-bs-toggle="modal"
                          data-bs-target="#printerlocationModal"
                        >
                          {" "}
                          <i
                            className="fas fa-plus"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Add New Supplier From Here"
                            aria-label="Add New Supplier From Here"
                          />
                        </a>
                      </div>
                      <Select
                        placeholder="Table"
                        showSearch
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={posDevices?.map((posDevice) => {
                          return {
                            value: posDevice.id,
                            label: posDevice.value,
                          };
                        })}
                      ></Select>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3">
                    <div className="form-group d-flex flex-column">
                      <div>
                        <label className="control-label">
                          Printer Settings
                        </label>
                        <a
                          onClick={() => setIsDepartmentModalOpen(true)}
                          data-bs-toggle="modal"
                          data-bs-target="#printerlocationModal"
                        >
                          <i
                            className="fas fa-plus ms-1"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title=""
                            data-bs-original-title="Add New Supplier From Here"
                            aria-label="Add New Supplier From Here"
                          />
                        </a>
                      </div>
                      <Select
                        placeholder="Printers"
                        showSearch
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={posPrinters?.map((department) => {
                          return {
                            value: department.id,
                            label: department.value,
                          };
                        })}
                      ></Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {allLoading ? (
          <div className="printersetup mt-3">
            <div className="card border-0">
              <div className="card-body">
                <Skeleton
                  count={0.15}
                  height={30}
                  className="me-2"
                  inline={true}
                />
                <Skeleton
                  count={0.15}
                  className="me-2"
                  height={30}
                  inline={true}
                />
                <Skeleton count={0.15} height={30} inline={true} />
              </div>
            </div>
          </div>
        ) : (
          <div className="printersetup mt-3">
            <div className="card border-0">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="print_head d-flex">
                    <div className="d-flex align-items-center">
                      <Switch
                        checked={body?.OrderPrintAutomatically}
                        onChange={(e) =>
                          setBody((prevBody) => {
                            return {
                              ...prevBody,
                              OrderPrintAutomatically: e,
                            };
                          })
                        }
                      />
                      <label
                        className="form-check-label ms-2 me-4"
                        htmlFor="customSwitchsizelg"
                      >
                        Order Printer Automatic
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <Switch
                        checked={body?.PrintBillAutomatically}
                        onChange={(e) =>
                          setBody((prevBody) => {
                            return {
                              ...prevBody,
                              PrintBillAutomatically: e,
                            };
                          })
                        }
                      />
                      <label
                        className="form-check-label ms-2  me-4"
                        htmlFor="customSwitchsizelg"
                      >
                        Auto Invoice Print
                      </label>
                    </div>
                    <div className="d-flex align-items-center">
                      <Select
                        style={{ minWidth: "200px" }}
                        placeholder="Select POS Device"
                        value={selectedPOSDevice}
                        onChange={(val) => setSelectedPOSDevice(val)}
                      >
                        {posDevices?.map((posDevice) => {
                          return (
                            <Select.Option key={posDevice.id} id={posDevice.id}>
                              {posDevice.value}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="print_btn">
                    <Button
                      type="primary"
                      // className="btn btn-success "
                      loading={updateSetupLoading}
                      onClick={updateHandler}
                    >
                      Update
                    </Button>
                  </div>
                </div>
                <hr />
                <div className="chooseprinter">
                  {printerSetupSectionList?.posPrinters?.map(
                    (posPrinter, ind) => {
                      return (
                        <div
                          className={
                            ind == 0
                              ? "row bg-secondary_light"
                              : "row bg-secondary_light mt-3"
                          }
                          key={posPrinter.id}
                        >
                          <div className="col-md-3 bg-secondary1 p-2">
                            <div className="d-flex ">
                              <div className="printimg">
                                <img
                                  src="assets/images/printer.svg"
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="print_para ms-3">
                                <h6 className="text-white fw-bold mb-0">
                                  <small>{posPrinter.value}</small>
                                </h6>
                                <hr className="bg-white" />
                                <div className="papersize">
                                  <h6 className="text-white fw-bold mb-0">
                                    <small>Paper Size</small>
                                  </h6>
                                  <div className="d-flex">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input mt-2 catcheck"
                                        type="checkbox"
                                        checked={
                                          body
                                            ?.PrinterCategoryTypeAddViewModels?.[
                                            ind
                                          ]?.PaperSize == "80mm"
                                        }
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            switchHandler(
                                              "80mm",
                                              ind,
                                              "PaperSize"
                                            );
                                          } else {
                                            switchHandler("", ind, "PaperSize");
                                          }
                                        }}
                                        defaultValue=""
                                        id="defaultCheck1"
                                      />
                                      <label htmlFor="" className="text-white">
                                        80mm
                                      </label>
                                    </div>
                                    <div className="form-check ms-2">
                                      <input
                                        className="form-check-input mt-2 catcheck"
                                        type="checkbox"
                                        checked={
                                          body
                                            ?.PrinterCategoryTypeAddViewModels?.[
                                            ind
                                          ]?.PaperSize == "50mm"
                                        }
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            switchHandler(
                                              "50mm",
                                              ind,
                                              "PaperSize"
                                            );
                                          } else {
                                            switchHandler("", ind, "PaperSize");
                                          }
                                        }}
                                        defaultValue=""
                                        id="defaultCheck1"
                                      />
                                      <label htmlFor="" className="text-white">
                                        50mm
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-9">
                            <div className="row mt-2">
                              <div className="col-lg-3 col-md-3 col-xxl-2">
                                <div className="">
                                  <label
                                    className="form-check-label  me-4"
                                    htmlFor="customSwitchsizelg"
                                  >
                                    <small>Set Menu</small>
                                  </label>
                                  <Switch
                                    checked={
                                      body.PrinterCategoryTypeAddViewModels?.[
                                        ind
                                      ]?.PrintSetMenuKit
                                    }
                                    onChange={(e) => {
                                      switchHandler(e, ind, "PrintSetMenuKit");
                                    }}
                                  />
                                </div>
                              </div>
                              {printerSetupSectionList?.cateogoryTypes.map(
                                (categoryType) => {
                                  return (
                                    <div
                                      className="col-lg-3 col-md-3 col-xxl-2"
                                      key={categoryType.id + posPrinter.id}
                                    >
                                      <div className="">
                                        <label
                                          className="form-check-label  me-4"
                                          htmlFor="customSwitchsizelg"
                                        >
                                          <small>{categoryType.value}</small>
                                        </label>
                                        <Switch
                                          checked={body.PrinterCategoryTypeAddViewModels?.[
                                            ind
                                          ]?.CategoryTypeIds.includes(
                                            categoryType.id
                                          )}
                                          onChange={(e) =>
                                            categoryAddHandler(
                                              e,
                                              categoryType.id,
                                              ind
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                              <div className="col-lg-3 col-md-3 col-xxl-2">
                                <div className="">
                                  <label
                                    className="form-check-label  me-4"
                                    htmlFor="customSwitchsizelg"
                                  >
                                    <small>Invoice</small>
                                  </label>
                                  <Switch
                                    checked={
                                      body.PrinterCategoryTypeAddViewModels?.[
                                        ind
                                      ]?.PrintInvoice
                                    }
                                    onChange={(e) =>
                                      switchHandler(e, ind, "PrintInvoice")
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isDepartmentModalOpen && (
        <AddDepartment
          isOpen={isDepartmentModalOpen}
          setIsOpen={setIsDepartmentModalOpen}
        />
      )}
      {isPOSDeviceModalOpen && (
        <AddPOSDevice
          isOpen={isPOSDeviceModalOpen}
          setIsOpen={setIsPOSDeviceModalOpen}
        />
      )}
      {isPrinterLocationModalOpen && (
        <AddPrinterLocation
          isOpen={isPrinterLocationModalOpen}
          setIsOpen={setIsPrinterLocationModalOpen}
        />
      )}
    </>
  );
}

export default POSDeviceSettings;

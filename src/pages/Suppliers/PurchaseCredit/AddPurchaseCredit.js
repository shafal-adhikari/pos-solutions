import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import SendForApproval from "../SendForApproval";
import { dayjs } from "../../../helpers/frontendHelper";
import FormItemSkeleton from "../../../components/FormItemSkeleton/FormItemSkeleton";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";
function AddPurchaseCredit({ editClicked, setIsAddClicked, setIsEditClicked }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_ALL_PURCHASE_CREDIT_ADD_SECTION_REQUEST",
    });
  }, []);
  const {
    purchaseSectionList,
    productsBySuppliers,
    editData,
    productLoading,
    addLoading,
    addSuccess,
    allLoading,
  } = useSelector((state) => state.supplierReducer);
  useEffect(() => {
    if (addSuccess) {
      setApprovalModalOpen(false);
    }
  }, [addSuccess]);
  const [form] = Form.useForm();
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const {
    activeStore: { dateFormat },
  } = useSelector((state) => state.authenticationReducer);
  const {
    currencies,
    suppliers,
    purchaseTaxes,
    noTaxes,
    countryCityStates,
    taxExclusiveInclusives,
    purchaseCreditNoteNumber,
    status,
  } = purchaseSectionList;
  const supplierId = Form.useWatch("supplierId", form);
  const currentStatus = status?.find(
    (status) => status.id == editData?.statusId
  )?.additionalValue;
  const [saveClicked, setSaveClicked] = useState(false);
  useLayoutEffect(() => {
    if (editData && editClicked) {
      form.setFields([
        {
          name: "supplierId",
          value: editData?.supplierId,
        },
        {
          name: "PostingDate",
          value: dayjs(editData?.postingDate, dateFormat),
        },
        {
          name: "DueDate",
          value: dayjs(editData?.dueDate, dateFormat),
        },
        {
          name: "PurchaseCreditNoteNumber",
          value: editData?.purchaseCreditNoteNumber,
        },
        {
          name: "currencyId",
          value: editData?.currencyId,
        },
        {
          name: "productLists",
          value: editData?.itemAddViewModels.map((product) => {
            return {
              Tax: product.taxTypeStoreId,
              id: product.id,
              ProductVariationId: product.productVariationId,
              TaxAmount: parseFloat(product.taxAmount),
              Quantity: parseFloat(product.quantity),
              UnitPrice: parseFloat(product.unitPrice),
              Amount: parseFloat(product.amount),
              Discount: parseFloat(product.discount),
            };
          }),
        },
      ]);
    }
  }, [editData, editClicked]);
  useEffect(() => {
    if (supplierId) {
      dispatch({
        type: "GET_PRODUCTS_BY_SUPPLIER_REQUEST",
        payload: {
          id: supplierId,
        },
      });
    }
  }, [supplierId]);
  useLayoutEffect(() => {
    if (taxExclusiveInclusives) {
      form.setFieldValue(
        "taxExclusiveInclusiveId",
        taxExclusiveInclusives[0].id
      );
      form.setFieldValue("currencyId", currencies[0]?.id);
      form.setFieldValue("PurchaseCreditNoteNumber", purchaseCreditNoteNumber);
    }
  }, [taxExclusiveInclusives, purchaseCreditNoteNumber]);
  const [totalData, setTotalData] = useState({
    subTotal: 0,
    taxAmount: 0,
    total: 0,
  });
  const productLists = Form.useWatch("productLists", form);
  const taxExclusiveInclusiveId = Form.useWatch(
    "taxExclusiveInclusiveId",
    form
  );
  useEffect(() => {
    if (taxExclusiveInclusiveId && purchaseTaxes && noTaxes) {
      const additionalValue = taxExclusiveInclusives?.find(
        (tax) => tax.id == taxExclusiveInclusiveId
      )?.additionalValue;
      productLists?.map((product, index) => {
        amountChangeHandler(
          "Tax",
          index,
          additionalValue == "NoTax"
            ? noTaxes[0]?.id
            : purchaseTaxes?.find(
                (purchaseTax) => purchaseTax.id == product.Tax
              )
            ? product.Tax
            : purchaseTaxes[0]?.id
        );
      });
    }
  }, [taxExclusiveInclusiveId, purchaseTaxes, noTaxes]);
  useEffect(() => {
    if (productLists) {
      setTotalData(() => {
        let subTotal = 0;
        let taxAmount = 0;
        let total = 0;
        productLists?.map((product) => {
          subTotal = subTotal + product.SubTotal;
          taxAmount = taxAmount + product.TaxAmount;
          total = total + parseFloat(product.Amount);
        });
        return {
          subTotal,
          taxAmount: taxAmount.toFixed(2),
          total,
        };
      });
    }
  }, [productLists]);
  const amountChangeHandler = (name, index, val) => {
    let newProductList = [...productLists];
    newProductList[index][name] = val;
    const taxType = taxExclusiveInclusives?.find(
      (tax) => tax.id == taxExclusiveInclusiveId
    )?.additionalValue;
    const taxToUse = taxType == "NoTax" ? noTaxes : purchaseTaxes;
    const taxPercentage = taxToUse?.find(
      (purchaseTax) => purchaseTax.id == newProductList[index].Tax
    )?.additionalValue;
    // switch (name) {
    //   case "Quantity":
    const quantity = newProductList[index].Quantity
      ? parseFloat(newProductList[index].Quantity)
      : 0;
    const unitPrice = newProductList[index].UnitPrice
      ? parseFloat(newProductList[index].UnitPrice)
      : 0;
    const discountPerc = newProductList[index].Discount
      ? parseFloat(newProductList[index].Discount)
      : 0;

    let itemSubTotal = quantity * unitPrice;
    let discountVal = (discountPerc / 100) * itemSubTotal;

    let total = itemSubTotal - discountVal;
    let taxPercentageValue = parseFloat(taxPercentage) / 100;
    let totalTax = 0;
    if (taxType == "Exclusive") {
      totalTax = taxPercentageValue * total;
      total = total + totalTax;
    } else {
      totalTax = (total * taxPercentageValue) / (1 + taxPercentageValue);
    }
    newProductList[index].TaxAmount = totalTax;
    newProductList[index].SubTotal = itemSubTotal - discountVal;
    newProductList[index].Amount = total.toFixed(2);
    form.setFieldValue("productLists", newProductList);
  };
  const submitHandler = (values, pOrderNum) => {
    console.log(values.productLists);
    const deletedIds = editData?.itemAddViewModels
      ?.filter((item) => {
        const found = values.productLists?.find(
          (value) => value.ProductVariationId == item.productVariationId
        );
        if (found) return false;
        return true;
      })
      .map((n) => n.id);
    const body = {
      ...values,
      Id: pOrderNum ? "" : editData?.id ? editData.id : "",
      PurchaseCreditNoteNumber: pOrderNum
        ? pOrderNum
        : values.PurchaseCreditNoteNumber,
      PostingDate:
        dayjs(values.PostingDate)
          .format(dateFormat.toUpperCase())
          .split(" ")[0] + " 00:00:00",
      DueDate:
        dayjs(values.DueDate).format(dateFormat.toUpperCase()).split(" ")[0] +
        " 00:00:00",
      TotalWithoutTaxAmount: String(totalData.subTotal),
      TotalAmount: String(totalData.total),
      DeletedIds: deletedIds,
      TotalTaxAmount: String(totalData.taxAmount),
      ItemAddViewModels: values.productLists.map((product) => {
        return {
          ...product,
          TaxTypeStoreId: product.Tax,
          id: product.id ? product.id : "",
          Description: product.description,
          ItemNo: undefined,
          SubTotal: undefined,
          TaxAmount: undefined,
          Quantity: String(product.Quantity),
          UnitPrice: String(product.UnitPrice),
          Tax: String(product.TaxAmount.toFixed(2)),
          Amount: String(product.Amount),
          Discount: String(product.Discount),
        };
      }),
      productLists: undefined,
    };
    console.log(body);
    // return;
    dispatch({
      type: "CREATE_PURCHASE_CREDIT_REQUEST",
      payload: body,
    });
  };

  return (
    <>
      <Form form={form} onFinish={submitHandler}>
        {allLoading ? (
          <>
            <div className="card text-left border">
              <div className="card-body categoryField">
                <div className="supplier_filter1">
                  <div className="row">
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group"></div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <div className="pt-0">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* purchase order filter end */}
            {/* purchase order table starts here */}
            <div className="card mt-4">
              <div className="card-body">
                <div className="pay_invoices">
                  <div className="media align-items-center d-flex justify-content-between align-items-md-start flex-column flex-md-row">
                    <div className="col-md-2">
                      <div className="w-100 d-flex align-items-center">
                        {/* <label for="exampleInputEmail1" class="mr-2 mt-1">Tax</label> */}
                        <FormItemSkeleton />
                      </div>
                    </div>
                  </div>
                </div>
                <TableSkeleton row={2} column={7} />
                <div className="d-md-flex flex-md-wrap">
                  <div className="pt-2 mb-3 wmin-md-400 ms-auto">
                    <h6 className="mb-3 text-left">Total due</h6>
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th className="text-left">Subtotal:</th>
                            <td className="text-right">
                              <Skeleton />
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left">Tax Amount:</th>
                            <td className="text-right">
                              <Skeleton />
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left">Total:</th>
                            <td className="text-right text-primary">
                              <h5 className="font-weight-semibold">
                                <Skeleton />
                              </h5>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card text-left border">
              <div className="card-body categoryField">
                <div className="supplier_filter1">
                  <div className="row">
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <Form.Item
                          label="Supplier Name"
                          name="supplierId"
                          rules={[
                            {
                              required: true,
                              message: "Missing Supplier",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Supplier Name"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={suppliers?.map((supplier) => {
                              return {
                                label: supplier.value,
                                value: supplier.id,
                              };
                            })}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <Form.Item
                          label="Posting Date"
                          name="PostingDate"
                          rules={[
                            {
                              required: true,
                              message: "Missing Posting Date",
                            },
                          ]}
                        >
                          <DatePicker
                            className="w-100"
                            format={dateFormat.toUpperCase().split(" ")[0]}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <Form.Item
                          label="Due Date"
                          name="DueDate"
                          rules={[
                            {
                              required: true,
                              message: "Missing Due Date",
                            },
                          ]}
                        >
                          <DatePicker
                            className="w-100"
                            format={dateFormat.toUpperCase().split(" ")[0]}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <Form.Item
                          label="Credit Note No."
                          name="PurchaseCreditNoteNumber"
                          rules={[
                            {
                              required: true,
                              message: "Missing Purchase Order Number",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            readOnly
                            placeholder="Eg: 0012"
                            rules={[
                              {
                                required: true,
                                message: "Missing Order Number",
                              },
                            ]}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      <div className="form-group">
                        <div className="pt-0">
                          <Form.Item label="Currency" name="currencyId">
                            <Select
                              className="w-100"
                              placeholder="Currency"
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              options={currencies?.map((currency) => {
                                return {
                                  label: currency.value,
                                  value: currency.id,
                                };
                              })}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <div className="pay_invoices">
                  <div className="media align-items-center d-flex justify-content-between align-items-md-start flex-column flex-md-row">
                    <div className="col-md-2">
                      <div className="w-100 d-flex align-items-center">
                        {/* <label for="exampleInputEmail1" class="mr-2 mt-1">Tax</label> */}
                        <Form.Item
                          className="w-100"
                          name="taxExclusiveInclusiveId"
                        >
                          <Select
                            className="w-100"
                            options={taxExclusiveInclusives?.map((tax) => {
                              return {
                                label: tax.value,
                                value: tax.id,
                              };
                            })}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
                {/* tablestarts */}
                <Form.List
                  name="productLists"
                  initialValue={[
                    {
                      ItemNo: null,
                      Description: "",
                      Quantity: 1,
                      UnitPrice: 0,
                      Discount: 0,
                      Amount: 0,
                      Tax: 0,
                      TaxAmount: 0,
                    },
                  ]}
                >
                  {(fields, { add, remove }) => (
                    <>
                      <div className="table-responsive mt-3">
                        <table className="table table-bordered align-middle table-nowrap mb-0">
                          <thead>
                            <tr className="table-light">
                              <th>Item No.</th>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Unit Price</th>
                              <th>Dis %</th>
                              <th>Tax</th>
                              <th> Amount</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {fields.map(
                              ({ key, name, ...restField }, index) => (
                                <tr key={index} className="table-with-input">
                                  <td className="w-20">
                                    <Form.Item
                                      name={[name, "ProductVariationId"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Missing Item",
                                        },
                                      ]}
                                    >
                                      <Select
                                        placeholder="Item No"
                                        showSearch
                                        showArrow={false}
                                        onChange={(val) => {
                                          const unitPrice =
                                            productsBySuppliers?.find(
                                              (product) =>
                                                product.productVariationId ==
                                                val
                                            ).unitPrice;
                                          const newList = [...productLists];
                                          newList[index].UnitPrice = unitPrice;
                                          newList[index].ProductVariationId =
                                            val;
                                          form.setFieldValue(
                                            "productLists",
                                            newList
                                          );
                                        }}
                                        notFoundContent={
                                          <span>
                                            {supplierId
                                              ? "No Products Found"
                                              : "Select supplier"}
                                          </span>
                                        }
                                        filterOption={(input, option) =>
                                          (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                        }
                                        loading={productLoading}
                                        options={productsBySuppliers?.map(
                                          (product) => {
                                            return {
                                              label:
                                                product.productVariationName,
                                              value: product.productVariationId,
                                            };
                                          }
                                        )}
                                      />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <Form.Item name={[name, "Description"]}>
                                      <Input.TextArea placeholder="Description" />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <Form.Item name={[name, "Quantity"]}>
                                      <Input
                                        type="number"
                                        placeholder="Quantity"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Missing Quantity",
                                          },
                                        ]}
                                        onChange={(e) =>
                                          amountChangeHandler(
                                            "Quantity",
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <Form.Item name={[name, "UnitPrice"]}>
                                      <Input
                                        type="number"
                                        placeholder="Unit Price"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Missing Unit Price",
                                          },
                                        ]}
                                        readOnly
                                        onChange={(e) =>
                                          amountChangeHandler(
                                            "UnitPrice",
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <Form.Item
                                      name={[name, "Discount"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Missing Discount",
                                        },
                                      ]}
                                    >
                                      <Input
                                        type="number"
                                        placeholder="Dis %"
                                        onChange={(e) =>
                                          amountChangeHandler(
                                            "Discount",
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </td>
                                  <td style={{ width: "13%" }}>
                                    {" "}
                                    <Form.Item
                                      name={[name, "Tax"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Missing Tax",
                                        },
                                      ]}
                                    >
                                      <Select
                                        placeholder="Tax"
                                        showSearch
                                        showArrow={false}
                                        notFoundContent={null}
                                        filterOption={(input, option) =>
                                          (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                        }
                                        options={
                                          taxExclusiveInclusives?.find(
                                            (tax) =>
                                              tax.id == taxExclusiveInclusiveId
                                          )?.additionalValue == "NoTax"
                                            ? noTaxes?.map((tax) => {
                                                return {
                                                  label: tax.value,
                                                  value: tax.id,
                                                };
                                              })
                                            : purchaseTaxes?.map((tax) => {
                                                return {
                                                  label: tax.value,
                                                  value: tax.id,
                                                };
                                              })
                                        }
                                      />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <Form.Item name={[name, "Amount"]}>
                                      <Input
                                        type="number"
                                        readOnly
                                        placeholder="Amount"
                                      />
                                    </Form.Item>
                                  </td>
                                  <td style={{ display: "none" }}>
                                    <Form.Item name={[name, "TaxAmount"]}>
                                      <Input
                                        type="number"
                                        placeholder="TaxAmount"
                                      />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <a
                                      onClick={() => remove(name)}
                                      className="btn btn-danger btn-sm"
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
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="addlinetable mt-3">
                        <a
                          onClick={() =>
                            add({
                              ItemNo: null,
                              Description: "",
                              Quantity: 1,
                              UnitPrice: 0,
                              Discount: 0,
                              TaxAmount: 0,
                              Tax:
                                taxExclusiveInclusives?.find(
                                  (tax) => tax.id == taxExclusiveInclusiveId
                                )?.additionalValue == "NoTax"
                                  ? noTaxes[0]?.id
                                  : purchaseTaxes[0]?.id,
                              Amount: 0,
                            })
                          }
                          className="btn btn-primary all_btn rounded-0 text-white"
                        >
                          <i className="fas fa-plus " />
                          Add Another Line
                        </a>
                      </div>
                    </>
                  )}
                </Form.List>
                <div className="d-md-flex flex-md-wrap">
                  <div className="pt-2 mb-3 wmin-md-400 ms-auto">
                    <h6 className="mb-3 text-left">Total due</h6>
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th className="text-left">Subtotal:</th>
                            <td className="text-right">
                              {String(totalData?.subTotal)}
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left">Tax Amount:</th>
                            <td className="text-right">
                              {String(totalData?.taxAmount)}
                            </td>
                          </tr>
                          <tr>
                            <th className="text-left">Total:</th>
                            <td className="text-right text-primary">
                              <h5 className="font-weight-semibold">
                                ${String(totalData?.total)}
                              </h5>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Add Notes*/}
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className=" pt-0">
                      {" "}
                      <a
                        data-bs-toggle="collapse"
                        href="#addnewnotes"
                        role="button"
                        aria-expanded="false"
                        aria-controls="addnewnotes"
                        className="advanced collapsed font-weight-bold"
                      >
                        {" "}
                        Add Notes <i className="fa fa-angle-down" />{" "}
                      </a>
                      <div className="collapse" id="addnewnotes">
                        <div className="form-group">
                          <div className="">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="pur_inst">
                                          <div className=" d-flex-row">
                                            <div className="form-group">
                                              <div className=" pt-0">
                                                {/* <label class="mb-0">Delivery Instructions</label> */}
                                                <Form.Item name="Notes">
                                                  <Input.TextArea
                                                    rows={6}
                                                    placeholder="Your Notes Here..."
                                                  />
                                                </Form.Item>
                                                {/* <textarea
                                              id="message"
                                              rows={6}
                                              className="form-control"
                                              placeholder="Your Notes Here..."
                                              defaultValue={""}
                                            /> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add Comments*/}
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className=" pt-0">
                      {" "}
                      <a
                        data-bs-toggle="collapse"
                        href="#addnewcomments"
                        role="button"
                        aria-expanded="false"
                        aria-controls="addnewcomments"
                        className="advanced collapsed font-weight-bold text-danger"
                      >
                        {" "}
                        Add Comments <i className="fa fa-angle-down" />{" "}
                      </a>
                      <div className="collapse show" id="addnewcomments">
                        <div className="form-group">
                          <div className="">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="pur_inst">
                                          <div className=" d-flex-row">
                                            <div className="form-group">
                                              <div className=" pt-0">
                                                {/* <label class="mb-0">Delivery Instructions</label> */}
                                                <Form.Item name="Comments">
                                                  <Input.TextArea
                                                    rows={3}
                                                    placeholder="Your Comments Here..."
                                                  />
                                                </Form.Item>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Buttons */}
                <div className="add_btn border-top pt-4 mt-4">
                  <div className="col-md-12 text-right">
                    {/* Split dropright button */}
                    {currentStatus !== "Approved" &&
                      currentStatus !== "AwaitingApproval" &&
                      currentStatus !== "Closed" && (
                        <div className="btn-group dropdown p-0 approve_btn">
                          <Button
                            type="primary"
                            loading={addLoading}
                            onClick={() => {
                              form.validateFields().then(() => {
                                submitHandler({
                                  ...form.getFieldsValue(),
                                  statusId: status?.find(
                                    (status) =>
                                      status.additionalValue == "Draft"
                                  )?.id,
                                });
                              });
                              setSaveClicked(true);
                            }}
                          >
                            Save as Draft
                          </Button>
                        </div>
                      )}
                    {currentStatus == "AwaitingApproval" && (
                      <div className="btn-group dropdown p-0 approve_btn">
                        <Button
                          type="primary"
                          loading={addLoading}
                          onClick={() => {
                            form.validateFields().then(() => {
                              submitHandler({
                                ...form.getFieldsValue(),
                                statusId: status?.find(
                                  (status) =>
                                    status.additionalValue == "Approved"
                                )?.id,
                              });
                            });
                            setSaveClicked(true);
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    )}
                    {currentStatus == "Approved" && (
                      <div className="btn-group dropdown p-0 approve_btn">
                        <Button
                          type="primary"
                          loading={addLoading}
                          onClick={() => {
                            form.validateFields().then(() => {
                              submitHandler({
                                ...form.getFieldsValue(),
                                statusId: status?.find(
                                  (status) => status.additionalValue == "Closed"
                                )?.id,
                              });
                            });
                            setSaveClicked(true);
                          }}
                        >
                          Close and Create New
                        </Button>
                      </div>
                    )}
                    {currentStatus == "Closed" && (
                      <div className="btn-group dropdown p-0 approve_btn">
                        <Button
                          type="primary"
                          loading={addLoading}
                          onClick={() => {
                            form.validateFields().then(() => {
                              submitHandler(
                                {
                                  ...form.getFieldsValue(),
                                  statusId: status?.find(
                                    (status) =>
                                      status.additionalValue == "Draft"
                                  )?.id,
                                },
                                purchaseCreditNoteNumber
                              );
                            });
                            setSaveClicked(true);
                          }}
                        >
                          Copy and Create New
                        </Button>
                      </div>
                    )}
                    <div className="ms-2 btn-group dropdown p-0 approve_btn">
                      {currentStatus != "Approved" &&
                        currentStatus != "Closed" && (
                          <Button
                            loading={addLoading}
                            style={{ background: "#00205A", color: "#fff" }}
                            onClick={() => {
                              form.validateFields().then(() => {
                                setApprovalModalOpen(true);
                              });
                              setSaveClicked(true);
                            }}
                          >
                            Send for Approval
                          </Button>
                        )}
                    </div>
                    {currentStatus != "Approved" &&
                      currentStatus != "Closed" && (
                        <div className="ms-2 btn-group dropdown p-0 approve_btn">
                          <Button type="secondary">Save and Create New</Button>
                        </div>
                      )}
                    <div className="ms-2 btn-group dropdown p-0 approve_btn">
                      <Button
                        type="danger"
                        onClick={() => {
                          setIsEditClicked(false);
                          setIsAddClicked(false);
                        }}
                        className="btn btn-danger border-0 rounded-0"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Form>
      <SendForApproval
        isOpen={approvalModalOpen}
        mailSender={"adhikarishafal0@gmail.com"}
        subject={"New Purchase Order"}
        submitHandler={(vals) => {
          const EmailModel = {
            To: vals.EmailTo,
            CC: vals.EmailCC,
            SenderEmail: "adhikarishafal0@gmail.com",
            Subject: vals.Subject,
            Message: vals.Message,
          };
          submitHandler({
            ...form.getFieldsValue(),
            EmailModel,
            IsSendEmail: vals.IsSendEmail ? true : false,
            statusId: status?.find(
              (status) => status.additionalValue == "AwaitingApproval"
            )?.id,
          });
        }}
        setIsOpen={setApprovalModalOpen}
      />
    </>
  );
}

export default AddPurchaseCredit;

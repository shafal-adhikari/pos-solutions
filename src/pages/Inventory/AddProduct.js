/** @format */

import {
  AutoComplete,
  Button,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Select,
  Spin,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import Skeleton from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import InputColor from "../Settings/InputColor";
function AddProduct({ isEdit, setIsEdit }) {
  const dispatch = useDispatch();
  const [createNewClicked, setCreateNewClicked] = useState(false);
  const [form] = Form.useForm();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const {
    productAddSection,
    addOnsData,
    addLoading,
    addAndNewLoading,
    isLoading,
    editData,
    addSuccess,
  } = useSelector((state) => state.inventoryReducer);
  useEffect(() => {
    dispatch({
      type: "GET_PRODUCT_ADD_SECTION_REQUEST",
    });
    if (setCreateNewClicked && addSuccess) {
      form.resetFields();
      setSelectedAddOns([]);
    }
  }, [addSuccess, setCreateNewClicked]);
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [deletedAddOns, setDeletedAddOns] = useState([]);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  useEffect(() => {
    if (image) {
      setImageError(null);
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const [imageError, setImageError] = useState();
  const [selectedOrderType, setSelectedOrderType] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (productAddSection)
      form.setFieldValue(
        "taxExclusiveInclusiveId",
        productAddSection?.taxInclusiveExclusive?.find(
          (tax) => tax.isSelected == true
        )?.id
      );
    setSelectedOrderType(productAddSection?.orderTypes?.[0]?.id);
  }, [productAddSection]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [checked, setChecked] = useState();
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  useEffect(() => {
    if (addSuccess) {
      console.log("create new clicked", createNewClicked);
      !createNewClicked ? navigate("/inventory/list") : form.resetFields();
      isEdit && setIsEdit(false);
    }
  }, [addSuccess, createNewClicked, isEdit]);
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchKeyword) {
        dispatch({
          type: "GET_PRODUCT_ADDONS_REQUEST",
          payload: {
            Page: 1,
            PageSize: 10,
            SearchKeywords: searchKeyword,
          },
        });
      }
    }, 500);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchKeyword]);
  const addProductHandler = (values, createNew) => {
    const formData = new FormData();
    const request = {
      ...values,
      Description: convertToHTML(editorState.getCurrentContent()),
      id: editData && isEdit ? editData.id : "",
      DeletedAddOnProductsIds: editData && isEdit ? deletedAddOns : [],
      DeletedProductVariationsIds: null,
      DeletedProductMacrosIds: null,
      IsImageDeleted:
        editData && isEdit && !imagePreview ? isImageDeleted : undefined,
      ProductMacros: values.ProductMacros.filter(
        (macros) => macros.name !== "" && macros.value !== ""
      ).map((macro) => {
        return {
          ...macro,
          Id: macro.id ? macro.id : "",
        };
      }),
      productVariations: values.productVariations.map((variation, i) => {
        return {
          ...variation,
          isDefault: checked == i,
          Id: variation.id ? variation.id : "",
        };
      }),
      addOnProducts: selectedAddOns,
      ProductColors: values.ProductColors.map((color) => {
        return {
          ...color,
          id: color.id ? color.id : "",
        };
      }),
    };
    formData.append("Request", JSON.stringify(request));
    if (image) {
      formData.append("Image", image);
    }
    console.log(request);
    // return;
    dispatch({
      type: createNew ? "ADD_PRODUCT_WITH_NEW_REQUEST" : "ADD_PRODUCT_REQUEST",
      payload: formData,
    });
  };

  useEffect(() => {
    form.setFieldValue("ProductMacros", [
      {
        Id: "",
        name: "",
        value: "",
      },
    ]);
    form.setFieldValue("ProductColors", [
      {
        id: "",
        name: "",
        value: "",
        IsMultiColor: false,
      },
    ]);
    form.setFieldValue("productVariations", [
      {
        id: "",
        price: "",
        name: "Regular",
        stockCount: "",
        minimumStockAlertCount: "",
        maximumStockAlertCount: "",
        calories: "",
      },
    ]);
    form.setFieldValue("addOnProducts", []);
  }, [addSuccess]);
  const generateCategoriesOption = (categories) => {
    if (!categories || categories?.length < 1) {
      return undefined;
    }
    return categories.map((category) => {
      return {
        value: category.categoryId,
        title: category.categoryName,
        children: generateCategoriesOption(category.childernCategories),
      };
    });
  };
  useEffect(() => {
    if (!isEdit) setChecked(0);
  }, [isEdit]);

  useEffect(() => {
    if (editData && isEdit) {
      let indx = editData.productVariations.findIndex(
        (variation) => variation.isDefault
      );
      setChecked(indx);
      form.setFields([
        {
          name: "Name",
          value: editData.name,
        },
        {
          name: "isActive",
          value: editData.isActive,
        },
        {
          name: "Code",
          value: editData.code,
        },
        {
          name: "brandId",
          value: editData.brandId ? editData.brandId : null,
        },
        {
          name: "productCategoryId",
          value: editData.productCategoryId,
        },
        {
          name: "supplierId",
          value: editData.supplierId ? editData.supplierId : null,
        },
        {
          name: "taxExclusiveInclusiveId",
          value: editData.taxExclusiveInclusiveId,
        },
        {
          name: "SupplierItemCode",
          value: editData.supplierProductCode,
        },
        {
          name: "Allergens",
          value: editData.allergens,
        },
        {
          name: "productVariations",
          value: editData.productVariations,
        },
        {
          name: "ProductMacros",
          value: editData.productMacros,
        },
        {
          name: "ProductColors",
          value: editData.productColors,
        },
      ]);
      const descriptionData = convertFromHTML(editData.description);
      const description = EditorState.createWithContent(descriptionData);
      setEditorState(description);
      setImagePreview(editData.imagePath);
      setSelectedAddOns(editData.addOnProducts);
    }
  }, [editData, isEdit]);
  const selectAddOnHandler = (val) => {
    const addOns = selectedAddOns.filter(
      (addOn) => addOn.productId.toLowerCase() !== val.id.toLowerCase()
    );
    setSelectedAddOns([
      ...addOns,
      {
        id: "",
        productId: val.id,
        name: val.name,
      },
    ]);
    setSearchKeyword("");
  };
  console.log("selected AddOns", selectedAddOns);
  return (
    <>
      {isEdit && (
        <div
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => setIsEdit(false)}
        >
          <BsFillArrowLeftCircleFill size={22} />
          <h5 className="ms-3">Edit Product</h5>
        </div>
      )}
      <div className="menu_inner myorders">
        {isLoading ? (
          <Form
            form={form}
            onFinish={addProductHandler}
            fields={[
              {
                name: "Code",
                value:
                  editData && isEdit ? editData.code : productAddSection?.code,
              },

              {
                name: "orderTypeId",
                value: form.getFieldValue("orderTypeId")
                  ? form.getFieldValue("orderTypeId")
                  : productAddSection?.orderTypes[0]?.id,
              },
            ]}
          >
            <div className="row categoryField">
              {/* Items form */}
              <div className="card p-0 border-0 rounded-3">
                <div className="card-body bg-light-red">
                  <div className="row addacc_form suppliernewitem_form">
                    <div className="form-group col-md-4">
                      <div className=" pt-0">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <div className=" pt-0">
                        <FormItemSkeleton />
                      </div>
                    </div>
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <FormItemSkeleton />
                    </div>
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <FormItemSkeleton />
                    </div>
                    <div className="form-group col-md-4">
                      <FormItemSkeleton />
                    </div>
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <FormItemSkeleton />
                    </div>
                    {/* end row */}
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <FormItemSkeleton />
                    </div>
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <FormItemSkeleton />
                    </div>
                    {/* end row */}
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <FormItemSkeleton />
                    </div>
                    <div className="form-group col-md-1">
                      <FormItemSkeleton />
                    </div>
                    {/* end row */}
                    <div className="row">
                      <div className="col-md-12">
                        <div className=" bg-light-blue p-3 ">
                          <div className="row g-0">
                            <>
                              <div className="col-md-12">
                                <div>
                                  <Skeleton
                                    count={0.3}
                                    height={30}
                                    inline={true}
                                  />
                                </div>
                              </div>
                              <div className=" form-group col-md-12 g-2">
                                {/* <hr /> */}
                                <div className=" ">
                                  <div className="row control-group ">
                                    <div className="col-md-3 ">
                                      <FormItemSkeleton />
                                    </div>
                                    <div className="col-md-3 ">
                                      <FormItemSkeleton />
                                    </div>
                                    <div className="col-md-3 ">
                                      <FormItemSkeleton />
                                    </div>
                                    <div className="col-md-3 ">
                                      <FormItemSkeleton />
                                    </div>
                                    <div className="col-md-3 ">
                                      <FormItemSkeleton />
                                    </div>
                                    <div className="col-md-3 ">
                                      <FormItemSkeleton />
                                    </div>
                                    <div className="col-md-3 ">
                                      <FormItemSkeleton />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mt-3">
                        <div className="bg-light-blue p-3 h-100 ">
                          <div className="row ">
                            <>
                              <div>
                                <div className="row control-group align-items-center">
                                  <div className="col-md-5 ">
                                    <FormItemSkeleton />
                                  </div>
                                  <div className="col-md-5 ">
                                    <FormItemSkeleton />
                                  </div>
                                </div>
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                      <div className=" col-md-4 mt-3 ">
                        <div className="bg-light-blue p-3 h-100">
                          <FormItemSkeleton />
                          {/* </Spin> */}
                        </div>
                      </div>
                      <div className="col-md-4 mt-3 "></div>
                    </div>
                    <div className="row ">
                      <div>
                        <Skeleton count={0.1} height={40} inline={true} />
                        <Skeleton count={0.1} height={40} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        ) : (
          <Form
            form={form}
            onFinish={addProductHandler}
            fields={[
              {
                name: "isActive",
                value:
                  editData && isEdit
                    ? editData.isActive
                    : form.getFieldValue("isActive")
                    ? form.getFieldValue("isActive")
                    : true,
              },
              {
                name: "Code",
                value:
                  editData && isEdit ? editData.code : productAddSection?.code,
              },
              {
                name: "orderTypeId",
                value: form.getFieldValue("orderTypeId")
                  ? form.getFieldValue("orderTypeId")
                  : productAddSection?.orderTypes[0]?.id,
              },
            ]}
          >
            <div className="row categoryField">
              {/* Items form */}
              <div className="card p-0 border-0 rounded-3">
                <div className="card-body bg-light-red">
                  <div className="row addacc_form suppliernewitem_form">
                    <div className="form-group col-md-4">
                      <div className=" pt-0">
                        <Form.Item label="Item Code" name="Code">
                          <Input type="text" readOnly placeholder="Item Code" />
                        </Form.Item>
                      </div>
                    </div>
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <div className=" pt-0">
                        <Form.Item
                          label="Item Name"
                          name="Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter product name !",
                            },
                          ]}
                        >
                          <Input type="text" placeholder="Item Name" />
                        </Form.Item>
                      </div>
                    </div>
                    {/* end row */}

                    {/* end row */}
                    <div className="form-group col-md-4">
                      <Form.Item
                        label="Supplier Item Code"
                        name="SupplierItemCode"
                        initialvalue=""
                      >
                        <Input type="text" placeholder="Supplier Item Code" />
                      </Form.Item>
                    </div>
                    <div className="form-group col-md-4">
                      <Form.Item label="Brand" name="brandId">
                        <Select placeholder="Choose Brand">
                          {productAddSection?.brand.map((brand) => {
                            return (
                              <Select.Option key={brand.id} value={brand.id}>
                                {brand.value}
                              </Select.Option>
                            );
                          })}
                          {/* <Select.Option></Select.Option> */}
                        </Select>
                      </Form.Item>
                    </div>
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <Form.Item
                        label="Category"
                        name="productCategoryId"
                        rules={[
                          {
                            required: true,
                            message: "Please choose category !",
                          },
                        ]}
                      >
                        <TreeSelect
                          placeholder="Choose Category"
                          showSearch
                          treeData={generateCategoriesOption(
                            productAddSection?.productCategories
                          )}
                          treeDefaultExpandAll={true}
                          filterTreeNode={(inputValue, treeNode) =>
                            treeNode.props.title
                              .toLowerCase()
                              .indexOf(inputValue.toLowerCase()) !== -1
                          }
                        />
                      </Form.Item>
                    </div>
                    {/* end row */}
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <Form.Item label="Supplier Name" name="supplierId">
                        <Select
                          placeholder="Choose Supplier"
                          showSearch
                          options={productAddSection?.suppliers.map(
                            (supplier) => {
                              return {
                                value: supplier.id,
                                label: supplier.value,
                              };
                            }
                          )}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        />
                      </Form.Item>
                    </div>
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <Form.Item
                        label="Sales Tax"
                        name="taxExclusiveInclusiveId"
                        rules={[
                          {
                            required: true,
                            message: "Please choose tax!",
                          },
                        ]}
                      >
                        <Select placeholder="Choose Tax">
                          {productAddSection?.taxInclusiveExclusive?.map(
                            (tax) => {
                              return (
                                <Select.Option key={tax.id} value={tax.id}>
                                  {tax.value}
                                </Select.Option>
                              );
                            }
                          )}
                        </Select>
                      </Form.Item>
                    </div>
                    {/* end row */}
                    {/* end row */}
                    <div className="form-group col-md-4">
                      <Form.Item
                        label="Allergens"
                        name="Allergens"
                        initialvalue=""
                      >
                        <Input type="text" placeholder="Allergens" />
                      </Form.Item>
                    </div>
                    <div className="form-group col-md-4">
                      <Form.Item
                        label="Status"
                        name="isActive"
                        initialValue={true}
                        valuePropName="checked"
                      >
                        <Switch loading={isLoading} defaultChecked={true} />
                      </Form.Item>
                    </div>
                    <div className="form-group col-md-12">
                      <Form.Item label="Description">
                        {/* <Input type="text" placeholder="Description" /> */}
                        <Editor
                          editorClassName="ant-input productDescription"
                          placeholder="Description"
                          editorState={editorState}
                          onEditorStateChange={(state) => setEditorState(state)}
                        />
                      </Form.Item>
                    </div>
                    {/* end row */}
                    <div className="row">
                      <div className="col-md-12">
                        <div className=" bg-light-blue p-3 ">
                          <div className="row g-0">
                            <Form.List name="productVariations">
                              {(fields, { add, remove }) => (
                                <>
                                  <div className="col-md-12">
                                    <div className="d-flex align-items-center justify-content-between m-0">
                                      <h6 className="fw-bold ">Variations</h6>
                                      <Form.Item>
                                        <Button
                                          className="d-flex align-items-center btn add-more rounded-circle ms-3 "
                                          onClick={() => add()}
                                          style={{
                                            background: "#00205A",
                                            color: "#fff",
                                          }}
                                          title=" "
                                        >
                                          <i className="fas fa-plus " />
                                        </Button>
                                      </Form.Item>
                                    </div>
                                  </div>
                                  <hr className="mt-2" />
                                  {fields.map(
                                    ({ key, name, ...restField }, index) => (
                                      <div
                                        className=" form-group col-md-12 g-2"
                                        key={index}
                                      >
                                        {/* <hr /> */}
                                        <div className=" ">
                                          <div className="row control-group ">
                                            <div className="col-md-12 ">
                                              <div className="form-check d-flex justify-content-end ">
                                                <Checkbox
                                                  onChange={() =>
                                                    setChecked(index)
                                                  }
                                                  checked={checked == index}
                                                  value={checked == index}
                                                >
                                                  Set Default
                                                </Checkbox>
                                                {index !== 0 && (
                                                  <Popconfirm
                                                    okText="Yes"
                                                    cancelText="No"
                                                    title="Are you sure you want to delete this variation?"
                                                  >
                                                    <div
                                                      className="btn remove item_btn rounded-circle add-more1 ms-3 "
                                                      onClick={() => {
                                                        if (
                                                          editData &&
                                                          isEdit
                                                        ) {
                                                          dispatch({
                                                            type: "DELETE_PRODUCT_VARIATION_REQUEST",
                                                            payload: [
                                                              {
                                                                id: editData
                                                                  .productVariations[
                                                                  index
                                                                ].id,
                                                                name: editData
                                                                  .productVariations[
                                                                  index
                                                                ].name,
                                                              },
                                                            ],
                                                          });
                                                        }
                                                        if (checked == index) {
                                                          setChecked(
                                                            (prevInd) =>
                                                              prevInd - 1
                                                          );
                                                        }
                                                        remove(name);
                                                      }}
                                                    >
                                                      <i className="fas fa-trash-alt " />
                                                    </div>
                                                  </Popconfirm>
                                                )}
                                              </div>
                                            </div>
                                            <div className="col-md-3 ">
                                              <Form.Item
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please enter variation name",
                                                  },
                                                ]}
                                                name={[index, "name"]}
                                                label="Name"
                                                initialvalue=""
                                              >
                                                <Input
                                                  type="text"
                                                  placeholder="Name"
                                                />
                                              </Form.Item>
                                            </div>
                                            <div className="col-md-3 ">
                                              <Form.Item
                                                name={[index, "calories"]}
                                                label="Calories"
                                                initialvalue=""
                                              >
                                                <Input
                                                  type="text"
                                                  placeholder="Calories"
                                                />
                                              </Form.Item>
                                            </div>
                                            <div className="col-md-3 ">
                                              <Form.Item
                                                name={[index, "stockCount"]}
                                                label="Stock"
                                                initialvalue=""
                                              >
                                                <Input
                                                  type="number"
                                                  placeholder="Stock"
                                                />
                                              </Form.Item>
                                            </div>
                                            <div className="col-md-3 ">
                                              <Form.Item
                                                name={[
                                                  index,
                                                  "minimumStockAlertCount",
                                                ]}
                                                label="Min. Stock Alert"
                                                initialvalue=""
                                              >
                                                <Input
                                                  type="number"
                                                  placeholder="Min. Stock Alert"
                                                />
                                              </Form.Item>
                                            </div>
                                            <div className="col-md-3 ">
                                              <Form.Item
                                                name={[
                                                  index,
                                                  "maximumStockAlertCount",
                                                ]}
                                                label="Max. Stock Alert"
                                                initialvalue=""
                                              >
                                                <Input
                                                  type="number"
                                                  placeholder="Max. Stock Alert"
                                                />
                                              </Form.Item>
                                            </div>
                                            <div className="col-md-3 ">
                                              <Form.Item
                                                name={[index, "discount"]}
                                                label="Discount (%)"
                                              >
                                                <Input
                                                  type="number"
                                                  placeholder="Discount (%)"
                                                />
                                              </Form.Item>
                                            </div>
                                            <div className="col-md-3 ">
                                              <Form.Item
                                                name={[index, "unitPrice"]}
                                                label="Unit Price"
                                              >
                                                <Input
                                                  type="number"
                                                  placeholder="Unit Price"
                                                />
                                              </Form.Item>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </>
                              )}
                            </Form.List>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3">
                        <div className="bg-light-blue p-3 h-100 ">
                          <div className="row ">
                            <Form.List name="ProductMacros">
                              {(fields, { add, remove }) => (
                                <>
                                  <div className="col-md-12 ">
                                    <div className="d-flex align-items-center justify-content-between pb-2 ">
                                      <h6 className="fw-bold ">
                                        Product Macros
                                      </h6>
                                      <Form.Item>
                                        <Button
                                          className="d-flex align-items-center btn add-more rounded-circle ms-3 "
                                          onClick={() => add()}
                                          style={{
                                            background: "#00205A",
                                            color: "#fff",
                                          }}
                                          title=" "
                                        >
                                          <i className="fas fa-plus " />
                                        </Button>
                                      </Form.Item>
                                    </div>
                                  </div>
                                  {fields.map(
                                    ({ key, name, ...restField }, index) => (
                                      <div key={index}>
                                        <div className="row control-group align-items-center">
                                          <div className="col-md-5 ">
                                            <Form.Item
                                              name={[index, "name"]}
                                              label="Name"
                                            >
                                              <Input
                                                type="text"
                                                placeholder="Name"
                                                initialvalue=""
                                              />
                                            </Form.Item>
                                          </div>
                                          <div className="col-md-5 ">
                                            <Form.Item
                                              name={[index, "value"]}
                                              label="Value"
                                            >
                                              <Input
                                                type="number"
                                                placeholder="Value"
                                                initialvalue=""
                                              />
                                            </Form.Item>
                                          </div>
                                          {index !== 0 && (
                                            <div
                                              className="btn remove item_btn rounded-circle align-self-end add-more1 ms-2 "
                                              type="button "
                                              onClick={() => remove(name)}
                                            >
                                              <i className="fas fa-trash-alt " />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </>
                              )}
                            </Form.List>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3">
                        <div className="bg-light-blue p-3 h-100 ">
                          <div className="row ">
                            <Form.List name="ProductColors">
                              {(fields, { add, remove }) => (
                                <>
                                  <div className="col-md-12 ">
                                    <div className="d-flex align-items-center justify-content-between pb-2 ">
                                      <h6 className="fw-bold ">
                                        Product Colors
                                      </h6>
                                      <Form.Item>
                                        <Button
                                          className="d-flex align-items-center btn add-more rounded-circle ms-3 "
                                          onClick={() => add()}
                                          style={{
                                            background: "#00205A",
                                            color: "#fff",
                                          }}
                                          title=" "
                                        >
                                          <i className="fas fa-plus " />
                                        </Button>
                                      </Form.Item>
                                    </div>
                                  </div>
                                  {fields.map(
                                    ({ key, name, ...restField }, index) => (
                                      <div key={index}>
                                        <div className="row control-group align-items-center">
                                          <div className="col-md-4">
                                            <Form.Item
                                              name={[index, "name"]}
                                              label="Name"
                                            >
                                              <Input
                                                type="text"
                                                placeholder="Name"
                                                initialvalue=""
                                              />
                                            </Form.Item>
                                          </div>

                                          <div className="col-md-4">
                                            <Form.Item
                                              valuePropName="check"
                                              name={[index, "value"]}
                                              label="Value"
                                            >
                                              <InputColor
                                                originalColor={
                                                  editData?.productColors?.[
                                                    index
                                                  ]?.value
                                                }
                                              />
                                            </Form.Item>
                                          </div>
                                          <div className="col-md-3">
                                            <Form.Item
                                              valuePropName="checked"
                                              name={[index, "IsMultiColor"]}
                                              label="Multi Color"
                                            >
                                              <Checkbox />
                                            </Form.Item>
                                          </div>
                                          {index !== 0 && (
                                            <div
                                              className="btn remove item_btn rounded-circle align-self-end add-more1 ms-2 "
                                              type="button "
                                              onClick={() => remove(name)}
                                            >
                                              <i className="fas fa-trash-alt " />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </>
                              )}
                            </Form.List>
                          </div>
                        </div>
                      </div>
                      <div className=" col-md-4 mt-3 ">
                        <div className="bg-light-blue p-3 h-100">
                          <Form.Item label="Add Ons">
                            <Input
                              placeholder="Choose Addons"
                              value={searchKeyword}
                              onChange={(e) => {
                                setSearchKeyword(e.target.value);
                              }}
                            />
                          </Form.Item>
                          {addOnsData?.length > 0 &&
                          searchKeyword.length > 0 ? (
                            <div className="col-md-12 addOnsDropDown">
                              {addOnsData.map((addOn) => {
                                return (
                                  <div
                                    key={addOn.id}
                                    style={{
                                      padding: "10px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => selectAddOnHandler(addOn)}
                                  >
                                    {addOn.name}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            ""
                          )}
                          {selectedAddOns.map((product) => {
                            return (
                              <div
                                className="product-edit-addons"
                                key={product.productId}
                              >
                                <span>{product.name}</span>
                                <IoClose
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "18px",
                                  }}
                                  onClick={() => {
                                    if (product.id) {
                                      setDeletedAddOns((prevAddons) => [
                                        ...prevAddons,
                                        product.id,
                                      ]);
                                    }

                                    setSelectedAddOns((addOns) =>
                                      addOns.filter(
                                        (addon) =>
                                          addon.productId !== product.productId
                                      )
                                    );
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-md-4 mt-3 ">
                        <Form.Item>
                          <label className="control-label fw-bold ">
                            Product Image {`(png, jpg, jpeg)`}
                            {imagePreview && (
                              <i
                                className="fa fa-trash ms-2 trash-icon"
                                onClick={() => {
                                  setImage(null);
                                  setImagePreview(null);
                                  setIsImageDeleted(true);
                                }}
                              />
                            )}
                          </label>
                          <div className="file-drop-area ">
                            <span className="choose-file-button cf1">
                              Choose Files
                            </span>
                            <span className="file-message">
                              {image
                                ? image.name
                                : "or drag and drop files here"}
                            </span>
                            <input
                              type="file"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="file-input"
                              accept=".jfif,.jpg,.jpeg,.png,.gif"
                              multiple=""
                            />
                          </div>
                        </Form.Item>

                        <div className="giftupload inv_img mt-2">
                          <img
                            src={
                              imagePreview
                                ? imagePreview
                                : "assets/images/imagePlaceholder.png"
                            }
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        {/* {imageError && (
                          <span
                            className="danger ms-3"
                            style={{ color: "#ff0017" }}
                          >
                            Please choose Image
                          </span>
                        )} */}
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col md-4 mt-2">
                        <Button
                          htmlType="submit"
                          type="primary"
                          loading={addLoading}
                          // onClick={() => {
                          //   if (!image && !isEdit) {
                          //     setImageError("Please select Image");
                          //   }
                          // }}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            form.validateFields().then(() => {
                              setCreateNewClicked(true);
                              addProductHandler(form.getFieldsValue(), true);
                            });
                          }}
                          loading={addAndNewLoading}
                          className="ms-2 text-white"
                          style={{ background: "#02215B" }}
                        >
                          Save and Create New
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            if (isEdit) {
                              setIsEdit(false);
                            }
                            navigate("/inventory/list");
                          }}
                          className="ms-1"
                          // style={{ background: "#FF0017", color: "#fff" }}
                          type="danger"
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
        )}
      </div>
    </>
  );
}

export default AddProduct;

// {
//   "name": "Large",
//   "isDefault": false,
//   "Id": ""
// }

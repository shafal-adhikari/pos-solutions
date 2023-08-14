import { Alert, Button, Form, Input, Select, Spin, Switch } from "antd";
import Skeleton from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryProducts from "./CategoryProducts";
import { AiFillEye } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";

function AddSetMenu({ showAdd, setShowAdd, isEdit, setIsEdit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  useEffect(() => {
    dispatch({
      type: "GET_SET_MENU_ADD_SECTION_REQUEST",
    });
  }, [showAdd]);

  const {
    setMenuAddSection,
    isLoading,
    editData,
    productsByCategories,
    categoryLoading,
    addLoading,
    addSuccess,
  } = useSelector((state) => state.inventoryReducer);
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [image, setImage] = useState();
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  useEffect(() => {
    if (addSuccess) {
      setShowAdd(false);
    }
  }, [addSuccess]);

  useEffect(() => {
    if (selectedCategoryId.length > 0)
      dispatch({
        type: "GET_ALL_PRODUCTS_BY_CATEGORY_REQUEST",
        payload: {
          Ids: selectedCategoryId.map((cat) => cat.id),
        },
      });
  }, [selectedCategoryId]);
  useEffect(() => {
    if (isEdit && editData) {
      form.setFields([
        {
          name: "name",
          value: editData.name,
        },
        {
          name: "isActive",
          value: editData.isActive,
        },
        {
          name: "price",
          value: editData.price,
        },
        {
          name: "TaxExclusiveInclusiveId",
          value: editData.taxExclusiveInclusiveId,
        },
        {
          name: "description",
          value: editData.description,
        },
      ]);
      setImagePreview(editData.imagePath);
      setSelectedCategoryId(editData.productCatgories);
      setSelectedProducts(editData.productVariations);
    }
  }, [isEdit, editData]);
  console.log(selectedCategoryId);
  const addSetMenuhandler = (values) => {
    if (selectedProducts.length < 1 || selectedCategoryId.length < 1) return;
    const formData = new FormData();
    const request = {
      ...values,
      productVariations: selectedProducts,
      isImageDeleted:
        editData && isEdit && !imagePreview ? isImageDeleted : false,
      productCatgories: selectedCategoryId,
      id: editData && isEdit ? editData.id : "",
    };
    formData.append("Request", JSON.stringify(request));
    if (image) {
      formData.append("Image", image);
    }
    console.log(request);
    dispatch({
      type: "ADD_SET_MENU_REQUEST",
      payload: formData,
    });
  };
  return (
    <>
      <div className="card text-left border">
        <Form
          form={form}
          onFinish={addSetMenuhandler}
          initialValues={{ isActive: true }}
        >
          {isLoading ? (
            <div className="card-body">
              <div className="timesheet_filter">
                <div className="row categoryField">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <FormItemSkeleton />
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <FormItemSkeleton />
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <FormItemSkeleton />
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <FormItemSkeleton />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <FormItemSkeleton />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div>
                      <Skeleton count={0.05} height={30} inline={true} />
                      <Skeleton
                        count={0.05}
                        height={30}
                        style={{ marginLeft: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-body">
              <div className="timesheet_filter">
                <div className="row categoryField">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter Name",
                              },
                            ]}
                          >
                            <Input type="text" placeholder="Enter Name" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <Form.Item
                            label={`Price (${currencySymbol})`}
                            name="price"
                            rules={[
                              {
                                required: true,
                                message: "Please enter Price",
                              },
                            ]}
                          >
                            <Input type="number" placeholder="Enter Price" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <Form.Item
                            label="Sales Tax"
                            name="TaxExclusiveInclusiveId"
                            rules={[
                              {
                                required: true,
                                message: "Please enter Sales Tax",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select Sales Tax"
                              options={setMenuAddSection?.taxExclusiveInclusive?.map(
                                (orderType) => {
                                  return {
                                    label: orderType.value,
                                    value: orderType.id,
                                  };
                                }
                              )}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <Form.Item
                            label={
                              <>
                                {imagePreview && (
                                  <AiFillEye
                                    size={20}
                                    color="#00cc17"
                                    className="me-1"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setPreviewModalOpen(true)}
                                  />
                                )}
                                {`Image (png, jpg, jpeg)`}

                                {imagePreview && (
                                  <i
                                    className="fa fa-trash mt-1 trash-icon trash-icon-setmenu"
                                    onClick={() => {
                                      setImage(null);
                                      setImagePreview(null);
                                      setIsImageDeleted(true);
                                    }}
                                  />
                                )}
                              </>
                            }
                          >
                            <input
                              type="file"
                              className="form-control"
                              onChange={(e) => setImage(e.target.files[0])}
                              placeholder="eg:abc"
                              spellCheck="false"
                              data-ms-editor="true"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <Form.Item label="Description" name="description">
                            <Input.TextArea placeholder="Description" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <Form.Item
                            label="Status"
                            valuePropName="checked"
                            name="isActive"
                          >
                            <Switch defaultChecked={true} />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-2 d-flex">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                          if (selectedCategoryId.length < 1) {
                            setError(
                              "Please select categories to add in set menu"
                            );
                          } else {
                            if (selectedProducts.length < 1) {
                              setError(
                                "Please select products to add in set menu"
                              );
                            } else {
                              setError();
                            }
                          }
                        }}
                        loading={addLoading}
                        className="btn btn-success   rounded-0"
                      >
                        Save
                      </Button>
                    </Form.Item>
                    <Button
                      onClick={() => setShowAdd(false)}
                      type="danger"
                      className="btn btn-danger rounded-0 ms-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form>
      </div>
      <div className="card text-left border mt-3">
        {isLoading ? (
          <div className="card-body">
            <div className="setmenu_categories">
              <div className="mr-md-3 mr-xl-5">
                <Skeleton count={0.15} height={30} />
              </div>
              <hr />
              <div>
                <Skeleton count={0.15} height={20} inline={true} />
                <Skeleton
                  count={0.1}
                  height={20}
                  inline={true}
                  style={{ marginLeft: "30px" }}
                />
                <Skeleton
                  count={0.1}
                  height={20}
                  style={{ marginLeft: "30px" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="setmenu_categories">
              <div className="d-flex align-items-end flex-wrap">
                <div className="mr-md-3 mr-xl-5">
                  <h5 className="fw-bold">Categories</h5>
                </div>
              </div>
              <hr />
              {error && <Alert type="error" message={error} className="mb-2" />}
              <div className="row">
                {setMenuAddSection?.productCategories.map((category) => {
                  const found = selectedCategoryId.find(
                    (arrCat) => arrCat.id == category.id
                  );
                  return (
                    <div key={category.id} className="col-md-2 col-lg-2">
                      <div className="form-check">
                        <input
                          className="form-check-input mt-2 catcheck"
                          type="checkbox"
                          checked={found ? true : false}
                          value={found ? true : false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategoryId((prevId) => [
                                ...prevId,
                                {
                                  id: category.id,
                                  description: "",
                                },
                              ]);
                            } else {
                              setSelectedCategoryId((prevId) =>
                                prevId.filter(
                                  (eachId) => eachId.id !== category.id
                                )
                              );
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck1"
                        >
                          {category.value}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        size="lg"
        show={previewModalOpen}
        onHide={() => setPreviewModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={imagePreview}
            alt="Image Preview"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
      {selectedCategoryId?.length > 0 && (
        <CategoryProducts
          category={productsByCategories}
          setSelectedCategoryId={setSelectedCategoryId}
          isLoading={categoryLoading}
          selectedProducts={selectedProducts}
          selectedCategoryId={selectedCategoryId}
          setSelectedProducts={setSelectedProducts}
        ></CategoryProducts>
      )}
    </>
  );
}

export default AddSetMenu;

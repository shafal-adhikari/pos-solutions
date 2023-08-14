import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Select,
  Spin,
  Input,
  Pagination,
  Button,
  Popconfirm,
  Tooltip,
} from "antd";
import AddProduct from "./AddProduct";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import ImageGallery from "./ImageGallery";
import UpdatePrice from "./UpdatePrice";
import { Modal } from "react-bootstrap";
function ProductList() {
  const dispatch = useDispatch();
  const [bulkSelected, setBulkSelected] = useState([]);
  const [files, setFiles] = useState([]);
  const [form] = Form.useForm();
  const category = Form.useWatch("productCategoryId", form);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const searchKeyword = Form.useWatch("searchKeyword", form);
  const supplier = Form.useWatch("supplierId", form);
  const status = Form.useWatch("statusId", form);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const {
    productSearchSection,
    allImages,
    isLoading,
    allProducts,
    totalProducts,
    updateSuccess,
    exportExcelLoading,
    deactivateSuccess,
    exportPdfLoading,
    uploadLoading,
  } = useSelector((state) => state.inventoryReducer);
  console.log(allImages);
  useEffect(() => {
    if (category && supplier && status)
      if (searchKeyword) {
        const searchTimeout = setTimeout(async () => {
          if (searchKeyword) {
            dispatch({
              type: "GET_ALL_PRODUCTS_REQUEST",
              payload: {
                Page: 1,
                PageSize: 10,
                ExternalFilter: {
                  SearchKeywords: searchKeyword,
                  category: category,
                },
              },
            });
          }
        }, 500);
        return () => {
          clearTimeout(searchTimeout);
        };
      } else {
        dispatch({
          type: "GET_ALL_PRODUCTS_REQUEST",
          payload: {
            Page: 1,
            PageSize: 10,
            ExternalFilter: {
              SearchKeywords: searchKeyword,
              CategoryId: category,
              SupplierId: supplier,
              StatusId: status,
            },
          },
        });
      }
  }, [searchKeyword, category, supplier, deactivateSuccess, status]);
  useEffect(() => {
    if (updateSuccess) {
      setIsUpdateModalOpen(false);
    }
  }, [updateSuccess]);
  useEffect(() => {
    setBulkSelected([]);
  }, [allProducts]);
  useEffect(() => {
    form.setFieldValue(
      "productCategoryId",
      productSearchSection?.productCategories[0].id
    );
    form.setFieldValue("supplierId", productSearchSection?.suppliers[0].id);
    form.setFieldValue("statusId", productSearchSection?.status[0].id);
  }, [productSearchSection]);
  useEffect(() => {
    dispatch({
      type: "GET_PRODUCT_SEARCH_SECTION_REQUEST",
    });
  }, []);

  const bulkDeleteHandler = () => {
    dispatch({
      type: "DELETE_PRODUCT_REQUEST",
      payload: bulkSelected,
    });
  };
  const productPriceEdit = (id) => {
    dispatch({
      type: "EDIT_PRODUCT_PRICE_REQUEST",
      payload: id,
    });
  };
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_ALL_PRODUCTS_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
        ExternalFilter: {
          SearchKeywords: searchKeyword,
          CategoryId: category,
          SupplierId: supplier,
        },
      },
    });
  }
  const deleteProductHandler = (id, name) => {
    dispatch({
      type: "DELETE_PRODUCT_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  useEffect(() => {
    if (!isImageModalOpen) {
      setFiles([]);
      setSelectedProduct();
    }
  }, [isImageModalOpen]);
  const [selectedProduct, setSelectedProduct] = useState();
  const imagesUploadHandler = () => {
    const formdata = new FormData();
    formdata.append("request", JSON.stringify({ id: selectedProduct }));
    files.forEach((file) => {
      formdata.append("files", file);
    });
    dispatch({
      type: "UPLOAD_PRODUCT_IMAGES_REQUEST",
      payload: formdata,
      productId: selectedProduct,
    });
  };
  return (
    <div className="menu_right">
      {isEditClicked ? (
        <AddProduct isEdit={true} setIsEdit={setIsEditClicked} />
      ) : (
        <>
          <Modal
            backdrop="static"
            size="lg"
            show={isImageModalOpen}
            onHide={() => setIsImageModalOpen(false)}
          >
            <Modal.Header closeButton>
              <h5>Product Image Gallery</h5>
            </Modal.Header>
            <Modal.Body>
              <ImageGallery
                images={allImages}
                files={files}
                setFiles={setFiles}
                currentProductId={selectedProduct}
                imagesUploadHandler={imagesUploadHandler}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button type="danger" onClick={() => setIsImageModalOpen(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="right_top mb-4">
            <div className="card text-left border">
              <div className="card-body">
                <Form form={form}>
                  <div className="timesheet_filter categoryField">
                    <div className="row">
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <Form.Item label="Category" name="productCategoryId">
                            <Select placeholder="Category">
                              {productSearchSection?.productCategories.map(
                                (category) => {
                                  return (
                                    <Select.Option
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.value}
                                    </Select.Option>
                                  );
                                }
                              )}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                          <Form.Item label="Supplier" name="supplierId">
                            <Select placeholder="Supplier">
                              {productSearchSection?.suppliers.map(
                                (supplier) => {
                                  return (
                                    <Select.Option
                                      key={supplier.id}
                                      value={supplier.id}
                                    >
                                      {supplier.value}
                                    </Select.Option>
                                  );
                                }
                              )}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-2 col-lg-2">
                        <div className="form-group">
                          <Form.Item label="Status" name="statusId">
                            <Select placeholder="Status">
                              {productSearchSection?.status.map((supplier) => {
                                return (
                                  <Select.Option
                                    key={supplier.id}
                                    value={supplier.id}
                                  >
                                    {supplier.value}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-2 col-lg-2">
                        <div className="form-group">
                          <Form.Item label="Search" name="searchKeyword">
                            <Input type="text" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-md-2 col-lg-2 align-items-center my-auto pt-2 ">
                        <button
                          type="button"
                          className="btn btn-primary all_btn rounded-0"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <div className="table_card d-flex justify-content-between mb-3">
                  <div className="add_btn ">
                    <div className="row">
                      <div className="col-md-12">
                        {bulkSelected.length > 0 && (
                          <Popconfirm
                            onConfirm={bulkDeleteHandler}
                            okText="Yes"
                            title="Are you sure you want to deactivate?"
                            cancelText="No"
                          >
                            <a className="btn btn-danger border-0 rounded-0">
                              <i className="fas fa-eye-slash me-1 " />
                              Deactivate
                            </a>
                          </Popconfirm>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive product-table">
                  {isLoading ? (
                    <TableSkeleton />
                  ) : (
                    <table className="table table-hover  align-middle table-nowrap mb-0">
                      <thead>
                        <tr className="table-light">
                          <th>
                            <div className="form-check">
                              <input
                                className="form-check-input mt-2 catcheck"
                                type="checkbox"
                                checked={
                                  allProducts?.length == bulkSelected.length
                                }
                                value={
                                  allProducts?.length == bulkSelected.length
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setBulkSelected(
                                      allProducts?.map((product) => {
                                        return {
                                          Id: product.id,
                                          Name: product.name,
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
                          <th> Item Code</th>
                          <th>Item Name</th>
                          <th>Category</th>
                          <th>Supplier</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allProducts && allProducts?.length > 0 ? (
                          allProducts?.map((product, index) => {
                            return (
                              <tr key={product.id + index}>
                                <td>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input mt-2 catcheck"
                                      type="checkbox"
                                      checked={
                                        bulkSelected.find(
                                          (eachPrev) =>
                                            eachPrev.Id == product.id
                                        )
                                          ? true
                                          : false
                                      }
                                      value={
                                        bulkSelected.find(
                                          (eachPrev) =>
                                            eachPrev.Id == product.id
                                        )
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        if (!e.target.checked) {
                                          setBulkSelected((prev) => {
                                            return prev.filter(
                                              (prevEach) =>
                                                prevEach.Id != product.id
                                            );
                                          });
                                        } else {
                                          setBulkSelected((prev) => {
                                            return [
                                              ...prev,
                                              {
                                                Id: product.id,
                                                Name: product.name,
                                              },
                                            ];
                                          });
                                        }
                                      }}
                                      id="defaultCheck1"
                                    />
                                  </div>
                                </td>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>

                                <td>{product.supplierName}</td>
                                <td>
                                  {product.status == 1 ? (
                                    <span className="badge bg-info text-dark">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge bg-danger">
                                      Inactive
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <Tooltip title="Image Gallery">
                                    <a
                                      onClick={() => {
                                        setIsImageModalOpen(true);
                                        setSelectedProduct(product.id);
                                        dispatch({
                                          type: "GET_ALL_PRODUCT_IMAGE_REQUEST",
                                          payload: product.id,
                                        });
                                      }}
                                      className="btn btn-primary  btn-sm me-1"
                                      data-bs-toggle="modal"
                                      data-bs-target="#updatepriceModal"
                                    >
                                      <i className="fas fa-image" />
                                    </a>
                                  </Tooltip>
                                  <Tooltip title="Update Price">
                                    <a
                                      onClick={() => {
                                        setIsUpdateModalOpen(true);
                                        productPriceEdit(product.id);
                                      }}
                                      className="btn btn-success  btn-sm me-1"
                                      data-bs-toggle="modal"
                                      data-bs-target="#updatepriceModal"
                                    >
                                      <i className="fas fa-money-check" />
                                    </a>
                                  </Tooltip>
                                  <a
                                    onClick={() => {
                                      setIsEditClicked(true);
                                      dispatch({
                                        type: "EDIT_PRODUCT_REQUEST",
                                        payload: product.id,
                                      });
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
                                    onConfirm={() =>
                                      deleteProductHandler(
                                        product.id,
                                        product.name
                                      )
                                    }
                                    title="Are you sure you want to deactivate?"
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    {product.status == 1 && (
                                      <a
                                        className="btn btn-danger btn-sm ms-1"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="left"
                                        title=""
                                        data-bs-original-title="Delete"
                                      >
                                        <i
                                          className="fas fa-eye-slash"
                                          aria-hidden="true"
                                        />
                                      </a>
                                    )}
                                  </Popconfirm>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr style={{ textAlign: "center" }}>
                            <td colSpan={7}>No Products Found !</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}

                  <div className="d-flex align-items-center justify-content-between mt-3">
                    {allProducts?.length > 0 && (
                      <div>
                        <Button
                          type="primary"
                          className="btn btn-primary all_btn rounded-0"
                          loading={exportPdfLoading}
                          onClick={() =>
                            dispatch({
                              type: "EXPORT_PRODUCT_PDF_REQUEST",
                              payload: {
                                Page: 1,
                                PageSize: 10,
                                ExportType: "pdf",
                                ExternalFilter: {
                                  SearchKeywords: searchKeyword,
                                  CategoryId: category,
                                  SupplierId: supplier,
                                },
                              },
                            })
                          }
                        >
                          <i className="fas fa-file-export " />
                          Export to PDF
                        </Button>
                        <Button
                          className="btn btn-success bg-theme text-white ms-2"
                          style={{ background: "#00205A" }}
                          loading={exportExcelLoading}
                          onClick={() =>
                            dispatch({
                              type: "EXPORT_PRODUCT_EXCEL_REQUEST",
                              payload: {
                                Page: 1,
                                PageSize: 10,
                                ExportType: "xlsx",
                                ExternalFilter: {
                                  SearchKeywords: searchKeyword,
                                  CategoryId: category,
                                  SupplierId: supplier,
                                },
                              },
                            })
                          }
                        >
                          <i className="fas fa-file-export " />
                          Export to Excel
                        </Button>
                      </div>
                    )}
                    <div />
                    <div>
                      <Pagination
                        total={totalProducts ? totalProducts : 2}
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        showTotal={(total, range) =>
                          `${
                            allProducts ? allProducts.length : 0
                          } out of ${total} items`
                        }
                        defaultCurrent={1}
                        onChange={onShowSizeChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UpdatePrice
            isOpen={isUpdateModalOpen}
            setIsOpen={setIsUpdateModalOpen}
          />
        </>
      )}
    </div>
  );
}

export default ProductList;

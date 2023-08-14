import React, { useEffect, useState } from "react";
import SettingsSidebar from "../../components/SettingsSidebar/SettingsSidebar";
import { useDispatch, useSelector } from "react-redux";
import AddCategory from "../../components/AddCategory/AddCategory";
import ImageLibrary from "../../components/ImageLibrary/ImageLibrary";
import AddBrand from "../../components/AddBrand/AddBrand";
import { Form, Select, TreeSelect } from "antd";
import AddTableLocations from "../../components/AddTableLocations/AddTableLocations";
import AddTable from "../../components/AddTable/AddTable";
import AddOrderType from "../../components/AddOrderType/AddOrderType";
import AddTax from "../../components/AddTax/AddTax";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
import AddCategoryType from "../../components/AddCategoryType/AddCategoryType";
import AddSubCategory from "../../components/AddSubCategory/AddSubCategory";
function Settings() {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();
  useEffect(() => {
    dispatch({
      type: "GET_SETTINGS_REQUEST",
    });
  }, []);
  const { categoriesSection, tableSection, isLoading, editData } = useSelector(
    (state) => state.settingsReducer
  );

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCategoryTypeModalOpen, setIsCategoryTypeModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isOrderTypeModalOpen, setIsOrderTypeModalOpen] = useState(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [isTableLocationModalOpen, setIsTableLocationModalOpen] =
    useState(false);
  const { settingsList } = useSelector((state) => state.settingsReducer);
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
    if (editData) {
      if (isCategoryModalOpen && categoriesSection) {
        const image = categoriesSection.productCategoriesImages.find(
          (image) => image.id == editData.productCategoryImageId
        );
        if (image) {
          setSelectedImage(image);
        } else {
          setSelectedImage(null);
        }
      } else if (isTableModalOpen && tableSection) {
        const image = tableSection.tableImageList.find(
          (image) => image.id == editData.tableImageId
        );
        if (image) {
          setSelectedImage(image);
          setSelectedImage(null);
        }
      }
    }
  }, [
    editData,
    categoriesSection,
    tableSection,
    isCategoryModalOpen,
    isTableModalOpen,
  ]);
  const [selectedTableLocation, setSelectedTableLocation] = useState();
  console.log(selectedTableLocation);

  return (
    <>
      <div className="possetting">
        <div className="card text-left border-0">
          <Form>
            <div className="card-body categoryField">
              <div className="supplier_filter1">
                {isLoading ? (
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
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group flex-column d-flex">
                        <div>
                          <label className="control-label">Category Type</label>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              setIsCategoryTypeModalOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                              data-bs-original-title="Add New Supplier From Here"
                              aria-label="Add New Supplier From Here"
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Category Type"
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={settingsList?.categoryTypes.map(
                            (categoryType) => {
                              return {
                                value: categoryType.id,
                                label: categoryType.value,
                              };
                            }
                          )}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <div>
                          <label className="control-label">Category</label>
                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              setIsCategoryModalOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Category"
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={settingsList?.productCategories.map(
                            (category) => {
                              return {
                                value: category.id,
                                label: category.value,
                              };
                            }
                          )}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <div>
                          <label className="control-label">Sub Category</label>
                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              setIsSubCategoryModalOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                            />
                          </a>
                        </div>
                        <TreeSelect
                          placeholder="Sub Category"
                          showSearch
                          treeData={generateCategoriesOption(
                            settingsList?.productSubCategories
                          )}
                          treeDefaultExpandAll={true}
                          filterTreeNode={(inputValue, treeNode) =>
                            treeNode.props.title
                              .toLowerCase()
                              .indexOf(inputValue.toLowerCase()) !== -1
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <div>
                          <label className="control-label">Brand</label>
                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              setIsBrandModalOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                              data-bs-original-title="Add New Supplier From Here"
                              aria-label="Add New Supplier From Here"
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Choose Brand"
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={settingsList?.brand.map((brand) => {
                            return {
                              value: brand.id,
                              label: brand.value,
                            };
                          })}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <div>
                          <label htmlFor="exampleInputEmail1">
                            Table Location
                          </label>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsTableLocationModalOpen(true);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#tablelocationModal"
                          >
                            {" "}
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                              data-bs-original-title="Add New Supplier From Here"
                              aria-label="Add New Supplier From Here"
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Table Location"
                          value={selectedTableLocation}
                          onChange={(val) =>
                            setSelectedTableLocation(
                              settingsList?.tableLocationsWithTables[val]
                            )
                          }
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={settingsList?.tableLocationsWithTables.map(
                            (tableLocation, ind) => {
                              return {
                                value: ind,
                                label: tableLocation.value,
                              };
                            }
                          )}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <div>
                          <label htmlFor="exampleInputEmail1">Table No.</label>
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsTableModalOpen(true);
                            }}
                            data-bs-target="#tablenumberModal"
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
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
                          options={selectedTableLocation?.tables.map(
                            (table) => {
                              return {
                                value: table.id,
                                label: table.value,
                              };
                            }
                          )}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <div>
                          <label htmlFor="exampleInputEmail1">Order Type</label>
                          <a
                            href="#"
                            onClick={() => setIsOrderTypeModalOpen(true)}
                            data-bs-toggle="modal"
                            data-bs-target="#ordertypeModal"
                          >
                            {" "}
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                              data-bs-original-title="Add New Supplier From Here"
                              aria-label="Add New Supplier From Here"
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Order Type"
                          // showSearch
                          // filterOption={(input, option) =>
                          //   (option?.label ?? "")
                          //     .toLowerCase()
                          //     .includes(input.toLowerCase())
                          // }
                          options={settingsList?.orderTypes.map((orderType) => {
                            return {
                              label: orderType.channelName,
                              options: orderType.orderTypes?.map((orderTyp) => {
                                return {
                                  label: orderTyp.value,
                                  value: orderTyp.value + orderType.channelName,
                                };
                              }),
                            };
                          })}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group d-flex flex-column">
                        <div>
                          <label htmlFor="exampleInputEmail1">Tax</label>
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#taxtypeModal"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsTaxModalOpen(true);
                            }}
                          >
                            <i
                              className="fas fa-plus mb-2 ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title=""
                              data-bs-original-title="Add New Supplier From Here"
                              aria-label="Add New Supplier From Here"
                            />
                          </a>
                        </div>
                        <Select
                          placeholder="Tax"
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={settingsList?.taxExclusiveInclusive.map(
                            (tax) => {
                              return {
                                value: tax.id,
                                label: tax.value,
                              };
                            }
                          )}
                        ></Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
      {isCategoryModalOpen && (
        <AddCategory
          isOpen={isCategoryModalOpen}
          setIsOpen={setIsCategoryModalOpen}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
      {isCategoryTypeModalOpen && (
        <AddCategoryType
          isOpen={isCategoryTypeModalOpen}
          setIsOpen={setIsCategoryTypeModalOpen}
        />
      )}
      {isTableLocationModalOpen && (
        <AddTableLocations
          isOpen={isTableLocationModalOpen}
          setIsOpen={setIsTableLocationModalOpen}
        />
      )}
      {isBrandModalOpen && (
        <AddBrand isOpen={isBrandModalOpen} setIsOpen={setIsBrandModalOpen} />
      )}
      {isTableModalOpen && (
        <AddTable
          isOpen={isTableModalOpen}
          setIsOpen={setIsTableModalOpen}
          selectedImage={selectedImage}
        />
      )}
      {isOrderTypeModalOpen && (
        <AddOrderType
          isOpen={isOrderTypeModalOpen}
          setIsOpen={setIsOrderTypeModalOpen}
        />
      )}
      {isTaxModalOpen && (
        <AddTax isOpen={isTaxModalOpen} setIsOpen={setIsTaxModalOpen} />
      )}
      {isSubCategoryModalOpen && (
        <AddSubCategory
          isOpen={isSubCategoryModalOpen}
          setIsOpen={setIsSubCategoryModalOpen}
        />
      )}
    </>
  );
}

export default Settings;

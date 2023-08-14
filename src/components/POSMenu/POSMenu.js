import { Empty, Select } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import EachMenu from "./EachMenu";
import Skeleton from "react-loading-skeleton";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import Billing from "../Billing/Billing";
function POSMenu({
  orderType,
  activeTab,
  setActiveTab,
  productsWithCategories,
  activeCategory,
  setActiveCategory,
  products,
  setMenuProducts,
  isSetMenu,
  productClickHandler,
  setActiveSetMenu,
  isLoading,
  addToCartHandler,
}) {
  const { isFirstItemVisible, scrollPrev, scrollNext, isLastItemVisible } =
    React.useContext(VisibilityContext);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  const itemClickHandler =
    (category) =>
    ({
      scrollToItem,
      getItemById,
      scrollNext,
      getPrevItem,
      isLastItemVisible,
      isItemVisible,
    }) => {
      setActiveCategory(category);
      scrollToItem(getItemById(category.categoryId));
      if (isItemVisible(category.categoryId) || isLastItemVisible) {
        return;
      }
      scrollNext();
    };
  const [searchkeyword, setSearchKeyword] = React.useState("");
  const [shownProducts, setShownProducts] = React.useState([]);
  useEffect(() => {
    if (searchkeyword) {
      const shownData = [];
      productsWithCategories.map((category) => {
        category.products.map((product) => {
          if (
            product.productName
              .toLowerCase()
              .includes(searchkeyword.toLowerCase())
          ) {
            shownData.push(product);
          }
        });
      });
      console.log(shownData);
      setShownProducts(shownData);
    } else {
      setShownProducts(products);
    }
  }, [products, searchkeyword]);
  console.log(orderType, "dsafasfasdfasdjsdkfjadslkfjdaslkfjlks");
  return (
    // <App />
    <>
      <div className="col-md-8 col-xxl-9">
        <div className="menu_right">
          <div className="right_top mb-4">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    {isLoading ? (
                      <Skeleton count={0.5} height={30} />
                    ) : (
                      <Select
                        placeholder="Select Order Type"
                        onChange={(e) => setActiveTab(e)}
                        style={{ width: "50%" }}
                        value={activeTab}
                        options={orderType?.map((orderType) => {
                          return {
                            label: orderType.value,
                            value: orderType.id,
                          };
                        })}
                      />
                    )}
                  </div>
                  <div className="col-md-6 justify-content-end d-flex ms-auto">
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
                        value={searchkeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        aria-label="search"
                        aria-describedby="search"
                        spellCheck="false"
                        data-ms-editor="true"
                      />
                    </div>
                  </div>
                </div>
                <div className="tab-content mt-3" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="horizontal_tabs menutabs">
                      <ScrollMenu
                        LeftArrow={<LeftArrow />}
                        RightArrow={<RightArrow />}
                        scrollContainerClassName="nav nav-tabs nowrap-tabs"
                      >
                        {activeCategory &&
                          productsWithCategories?.map((category) => {
                            return (
                              <EachMenu
                                itemClickHandler={itemClickHandler(category)}
                                itemID={category.categoryId}
                                category={category}
                                key={category.categoryId}
                                activeCategory={activeCategory}
                              />
                            );
                          })}
                      </ScrollMenu>

                      {/* </div> */}
                      <div className="tab-content mt-3" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="menu1"
                          role="tabpanel"
                          aria-labelledby="menu1-tab"
                        >
                          <div className="recentstores pt-50">
                            {isLoading ? (
                              <div className="row ">
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                                <ProductCardSkeleton />
                              </div>
                            ) : !isSetMenu ? (
                              <div className="row ">
                                {!shownProducts || shownProducts?.length < 1 ? (
                                  <Empty />
                                ) : (
                                  shownProducts
                                    ?.filter((product) => {
                                      return (
                                        product.productVariations.length > 0
                                      );
                                    })
                                    ?.map((product, i) => {
                                      return (
                                        <div
                                          className="col-lg-4 col-6 col-sm-4 col-xxl-3"
                                          key={i}
                                        >
                                          <div className="border-gray p-15 mb-4 bg-white text-center">
                                            <a
                                              href=""
                                              onClick={(e) => {
                                                e.preventDefault();
                                                productClickHandler(product);
                                              }}
                                              data-bs-toggle="modal"
                                              data-bs-target="#exampleModal"
                                            >
                                              <img
                                                src={product.productImage}
                                                alt=""
                                              />
                                              <div className=" d-block">
                                                <h6 className="mb-0 fw-bold">
                                                  {product.productName}
                                                </h6>{" "}
                                                <span className="d-block text-danger fw-bold">
                                                  {currencySymbol}
                                                  {
                                                    product.productVariations.find(
                                                      (productVariation) => {
                                                        return productVariation.isDefault;
                                                      }
                                                    )?.price
                                                  }
                                                </span>
                                              </div>
                                            </a>
                                            <a
                                              href=""
                                              onClick={(e) => {
                                                e.preventDefault();
                                                addToCartHandler(product);
                                              }}
                                              className="btn btn-raised shadow my-button w-xs  me-2 homecart homelogin"
                                            >
                                              <i className="fas fa-shopping-cart me-2" />
                                              Add
                                            </a>
                                          </div>
                                        </div>
                                      );
                                    })
                                )}
                              </div>
                            ) : (
                              <div className="row ">
                                {!setMenuProducts ||
                                setMenuProducts?.length < 1 ? (
                                  <Empty />
                                ) : (
                                  setMenuProducts?.map((setMenu, i) => {
                                    return (
                                      <div
                                        className="col-lg-4 col-6 col-sm-4 col-xxl-3"
                                        key={i}
                                      >
                                        <div className="border-gray p-15 mb-4 bg-white text-center">
                                          <a
                                            href=""
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setActiveSetMenu(setMenu);
                                            }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                          >
                                            <img src={setMenu.image} alt="" />
                                            <div className=" d-block">
                                              <h6 className="mb-0 fw-bold">
                                                {setMenu.setMenuName}
                                              </h6>{" "}
                                              <span className="d-block text-danger fw-bold">
                                                {currencySymbol}
                                                {setMenu?.setMenuPrice}
                                              </span>
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="menu2"
                          role="tabpanel"
                          aria-labelledby="menu2-tab"
                        >
                          ...
                        </div>
                        <div
                          className="tab-pane fade"
                          id="menu3"
                          role="tabpanel"
                          aria-labelledby="menu3-tab"
                        >
                          ...
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default POSMenu;

import { Empty, Input } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";
function CategoryProducts({
  category,
  selectedProducts,
  selectedCategoryId,
  setSelectedCategoryId,
  setSelectedProducts,
  isLoading,
}) {
  const [activeTab, setActiveTab] = useState();
  useEffect(() => {
    if (category) setActiveTab(category[0]);
  }, [category]);
  const [shownProducts, setShownProducts] = useState([]);
  useEffect(() => {
    if (activeTab) setShownProducts(activeTab.productVariations);
  }, [activeTab]);
  const containsFinder = (product) => {
    const isActive = selectedProducts?.find((prod) => prod == product.id);
    if (isActive) return true;
    return false;
  };
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    setShownProducts(
      activeTab?.productVariations.filter((variant) =>
        variant.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  }, [searchKeyword]);

  return (
    <div className="card  mt-3">
      {isLoading ? (
        <div className="card-body">
          <div className="recentstores pt-50">
            <div className="row mt-2">
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
          </div>
        </div>
      ) : (
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group btn1">
              {category?.map((category, i) => {
                let className = "btn btn-primary";
                if (category?.categoryId == activeTab?.categoryId) {
                  className = "btn btn-primary bg-theme active";
                } else {
                  className = "btn btn-primary bg-green";
                }
                return (
                  <a
                    key={category.categoryId}
                    className={className}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(category);
                    }}
                    aria-current="page"
                  >
                    {category.categoryName}
                  </a>
                );
              })}
            </div>
            <div className="col-md-4">
              <Input
                type="text"
                placeholder="Search for products"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>

          <div className="recentstores pt-50">
            <div className="col-md-4">
              {selectedCategoryId.length > 0 && (
                <Input type="text" placeholder="Description" className="mt-2" />
              )}
            </div>
            <div className="row mt-2">
              {shownProducts?.length > 0 ? (
                shownProducts?.map((product) => {
                  return (
                    <div
                      key={product.id}
                      style={{ cursor: "pointer" }}
                      className={`col-lg-3`}
                      onClick={() => {
                        if (!containsFinder(product)) {
                          setSelectedProducts((prevProd) => [
                            ...prevProd,
                            product.id,
                          ]);
                        } else {
                          setSelectedProducts((prevProd) =>
                            prevProd.filter((prod) => prod !== product.id)
                          );
                        }
                      }}
                    >
                      <a
                        href=""
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      />
                      <div className="border-gray p-15 mb-4 bg-white text-center position-relative">
                        <img
                          src={
                            product.image
                              ? product.image
                              : "assets/images/imagePlaceholder.png"
                          }
                          alt=""
                        />
                        <div className=" d-block">
                          {containsFinder(product) && (
                            <div
                              style={{
                                background: "white",
                                borderRadius: "50%",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                top: "10px",
                                left: "10px",
                              }}
                              className="position-absolute"
                            >
                              <AiFillCheckCircle
                                style={{
                                  color: "#0DB19C",
                                }}
                                size="30"
                              />
                            </div>
                          )}
                          <h6 className="mb-0 fw-bold">{product.name}</h6>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;

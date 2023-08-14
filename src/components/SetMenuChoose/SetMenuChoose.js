import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import { Modal } from "react-bootstrap";
function ProductVariants({ activeSetMenu, setActiveSetMenu }) {
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { cartProducts } = useSelector((state) => state.cartReducer);
  const [isButtonDisabled, setIsProductDisabled] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  const containsFinder = (product) => {
    const isActive = selectedProducts?.find((prod) => prod.id == product.id);
    if (isActive) return true;
    return false;
  };
  const addToCartHandler = () => {
    if (selectedProducts.length < 1) {
      alert("Please choose products");
      return;
    }
    console.log(selectedProducts, "selectedProducts");
    dispatch({
      type: "ADD_SET_MENU_CART",
      payload: {
        SetMenuId: activeSetMenu.id,
        SetMenuName: activeSetMenu.setMenuName,
        SetMenuImage: activeSetMenu.image,
        SetMenuQuantity: productQuantity,
        SetMenuPrice: activeSetMenu.setMenuPrice,
        TotalSetMenuPrice:
          parseFloat(activeSetMenu.setMenuPrice) * productQuantity,
        Description: "",
        Tax: activeSetMenu.taxExclusiveInclusiveValue,
        OrderItemsViewModels: selectedProducts?.map((product) => {
          return {
            ProductVariationId: product.id,
            ProductName: product.productName,
            ProductVariationName: product.productVariationName,
          };
        }),
      },
    });
    setActiveSetMenu(null);
  };
  return (
    <Modal
      className="fade"
      backdrop="static"
      show={activeSetMenu != null}
      size="lg"
      onHide={() => setActiveSetMenu(null)}
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <Modal.Header closeButton className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Set Menu
        </h5>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="row" style={{ overflow: "auto", height: "60vh" }}>
          {activeSetMenu?.setMenuProductListViewModelWithCategory.map(
            (productWithCategories) => {
              return (
                <div className="row" key={productWithCategories.id}>
                  <h2 style={{ fontSize: "18px" }}>
                    {productWithCategories.categoryName}
                  </h2>
                  {productWithCategories.setMenuProductListViewModels.map(
                    (product) => {
                      return (
                        <div
                          key={product.id}
                          style={{ cursor: "pointer" }}
                          className={`col-lg-3`}
                          onClick={() => {
                            if (!containsFinder(product)) {
                              setSelectedProducts((prevProd) => [
                                ...prevProd,
                                product,
                              ]);
                            } else {
                              setSelectedProducts((prevProd) =>
                                prevProd.filter(
                                  (prod) => prod.id !== product.id
                                )
                              );
                            }
                          }}
                        >
                          <a
                            href=""
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          />
                          <div
                            className="border-gray p-15 mb-4 bg-white text-center position-relative"
                            style={{ height: "150px" }}
                          >
                            <img
                              style={{ width: "100%", height: "80%" }}
                              src={
                                product.productImage
                                  ? product.productImage
                                  : "assets/images/imagePlaceholder.png"
                              }
                              alt=""
                            />
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
                            <h6 className="mb-0  mt-3">
                              {product.productName}
                            </h6>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            }
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <div className="quantity d-flex align-items-center me-auto">
          <i
            className="fa fa-minus"
            onClick={() => {
              if (productQuantity > 1) {
                setProductQuantity((prev) => {
                  return prev - 1;
                });
              }
            }}
          />
          <span className="qty">{productQuantity}</span>
          <i
            className="fa fa-plus"
            onClick={() => {
              setProductQuantity((prev) => {
                return prev + 1;
              });
            }}
          />
        </div>
        <a
          href=""
          className="btn btn-raised shadow my-button w-xs me-2 homecart homelogin"
        >
          Total:
          <span className="ms-3">
            {currencySymbol}
            {activeSetMenu?.setMenuPrice * productQuantity}
          </span>
        </a>
        <button
          type="button"
          onClick={addToCartHandler}
          className="btn btn-raised shadow my-button w-xs me-2 homecart homelogin"
          data-bs-dismiss="modal"
          disabled={isButtonDisabled}
        >
          <i className="fas fa-shopping-cart me-2" />
          {isButtonDisabled ? "Added" : "Add"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductVariants;

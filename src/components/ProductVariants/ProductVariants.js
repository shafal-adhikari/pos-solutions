import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import AddOns from "../AddOns/AddOns";
function ProductVariants({ activeProduct, setActiveProduct }) {
  const dispatch = useDispatch();
  const [selectedProductVariation, setSelectedProductVariation] = useState();
  const { cartProducts } = useSelector((state) => state.cartReducer);
  const [isButtonDisabled, setIsProductDisabled] = useState(false);
  useEffect(() => {
    if (activeProduct) {
      setSelectedProductVariation(activeProduct.productVariations[0]);
    }
  }, [activeProduct]);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  const [totalPrice, setTotalPrice] = useState();
  const [productQuantity, setProductQuantity] = useState(1);
  const [addOns, setAddOns] = useState();
  const addToCartHandler = () => {
    console.log({
      ProductId: activeProduct.id,
      ProductImage: activeProduct.productImage,
      ProductName: activeProduct.productName,
      Description: "",
      ProductPrice: selectedProductVariation.price,
      Quantity: productQuantity,
      Tax: activeProduct.taxExclusiveInclusiveValue,
      VariationName: selectedProductVariation.name,
      ProductVariationId: selectedProductVariation.id,
      Total: totalPrice,
      StockCount: selectedProductVariation.stockCount,
    });
    dispatch({
      type: "SET_ITEM_CART",
      payload: {
        ProductId: activeProduct.id,
        ProductImage: activeProduct.productImage,
        ProductName: activeProduct.productName,
        Description: "",
        ProductPrice: selectedProductVariation.price,
        Quantity: productQuantity,
        Tax: activeProduct.taxExclusiveInclusiveValue,
        VariationName: selectedProductVariation.name,
        ProductVariationId: selectedProductVariation.id,
        Total: totalPrice,
        StockCount: selectedProductVariation.stockCount,
      },
    });
    setActiveProduct(null);
  };
  useEffect(() => {
    if (activeProduct) {
      setAddOns(
        activeProduct.addOns.map((addon) => {
          return {
            ...addon,
            Quantity: 1,
          };
        })
      );
    }
  }, [activeProduct]);

  useEffect(() => {
    if (selectedProductVariation) {
      setTotalPrice(
        productQuantity * parseFloat(selectedProductVariation.price)
      );
      const productExistsInCart =
        cartProducts !== "" &&
        cartProducts?.find(
          (product) => selectedProductVariation.id == product.ProductVariationId
        );
      if (
        productExistsInCart &&
        productQuantity == productExistsInCart.Quantity
      ) {
        setIsProductDisabled(true);
      } else {
        setIsProductDisabled(false);
      }
    }
  }, [selectedProductVariation, productQuantity, cartProducts]);
  return (
    <Modal
      className="fade"
      backdrop="static"
      show={activeProduct != null}
      size="lg"
      onHide={() => setActiveProduct(null)}
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <Modal.Header closeButton className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Select Variance
        </h5>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="addvariance">
          <span className="d-block fw-bold fs-6">Select Size</span>
          <div className="btn-group" role="group" aria-label="Basic example">
            {activeProduct?.productVariations.map((variation, i) => {
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedProductVariation(variation)}
                  className={`btn btn-primary border-white ${
                    variation.id !== selectedProductVariation?.id
                      ? "bg-theme"
                      : ""
                  }`}
                >
                  {variation.name}
                </button>
              );
            })}
          </div>
          <div className="row mt-4">
            <span className="d-block fw-bold fs-6">Select Addons</span>
            {addOns?.map((addOnProduct, i) => {
              return <AddOns key={i} addOnProduct={addOnProduct} />;
            })}
          </div>
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
              if (
                selectedProductVariation.stockCount == null ||
                productQuantity < selectedProductVariation.stockCount
              ) {
                setProductQuantity((prev) => {
                  return prev + 1;
                });
              }
            }}
          />
        </div>
        <a
          href=""
          className="btn btn-raised shadow my-button w-xs me-2 homecart homelogin"
        >
          Total:{" "}
          <span className="ms-3">
            {" "}
            {currencySymbol}
            {totalPrice}
          </span>
        </a>
        <button
          type="button"
          className="btn btn-raised shadow my-button w-xs me-2 homecart homelogin"
          data-bs-dismiss="modal"
          onClick={addToCartHandler}
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

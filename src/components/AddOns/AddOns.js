import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
function AddOns({ addOnProduct }) {
  const [selectedProductVariation, setSelectedProductVariation] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (addOnProduct) {
      setSelectedProductVariation(addOnProduct.productVariations[0]);
    }
  }, [addOnProduct]);
  const [addOnQuantity, setAddOnQuantity] = useState(1);
  const quantityAddHandler = () => {
    console.log(selectedProductVariation.stockCount);
    if (addOnQuantity < selectedProductVariation.stockCount) {
      setAddOnQuantity((prev) => {
        return prev + 1;
      });
    }
  };
  const quantitySubtractHandler = () => {
    if (addOnQuantity > 1) {
      setAddOnQuantity((prev) => {
        return prev - 1;
      });
    }
  };
  const addToCartHandler = () => {
    dispatch({
      type: "SET_ITEM_CART",
      payload: {
        ProductId: addOnProduct.id,
        ProductImage: addOnProduct.productImage,
        ProductName: addOnProduct.productName,
        Description: "",
        ProductPrice: selectedProductVariation.price,
        Quantity: addOnQuantity,
        VariationName: selectedProductVariation.name,
        ProductVariationId: selectedProductVariation.id,
        Total: addOnQuantity * parseFloat(selectedProductVariation.price),
        Tax: addOnProduct.taxExclusiveInclusiveValue,
        StockCount: selectedProductVariation.stockCount,
      },
    });
  };
  return (
    <div className="col-md-6">
      <div className="card mb-3 bg-light border-0">
        <div className="row g-0">
          <div className="col-md-4">
            <a className="d-block h-100" href="">
              <img
                className="card-img-top h-100"
                src={addOnProduct.productImage}
                alt="Pizza"
              />
            </a>
          </div>
          <div className="col-md-8">
            <div className=" product-card  pb-2">
              <div className="card-body pt-1 pb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <h3 className="product-title fs-md fw-bold mb-0">
                    <a href="#">{addOnProduct.productName}</a>
                  </h3>
                  <div className="product-price">
                    <span className="text-accent fw-bold badge bg-info text-dark">
                      ${selectedProductVariation?.price}
                    </span>
                  </div>
                </div>
                <div className="select_variance mt-2 mb-2">
                  <label htmlFor="">Select Variance</label>
                  <select
                    className="form-control form-select"
                    onChange={(e) => {
                      setSelectedProductVariation(
                        addOnProduct.productVariations[e.target.value]
                      );
                    }}
                  >
                    {addOnProduct?.productVariations.map((variation, i) => {
                      return (
                        <option
                          key={variation.id}
                          //   defaultChecked={i == 0}
                          value={i}
                        >
                          {variation.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <button
                    className="btn btn-primary btn-sm bg-theme border-0"
                    type="button"
                    onClick={addToCartHandler}
                  >
                    +<i className="fas fa-shopping-cart fs-base ms-1" />
                  </button>
                  <div className="quantity d-flex align-items-center">
                    <i
                      className="fa fa-minus"
                      onClick={quantitySubtractHandler}
                    />
                    <span className="qty">{addOnQuantity}</span>
                    <i className="fa fa-plus" onClick={quantityAddHandler} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOns;

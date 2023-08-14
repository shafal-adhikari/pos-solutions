import React, { useEffect, useLayoutEffect, useState } from "react";
import POSMenu from "../components/POSMenu/POSMenu";
import { useDispatch, useSelector } from "react-redux";
import Billing from "../components/Billing/Billing";
import ProductVariants from "../components/ProductVariants/ProductVariants";
import Skeleton from "react-loading-skeleton";
import SetMenuChoose from "../components/SetMenuChoose/SetMenuChoose";
import ChangePlan from "./User/ChangePlan";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
function Pos() {
  const dispatch = useDispatch();
  const {
    orderType,
    productsWithCategories,
    setMenus,
    message,
    isSubscriptionActive,
    isLoading,
    error,
  } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    if (message && isSubscriptionActive) {
      dispatch({
        type: "GET_ALL_SUBSCRIPTION_REQUEST",
      });
    }
  }, [message, isSubscriptionActive]);
  const { state } = useLocation();
  const [changeModal, setChangeModal] = useState(false);
  const { subscriptionPlan } = useSelector((state) => state.billingReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const [cartProducts, setCartProducts] = useState([]);
  const { updateCartProducts } = useSelector(
    (state) => state.updateCartReducer
  );
  useEffect(() => {
    if (state?.orderId) {
      setCartProducts(updateCartProducts);
    } else {
      setCartProducts(cartState.cartProducts);
    }
  }, [cartState.cartProducts, updateCartProducts, state]);
  const [activeTab, setActiveTab] = useState();
  const [activeCategory, setActiveCategory] = useState();
  const [products, setProducts] = useState();
  const [activeProduct, setActiveProduct] = useState();

  const [activeSetMenu, setActiveSetMenu] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (productsWithCategories) {
      cartProducts !== "" &&
        cartProducts?.map((cartProduct) => {
          for (let i = 0; i < productsWithCategories.length; i++) {
            let category = productsWithCategories[i];
            const foundProduct = category.products.find((product) => {
              return product.id == cartProduct.ProductId;
            });
            if (foundProduct) {
              const foundProductVariation = foundProduct.productVariations.find(
                (variation) => variation.id == cartProduct.ProductVariationId
              );
              dispatch({
                type: state?.orderId ? "SET_ITEM_CART" : "SET_ITEM_CART_UPDATE",
                notification: "off",
                payload: {
                  ...cartProduct,
                  ProductName: foundProduct.productName,
                  Tax: parseFloat(foundProduct.taxExclusiveInclusiveValue),
                  Total:
                    parseFloat(foundProductVariation.price) *
                    parseFloat(cartProduct.Quantity),
                  ProductPrice: foundProductVariation.price,
                  StockCount: foundProductVariation.stockCount,
                  VariationName: foundProductVariation.name,
                },
              });
              break;
            }
          }
        });
    }
  }, [productsWithCategories]);
  const addToCartHandler = (product) => {
    console.log({
      ProductId: product.id,
      ProductImage: product.productImage,
      ProductName: product.productName,
      Description: "",
      ProductPrice: product.productVariations.find(
        (variation) => variation.isDefault
      ).price,
      Quantity: 1,
      Tax: product.taxExclusiveInclusiveValue,
      VariationName: product.productVariations.find(
        (variation) => variation.isDefault
      ).name,
      ProductVariationId: product.productVariations.find(
        (variation) => variation.isDefault
      ).id,
      Total: parseFloat(
        product.productVariations.find((variation) => variation.isDefault).price
      ),
      StockCount: product.productVariations.find(
        (variation) => variation.isDefault
      ).stockCount,
    });
    dispatch({
      type: state?.orderId ? "SET_ITEM_CART_UPDATE" : "SET_ITEM_CART",
      payload: {
        ProductId: product.id,
        ProductImage: product.productImage,
        ProductName: product.productName,
        Description: "",
        ProductPrice: product.productVariations.find(
          (variation) => variation.isDefault
        ).price,
        Quantity: 1,
        Tax: product.taxExclusiveInclusiveValue,
        VariationName: product.productVariations.find(
          (variation) => variation.isDefault
        ).name,
        ProductVariationId: product.productVariations.find(
          (variation) => variation.isDefault
        ).id,
        Total:
          1 *
          Number(
            product.productVariations.find((variation) => variation.isDefault)
              .price
          ),
        StockCount: product.productVariations.find(
          (variation) => variation.isDefault
        ).stockCount,
      },
    });
  };
  useEffect(() => {
    dispatch({
      type: "GET_ORDER_TYPE_REQUEST",
    });
  }, []);
  useLayoutEffect(() => {
    if (orderType?.length > 0) {
      setActiveTab(orderType[0].id);
    }
  }, [orderType]);

  const productClickHandler = (product) => {
    setActiveProduct(product);
  };

  useEffect(() => {
    if (activeCategory) {
      setProducts(activeCategory.products);
    }
  }, [activeCategory]);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_ORDER_SECTION_REQUEST",
      payload: {
        CategoryId: "",
      },
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: "PAYMENT_SECTION_LIST_REQUEST",
    });
  }, []);

  useLayoutEffect(() => {
    if (productsWithCategories) {
      setActiveCategory(productsWithCategories[0]);
    }
  }, [productsWithCategories]);

  return (
    <>
      <ChangePlan
        isOpen={changeModal}
        setIsOpen={setChangeModal}
        StoreSubscriptionPlanId={subscriptionPlan?.storeSubscriptionPlanId}
      />
      <div className="container-fluid page-body-wrapper1">
        <div className=" main_panel_inner">
          <div className="content-wrapper">
            <div className="content">
              <div className="row  d-flex justify-content-center">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="breadcrumb_top">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb breadcrumb-custom">
                        <Link to="/" className="breadcrumb-item fw-bold">
                          Home
                        </Link>
                        <li className="breadcrumb-item fw-bold">
                          <span> Menu </span>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              {message ? (
                <div className="card mb-3 bg-light-green border-0 p-1">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="assets/images/noproduct.png"
                        className="img-fluid rounded-start no_product"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title mb-2">{message}</h5>
                        <a
                          onClick={() => {
                            if (isSubscriptionActive) {
                              setChangeModal(true);
                            } else {
                              navigate("/subscriptions");
                            }
                          }}
                          className="btn btn-danger btn-sm  border-0"
                        >
                          {isSubscriptionActive
                            ? "Change Plan"
                            : "Subscribe Now"}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="menu_inner myorders">
                  <div className="row">
                    <POSMenu
                      orderType={orderType}
                      activeTab={activeTab}
                      productsWithCategories={productsWithCategories}
                      setActiveTab={setActiveTab}
                      activeCategory={activeCategory}
                      setActiveCategory={setActiveCategory}
                      products={products}
                      setMenuProducts={setMenus}
                      setActiveSetMenu={setActiveSetMenu}
                      isSetMenu={activeCategory?.isSetMenu}
                      isLoading={isLoading}
                      addToCartHandler={addToCartHandler}
                      productClickHandler={productClickHandler}
                    />
                    <Billing orderTypeId={activeTab} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <footer className="footer">
            <div className="container-fluid clearfix">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                Copyright © POSApt 2022
              </span>
            </div>
          </footer>
        </div>
      </div>
      <>
        {/* Make Payment  */}

        {/* add variance Modal */}
        {/* Modal */}
        <ProductVariants
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
        />
        <SetMenuChoose
          activeSetMenu={activeSetMenu}
          setActiveSetMenu={setActiveSetMenu}
        />
        {/* add customer */}
        {/* Add New Customer Modal */}
        <div
          className="modal fade"
          id="addcustomerModalCenter"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="addcustomerModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addcustomermodalLabel">
                  Add New Customer
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="newsupplier_form">
                  <div className="form-group">
                    <label className="control-label">Customer Type</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Customer Type"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Customer Term</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Customer Term"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Discount</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add Discount"
                    />
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input mt-2"
                      type="checkbox"
                      defaultValue=""
                      id="defaultCheck1"
                    />
                    <label className="form-check-label" htmlFor="defaultCheck1">
                      Terms and Conditions
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-start">
                <button
                  type="button"
                  className="btn btn-primary all_btn rounded-0"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-0"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* RefuldModal */}
        <div
          className="modal fade"
          id="refundModalCenter"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="refundModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="refundmodalLabel">
                  Refund
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle table-nowrap mb-0">
                      <thead>
                        <tr className="table-light">
                          <th>S. No.</th>
                          <th>Item</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Dessert</td>
                          <td>$10.00</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Chicken</td>
                          <td>$10.00</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Sausage</td>
                          <td>$10.00</td>
                        </tr>
                        <tr className="bg-theme">
                          <td colSpan={2} className="text-white">
                            Total
                          </td>
                          <td className="text-white">$10.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-start">
                <button
                  type="button"
                  className="btn btn-primary all_btn rounded-0"
                >
                  Refund
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-0"
                  data-bs-toggle="offcanvas"
                  href="#placeorderCanvas"
                  role="button"
                  aria-controls="placeorderCanvas"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Pos;

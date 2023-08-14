import React from "react";
import { useSelector } from "react-redux";

function PaymentReceipt({ setOpen }) {
  const { paymentInvoice } = useSelector((state) => state.paymentReducer);
  const {
    activeStore: { currencySymbol },
  } = useSelector((state) => state.authenticationReducer);
  const { activeStore } = useSelector((state) => state.authenticationReducer);
  return (
    <>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="makepaymentCanvasLabel">
          Make Payment
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={() => setOpen(false)}
        />
      </div>
      <hr />
      <div className="offcanvas-body eodfinal">
        <div className="bg-theme-secondary rounded d-flex flex-column p-3 mt-3">
          <div className="text-center topeod">
            <p className="text-white">
              <small>
                <span className="fw-bold">{paymentInvoice?.storeName}</span>
                <br />
                {paymentInvoice?.address}
                <br />
                ABN: 1234567898 <br />
                Date/Time: 06/22/2022, 10:37AM
              </small>
            </p>
          </div>
          {/* <div className=" me-3"><h6 className="mb-0 fw-bold text-white mt-3">Final Report</h6></div> */}
          {paymentInvoice?.productWithPriceViewModels.map((product, i) => {
            return (
              <div className="d-flex" key={product.name + "invoice" + i}>
                <div className="col-7 text-white">{product.name}</div>
                <div className="text-white">
                  {currencySymbol}
                  {product.total}
                </div>
              </div>
            );
          })}
          <div className="total">
            <div className="d-flex">
              <div className="col-7 text-white">Total</div>
              <div className="text-white">
                {currencySymbol}
                {paymentInvoice?.totalAmount}
              </div>
            </div>
            <div className="d-flex">
              <div className="col-7 text-white">Balance Due</div>
              <div className="text-white">10.00</div>
            </div>
            <div className="d-flex">
              <div className="col-12 text-white">
                10% GST - Net Amount GST Amount- 10.00
              </div>
            </div>
          </div>
          <section className="border-top text-center">
            <p>
              Paid by : <span>CASH</span>
            </p>
            <p style={{ textAlign: "center" }}>Thank you for your visit!</p>
          </section>
          <footer style={{ textAlign: "center" }}>
            <p>Tax Invoice</p>
            <p>www.volgai.com.au</p>
          </footer>
          <div className="mybtn text-center">
            <a className="btn btn-success btn-sm bg-theme border-0">Download</a>
            <a className="btn btn-success btn-sm bg-theme border-0">
              Print Receipt
            </a>
            <a className="btn btn-success btn-sm bg-theme border-0">
              Email Receipt
            </a>
            {/* <a className="btn btn-danger btn_red btn-sm  border-0 w-100">Finalize Now</a> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentReceipt;

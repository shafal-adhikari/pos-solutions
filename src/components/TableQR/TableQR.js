import React from "react";
// import { Modal } from "react-bootstrap";
import Modal from "antd/lib/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { triggerBase64Download } from "react-base64-downloader";
function TableQR({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const { tableQR } = useSelector((state) => state.settingsReducer);
  return (
    <Modal
      open={isOpen}
      centered
      title="Table QR Image"
      style={{ zIndex: 1050 }}
      onCancel={() => {
        setIsOpen(false);
        dispatch({ type: "REMOVE_QR" });
      }}
      footer={null}
      width={"800px"}
    >
      <div className="imageContainer d-flex align-items-center justify-content-around">
        {tableQR && tableQR?.length > 0 ? (
          tableQR?.map((qr) => {
            return (
              <div className="w-30 d-flex flex-column align-items-center">
                <img
                  src={`data:image/jpeg;base64,${qr.qrImage}`}
                  className="w-100"
                />
                <span className="qrTableName">
                  Table Name: {qr.tableName.toLowerCase()}
                </span>
                <span className="qrTableLocation">
                  Table Location: {qr.tableLocation}
                </span>
                <button
                  className="qrDownloadButton"
                  onClick={() =>
                    triggerBase64Download(
                      "data:image/jpeg;base64," + qr.qrImage.toLowerCase(),
                      qr.tableName
                    )
                  }
                  type="button"
                >
                  <i className="fa fa-download" aria-hidden="true"></i>
                  Download
                </button>
              </div>
            );
          })
        ) : (
          <span className="generateFirst">Please generate QR first</span>
        )}
      </div>
    </Modal>
  );
}

export default TableQR;

import React, { useEffect, useState } from "react";
import { Image } from "antd";
function GiftCardImageModal({ templateList, setSelectedImage }) {
  const [selectedTab, setSelectedTab] = useState();
  useEffect(() => {
    if (templateList) {
      setSelectedTab(templateList[0]);
    }
  }, [templateList]);
  const [shownImages, setShownImages] = useState();
  const [selectedImage, setImage] = useState();
  useEffect(() => {
    if (selectedTab) {
      setShownImages(selectedTab.giftCardTemplateImages);
    }
  }, [selectedTab]);
  return (
    <div
      className="modal fade"
      data-backdrop="static"
      id="giftcardModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="giftcardModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header  ">
            <h5 className="modal-title" id="giftcardmodalLabel">
              Gift Cards
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="btn-group btn1">
                  {templateList?.map((template, i) => {
                    return (
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTab(template);
                        }}
                        key={i}
                        className={`btn btn-primary bg-theme ${
                          template.type == selectedTab?.type
                            ? "active bg-theme"
                            : "bg-green"
                        }`}
                      >
                        {template.type}
                      </a>
                    );
                  })}
                </div>
              </div>
              {/* <div className="col-md-6 mt-3">
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
                    aria-label="search"
                    aria-describedby="search"
                    spellCheck="false"
                    data-ms-editor="true"
                  />
                </div>
              </div> */}
            </div>
            <div id="lightgallery" className="row lightGallery giftimages">
              {shownImages?.map((image) => {
                return (
                  <a
                    className="image-tile col-md-4"
                    key={image.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setImage(image);
                    }}
                    // data-abc="true"
                  >
                    <img
                      src={image.image}
                      alt="image small"
                      className={
                        selectedImage?.id == image.id
                          ? "borderSelected"
                          : "borderNotSelected"
                      }
                      style={{ width: "300px", height: "300px" }}
                    />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="modal-footer justify-content-start">
            <button
              type="button"
              onClick={() => setSelectedImage(selectedImage)}
              className="btn btn-primary all_btn rounded-0"
              data-bs-dismiss="modal"
            >
              Confirm
            </button>
            {/* <button type="button" class="btn btn-danger rounded-0" data-bs-dismiss="modal">Cancel</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCardImageModal;

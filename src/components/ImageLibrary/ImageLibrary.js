import { Input } from "antd";
import React, { useEffect, useState } from "react";

function ImageLibrary({ images, selectedImage, setSelectedImage }) {
  const [searchValue, setSearchValue] = useState("");
  const [shownImages, setShownImages] = useState(images);
  const [imageIns, setImage] = useState();
  useEffect(() => {
    if (selectedImage) {
      setImage(selectedImage);
    }
  }, [selectedImage]);
  useEffect(() => {
    if (searchValue == "") {
      setShownImages(images);
    } else {
      setShownImages(
        images.filter((image) => {
          if (searchValue == "") {
            return true;
          }
          return image.name.toLowerCase().includes(searchValue.toLowerCase());
        })
      );
    }
  }, [searchValue, images]);
  return (
    <div
      className="offcanvas offcanvas-bottom selectimagecanvas bg-theme"
      tabIndex={""}
      id="offcanvasBottom"
      aria-labelledby="offcanvasBottomLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title text-white" id="offcanvasBottomLabel">
          Select an Default Image
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body small">
        <div className="modaladdimage">
          <div className="table_search mb-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text  h-100 rounded-0" id="search">
                  <i className="fas fa-search" />
                </span>
              </div>
              <Input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="form-control"
                placeholder="Search Menu Images"
              />
            </div>
          </div>
          <div className="row">
            {shownImages?.map((image) => {
              return (
                <div
                  className={`col-lg-2 col-6 col-sm-4 ${
                    imageIns?.id == image.id
                      ? "borderSelected"
                      : "borderNotSelected"
                  }`}
                  key={image.id}
                >
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setImage(image);
                    }}
                  >
                    <div className={"border-gray p-15  bg-white text-center"}>
                      <img
                        src={image.imageUrl ? image.imageUrl : image.image}
                        alt=""
                      />
                      <p className="fw-bold">{image.name}</p>
                    </div>
                  </a>
                </div>
              );
            })}
            {/* <div className="col-lg-2 col-6 col-sm-4">
              <a href="">
                <div className="border-gray p-15  bg-white text-center">
                  <img src="assets/images/cart.svg" alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4">
              <a href="">
                <div className="border-gray p-15  bg-white text-center">
                  <img src="assets/images/cart.svg" alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4">
              <a href="">
                <div className="border-gray p-15  bg-white text-center">
                  <img src="assets/images/cart.svg" alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4">
              <a href="">
                <div className="border-gray p-15  bg-white text-center">
                  <img src="assets/images/cart.svg" alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4">
              <a href="">
                <div className="border-gray p-15  bg-white text-center">
                  <img src="assets/images/cart.svg" alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4">
              <a href="">
                <div className="border-gray p-15  bg-white text-center">
                  <img src="assets/images/cart.svg" alt="" />
                </div>
              </a>
            </div> */}
            <div className="col-md-12 col-lg-12 mt-3">
              <button
                className="btn btn-success all_btn rounded-0"
                data-bs-dismiss="offcanvas"
                onClick={() => setSelectedImage(imageIns)}
              >
                Confirm
              </button>
              <button
                className="btn btn-primary all_btn btn_red rounded-0"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageLibrary;

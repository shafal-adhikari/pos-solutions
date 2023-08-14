/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cropper from "react-easy-crop";
import { Modal } from "react-bootstrap";
import { getLocalStorage } from "../../../helpers/frontendHelper";
import { createImage, getRadianAngle, rotateSize } from "./crop";
import FormItemSkeleton from "../../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";
import "./style.css";
const AddBannerSettings = ({ setIsAddBannerModalOpen }) => {
  const [addBannerForm] = Form.useForm();
  const dispatch = useDispatch();
  const {
    isLoading,
    getBannerAddSectionLoading,
    bannerAddSection,
    isOperatioSuccessful,
    addBannerLoading,
  } = useSelector((state) => state.bannerSettingsReducer);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [finalImageFile, setFinalImageFile] = useState();
  const [activeBannerType, setActiveBannerType] = useState(null);
  const [activeAspectRation, setActiveAspectRatio] = useState(null);
  const [imageName, setImageName] = useState();
  const [imageError, setImageError] = useState();

  const imageRef = React.useRef();

  useEffect(() => {
    if (!bannerAddSection?.bannerTypes?.length > 0) {
      dispatch({
        type: "GET_ADD_BANNER_SECTION_REQUEST",
      });
    }
  }, []);
  async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(data, 0, 0);

    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        const imageFile = new File([file], "my_image.png", {
          type: "image/png",
          lastModified: new Date().getTime(),
        });
        setFinalImageFile(imageFile);
        resolve(URL.createObjectURL(file));
      }, "image/jpeg");
    });
  }

  const handleImageUpload = (e) => {
    if (!activeBannerType) {
      e.target.value = null;
      setImageError("Please Select Banner Type first !");
    } else {
      setImageError(null);
      setImage(e.target.name);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );

      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onAddBannerFormSUbmit = (values) => {
    if (!croppedImage) {
      return;
    }
    let myDataform = new FormData();
    myDataform.append(
      "Request",
      JSON.stringify({
        Name: values.name,
        Url: values.url,
        AdsTypeId: activeBannerType,
        SortOrder: values.SortOrder,
        BannerTitle: values.bannerTitle,
        BannerSubtitle: values.bannerSubtitle,
      })
    );
    myDataform.append("Image", finalImageFile);
    dispatch({
      type: "ADD_BANNER_REQUEST",
      payload: myDataform,
    });
  };

  useEffect(() => {
    if (activeBannerType) {
      setActiveAspectRatio(
        bannerAddSection?.bannerTypes?.find(
          (item) => item.id == activeBannerType
        )?.additionalValue
      );
    }
  }, [activeBannerType]);
  return (
    <>
      <Modal
        fullscreen={true}
        show={image ? true : false}
        onHide={() => {
          setImage(null);
          setCroppedImage(null);
          imageRef.current.value = "";
        }}
        style={{ height: "100%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Preview Image </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "400px" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                justifySelf: "flex-end",
                position: "absolute",
                right: "1rem",
                bottom: "1rem",
              }}
            >
              <button
                className="btn btn-primary all_btn rounded-0"
                style={{
                  display:
                    image === null || croppedImage !== null ? "none" : "block",
                }}
                onClick={showCroppedImage}
              >
                Crop
              </button>
              {croppedImage && (
                <button
                  className="btn btn-primary all_btn btn_red rounded-0"
                  onClick={onClose}
                >
                  Re-Crop
                </button>
              )}
              {croppedImage && (
                <button
                  style={{ marginLeft: "1rem" }}
                  className="btn btn-primary all_btn rounded-0"
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div
              className="container"
              style={{
                display:
                  image === null || croppedImage !== null ? "none" : "block",
              }}
            >
              <div className="crop-container">
                <Cropper
                  image={image}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  zoomSpeed={4}
                  maxZoom={3}
                  aspect={
                    parseInt(activeAspectRation?.split("")?.[0]) /
                    parseInt(activeAspectRation?.split("")?.[2])
                  }
                  zoomWithScroll={true}
                  showGrid={true}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                />
              </div>
            </div>
            <div className="cropped-image-container">
              {croppedImage && (
                <img
                  className="cropped-image"
                  src={croppedImage}
                  alt="cropped"
                />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Form form={addBannerForm} onFinish={onAddBannerFormSUbmit}>
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {getBannerAddSectionLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item
                  label="Banner Type"
                  name="bannerType"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Banner Type !",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Banner Type"
                    onChange={(e) => {
                      setActiveBannerType(e);
                    }}
                  >
                    {bannerAddSection?.bannerTypes?.map((item) => {
                      return (
                        <Select.Option value={item.id} key={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {getBannerAddSectionLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Banner Name !",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Banner Name"
                  />
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {getBannerAddSectionLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item label="Banner Title" name="bannerTitle">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Banner Title"
                  />
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {getBannerAddSectionLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item label="Banner Subtitle" name="bannerSubtitle">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Banner Subtitle"
                  />
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {getBannerAddSectionLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item label="Url" name="url">
                  <Input placeholder="Banner Url" />
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {getBannerAddSectionLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item
                  label="Sort Order"
                  name="SortOrder"
                  rules={[
                    {
                      required: true,
                      message: "Please enter sort order",
                    },
                  ]}
                >
                  <Input placeholder="Sort Order" type="number" />
                </Form.Item>
              )}
            </div>
          </div>
          {/* <input type={"file"} /> */}
          <div
            className="col-md-12"
            style={{ marginTop: "3px", alignItems: "center" }}
          >
            {getBannerAddSectionLoading ? (
              <div className="form-group categoryField">
                <FormItemSkeleton />
              </div>
            ) : (
              <>
                <label className="control-label fw-bold">Add Image</label>
                <div className="App" style={{ width: "100%" }}>
                  <header className="App-header">
                    <label
                      className="_coverImage-holder"
                      style={{ color: "white" }}
                    >
                      <input
                        value={imageName}
                        ref={imageRef}
                        type="file"
                        name="cover"
                        onChange={handleImageUpload}
                        accept="img/*"
                        // style={{ display: "none" }}
                      />
                    </label>
                  </header>
                </div>
              </>
            )}
          </div>
          {croppedImage && (
            <img
              src={croppedImage}
              style={{ width: "200px", marginTop: "1rem" }}
            />
          )}
          {isFormSubmitted && !croppedImage && (
            <span style={{ color: "red" }}>Image is required !</span>
          )}
          {imageError && <span style={{ color: "red" }}>{imageError}</span>}

          <div className="col-md-12 col-lg-12 mt-3 ">
            {getBannerAddSectionLoading ? (
              <Skeleton width={100} height={40} inline={true} />
            ) : (
              <Button
                loading={addBannerLoading}
                type="primary"
                htmlType="submit"
                className="btn btn-primary all_btn rounded-0 me-2"
                onClick={() => {
                  setIsFormSubmitted(true);
                }}
              >
                Save
              </Button>
            )}
            {getBannerAddSectionLoading ? (
              <Skeleton width={100} height={40} />
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsAddBannerModalOpen(false);
                }}
                type="primary"
                className="btn btn-primary all_btn btn_red rounded-0"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </Form>
    </>
  );
};

export default AddBannerSettings;

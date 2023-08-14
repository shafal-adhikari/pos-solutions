/** @format */

import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import {
  createImage,
  getRadianAngle,
  rotateSize,
} from "../Settings/BannerSettings/crop";
import "../Settings/BannerSettings/style.css";
import { useDispatch, useSelector } from "react-redux";

const Email = ({ setIsEmailModalOpen, selectedGroups, setSizeFullModal }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState();
  const [imageError, setImageError] = useState();
  const [croppedImage, setCroppedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [finalImageFile, setFinalImageFile] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const { uploadMarketingMaterialLoading } = useSelector(
    (state) => state.loyaltyReducer
  );

  const imageRef = React.useRef();
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

  const submitHandler = (values) => {
    if (!croppedImage) {
      return;
    }
    let myDataform = new FormData();
    myDataform.append(
      "Request",
      JSON.stringify({
        Subject: values.subject,
        Message: values.message,
        GroupIds: selectedGroups,
      })
    );
    myDataform.append("Image", finalImageFile);
    dispatch({
      type: "UPLOAD_MARKETING_MATERIALS_REQUEST",
      payload: myDataform,
    });
  };
  const handleImageUpload = (e) => {
    setImageError(null);
    setImage(e.target.name);
    setImage(URL.createObjectURL(e.target.files[0]));
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

  useEffect(() => {
    form.setFieldValue(
      "message",
      "Thank you for your continued support. We would like to thank you by giving you this offer."
    );
  });

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
                  aspect={4 / 5}
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
      <div className="card col-md-5 card-body">
        <Form form={form} onFinish={submitHandler}>
          <div className="newsupplier_form">
            <div className="form-group categoryField">
              <Form.Item
                label="Subject"
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Please enter subject",
                  },
                ]}
              >
                <Input placeholder="Subject" />
              </Form.Item>
            </div>
            <div className="form-group categoryField">
              <div className=" pt-0">
                <Form.Item
                  label="Your Message"
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter message",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Message" rows={5} />
                </Form.Item>
              </div>
            </div>
          </div>

          <div
            className="col-md-12"
            style={{ marginTop: "3px", alignItems: "center" }}
          >
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
                      onChange={handleImageUpload}
                    />
                  </label>
                </header>
              </div>
            </>
          </div>
          {croppedImage && (
            <img
              src={croppedImage}
              style={{ marginTop: "1rem", width: "50%" }}
            />
          )}
          {isFormSubmitted && !croppedImage && (
            <span style={{ color: "red" }}>Image is required !</span>
          )}
          {imageError && <span style={{ color: "red" }}>{imageError}</span>}
          <div style={{ marginTop: "1rem" }}>
            <Button
              loading={uploadMarketingMaterialLoading}
              type="primary"
              htmlType="submit"
              className="btn btn-primary all_btn rounded-0 "
              onClick={() => {
                setIsFormSubmitted(true);
              }}
            >
              Send
            </Button>
            <Button
              className="ms-2"
              type="danger"
              onClick={() => {
                setIsEmailModalOpen(false);
                setSizeFullModal("lg");
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Email;

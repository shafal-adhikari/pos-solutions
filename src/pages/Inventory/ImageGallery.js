import { Alert, Button, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
function ImageGallery({
  images,
  files,
  setFiles,
  currentProductId,
  imagesUploadHandler,
}) {
  const [imageErrors, setImageErrors] = useState([]);
  const { uploadLoading, uploadSuccess } = useSelector(
    (state) => state.inventoryReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setFiles([]);
  }, [uploadSuccess]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxSize: "512000",
    onDrop: (acceptedFiles, rejectedFiles) => {
      let imageAllErrors = [];
      rejectedFiles.map((file) => {
        file.errors.map((error) => {
          imageAllErrors.push(`${file.file.name} size is larger than 500 kb`);
        });
      });

      setFiles((prevFiles) => {
        return [
          ...prevFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ];
      });
      setImageErrors(() => {
        return imageAllErrors;
      });
    },
  });
  const makeDefaultImageHandler = (id) => {
    dispatch({
      type: "CHANGE_DEFAULT_PRODUCT_IMAGE_REQUEST",
      payload: {
        id: id,
        productId: currentProductId,
      },
    });
  };
  const removeImageHandler = (id = null) => {
    if (id) {
      dispatch({
        type: "DELETE_PRODUCT_IMAGE_REQUEST",
        payload: [
          {
            id: id,
          },
        ],
        productId: currentProductId,
      });
    }
  };
  const prevImages = images?.map((file) => (
    <div style={thumb} key={file.id}>
      <Popconfirm
        onConfirm={() => makeDefaultImageHandler(file.id)}
        okText="Yes"
        cancelText="No"
        title="Are you sure you want to change this to default?"
      >
        <div style={thumbInner} className="image-thumb">
          <div
            className="btn remove item_btn rounded-circle align-self-end add-more1 ms-2 image-thumb-delete"
            type="button "
            onClick={() => removeImageHandler(file.id)}
          >
            <i className="fas fa-trash-alt " />
          </div>
          {file.isDefaultImage && (
            <span className="badge badge-success default-badge-image">
              Default
            </span>
          )}
          <img
            src={file.image}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.image);
            }}
          />
        </div>
      </Popconfirm>
    </div>
  ));
  const thumbs = files.map((file, i) => (
    <div style={thumb} key={file.name + i}>
      <div style={thumbInner} className="image-thumb">
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <section className="dropzone-container">
        <div
          {...getRootProps({
            className: "dropzone",
          })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>

        {imageErrors?.map((imageError, index) => {
          return (
            <Alert
              type="error"
              message={imageError}
              key={`imageError${index}`}
              className="image-upload-error"
            />
          );
        })}
        <div className="button-holder-gallery mt-2">
          {files.length > 0 && (
            <>
              <Button
                type="primary"
                loading={uploadLoading}
                onClick={() => {
                  setImageErrors([]);
                  imagesUploadHandler();
                }}
              >
                Upload
              </Button>
              <Button
                type="danger"
                className="ms-2"
                onClick={() => setFiles([])}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </section>
      <aside style={thumbsContainer}>{prevImages}</aside>
    </>
  );
}

export default ImageGallery;

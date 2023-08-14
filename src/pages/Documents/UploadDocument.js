import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";
import { AiFillEye } from "react-icons/ai";

const UploadDocument = ({ setOpen, editClicked, setIsEditClicked }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFile] = useState("");
  const [fileError, setFileError] = useState();
  const { editLoading, uploadDocumentSectionList, addLoading, editData } =
    useSelector((state) => state.employeeDocumentsReducer);
  const [filePreviewURL, setFilePreviewURL] = useState();
  const uploadDocumentHandler = (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append(
      "Request",
      JSON.stringify({
        ...values,
        id: editClicked && editData ? editData.id : "",
      })
    );
    formData.append("File", uploadedFile);
    dispatch({
      type: "CREATE_UPLOAD_DOCUMENT_REQUEST",
      payload: formData,
    });
  };
  useEffect(() => {
    // console.log(uploadedFile, "sadfasfa");
    if (uploadedFile) {
      let size = uploadedFile.size / 1024 / 1024;
      // console.log(size);
      // if (size > 5) {
      // setFileError("File size must be less than 5 mb");
      const objectUrl = URL.createObjectURL(uploadedFile);
      setFilePreviewURL(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
      // } else {
      //   console.log(uploadedFile);
      // }
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (editData && editClicked) {
      form.setFields([
        {
          name: "DocumentName",
          value: editData.documentName,
        },
        {
          name: "DocumentTypeId",
          value: editData.documentTypeId,
        },
        {
          name: "EmployeeId",
          value: editData.employeeId,
        },
      ]);
      setFilePreviewURL(editData.filePath);
    }
  }, [editData, editClicked]);
  return (
    <>
      <Form
        form={form}
        // onFinish={uploadDocumentHandler}
        initialValues={{
          isActive: true,
        }}
      >
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {editLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item
                  label="Document Name"
                  name="DocumentName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Name!",
                    },
                  ]}
                >
                  <Input placeholder="Document Name" />
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {editLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item
                  label="Document Type"
                  name="DocumentTypeId"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Document Type!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Document Type"
                    options={uploadDocumentSectionList?.documentTypes.map(
                      (documentType) => {
                        return {
                          label: documentType.value,
                          value: documentType.id,
                        };
                      }
                    )}
                  />
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {editLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item
                  label="Employee"
                  name="EmployeeId"
                  rules={[
                    {
                      required: true,
                      message: "Please select employee",
                    },
                  ]}
                >
                  <Select
                    placeholder="Employee"
                    options={uploadDocumentSectionList?.employees.map(
                      (documentType) => {
                        return {
                          label: documentType.value,
                          value: documentType.id,
                        };
                      }
                    )}
                  />
                </Form.Item>
              )}
            </div>
          </div>
          <div
            className="col-md-12"
            style={{ marginTop: "3px", alignItems: "center" }}
          >
            {editLoading ? (
              <div className="form-group categoryField">
                <FormItemSkeleton />
              </div>
            ) : (
              <>
                <div className="col-md-12">
                  <label className="control-label fw-bold mb-2">
                    Add Document
                    {filePreviewURL && (
                      <a href={filePreviewURL} target="_blank">
                        <AiFillEye
                          size={20}
                          color="#ff0017"
                          className="ms-1"
                          style={{ cursor: "pointer" }}
                          // onClick={() => setPreviewModalOpen(true)}
                        />
                      </a>
                    )}
                  </label>
                  <div className="file-drop-area ">
                    <span className="choose-file-button">Choose Files</span>
                    <span className="file-message">
                      {uploadedFile
                        ? uploadedFile.name
                        : "or drag and drop files here"}
                    </span>
                    <input
                      type="file"
                      className="file-input"
                      accept="application/pdf"
                      onChange={(e) => setUploadedFile(e.target.files[0])}
                    />
                  </div>
                  {fileError}
                </div>
              </>
            )}
          </div>
          <div className="col-md-12 col-lg-12 mt-3 ">
            {editLoading ? (
              <Skeleton width={100} height={40} inline={true} />
            ) : (
              <Button
                loading={addLoading}
                type="primary"
                onClick={() => {
                  form.validateFields().then(() => {
                    if (uploadedFile || editClicked) {
                      uploadDocumentHandler(form.getFieldsValue());
                    } else {
                      setFileError("Please upload file");
                    }
                  });
                }}
                className="btn btn-primary all_btn rounded-0 me-2"
              >
                Save
              </Button>
            )}
            {editLoading ? (
              <Skeleton width={100} height={40} />
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditClicked(false);
                  setOpen(false);
                }}
                type="danger"
                className="btn btn-primary all_btn btn_red rounded-0"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Form>
    </>
  );
};

export default UploadDocument;

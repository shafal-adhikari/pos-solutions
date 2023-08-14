import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormItemSkeleton from "../../../components/FormItemSkeleton/FormItemSkeleton";
import Skeleton from "react-loading-skeleton";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import htmlToDraft from "html-to-draftjs";
import DOMPurify from "dompurify";
const AddPageSettings = ({ setIsAddPageModalOpen, editClicked }) => {
  const [addPageSettings] = Form.useForm();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();
  const { isLoading, addLoading, editData, pagesSection } = useSelector(
    (state) => state.pageSettingsReducer
  );
  useEffect(() => {
    dispatch({
      type: "GET_PAGES_ADD_SECTION_LIST_REQUEST",
    });
  }, []);
  const onAddPopupFormSUbmit = (values) => {
    dispatch({
      type: "ADD_PAGE_REQUEST",
      payload: [
        {
          ...values,
          description: convertToHTML(editorState.getCurrentContent()),
          id: editClicked && editData ? editData.id : "",
        },
      ],
    });
  };
  useEffect(() => {
    if (editData && editClicked) {
      addPageSettings.setFields([
        {
          name: "pageId",
          value: editData.pageId,
        },
      ]);
      const descriptionData = convertFromHTML(
        DOMPurify.sanitize(editData.description)
      );
      const description = EditorState.createWithContent(descriptionData);
      setEditorState(description);
    }
  }, [editData, editClicked]);
  return (
    <>
      <Form
        form={addPageSettings}
        onFinish={onAddPopupFormSUbmit}
        initialValues={{
          isActive: true,
        }}
      >
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {isLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item
                  label="Page"
                  name="pageId"
                  rules={[
                    {
                      required: true,
                      message: "Please select page!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Page"
                    options={pagesSection?.map((page) => {
                      return {
                        value: page.id,
                        label: page.value,
                      };
                    })}
                  ></Select>
                </Form.Item>
              )}
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              {isLoading ? (
                <FormItemSkeleton />
              ) : (
                <Form.Item label="Description">
                  <Editor
                    editorClassName="ant-input productDescription"
                    placeholder="Description"
                    editorState={editorState}
                    onEditorStateChange={(state) => setEditorState(state)}
                  />
                </Form.Item>
              )}
            </div>
          </div>

          <div className="col-md-12 col-lg-12 mt-3 ">
            {isLoading ? (
              <Skeleton width={100} height={40} inline={true} />
            ) : (
              <Button
                loading={addLoading}
                type="primary"
                htmlType="submit"
                className="btn btn-primary all_btn rounded-0 me-2"
              >
                Save
              </Button>
            )}
            {isLoading ? (
              <Skeleton width={100} height={40} />
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsAddPageModalOpen(false);
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

export default AddPageSettings;

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";

const EditLanguage = ({ activeItem, setIsEditLanguageOpen }) => {
  const [addLanguageForm] = Form.useForm();
  const dispatch = useDispatch();
  const {
    isLoading,
    languageAddSection,
    addLanguageLoading,
    isOperatioSuccessful,
  } = useSelector((state) => state.superAdminReducer);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    dispatch({
      type: "GET_ADD_LANGUAGE_SECTION_REQUEST",
    });
  }, []);
  useEffect(() => {
    setEditingItem(activeItem);
  }, [activeItem]);

  const onAddLanguageFormSubmit = (values) => {
    // console.log("values", values);
    dispatch({
      type: "ADD_LANGUAGE_REQUEST",
      payload: {
        Id: editingItem.id,
        LanguageId: values.language,
        Field: values.field,
        English: values.english,
        Translated: values.translated,
      },
    });
  };

  return (
    <>
      <Form
        form={addLanguageForm}
        onFinish={onAddLanguageFormSubmit}
        fields={[
          {
            name: "field",
            value: editingItem?.field,
          },
          {
            name: "language",
            value: languageAddSection?.languages?.filter(
              (item) => item.name == editingItem?.language
            )?.[0]?.id,
          },
          {
            name: "english",
            value: editingItem?.english,
          },
          {
            name: "translated",
            value: editingItem?.translated,
          },
        ]}
      >
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              <Form.Item
                label="Language"
                name="language"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Language !",
                  },
                ]}
              >
                <Select placeholder="Select Language">
                  {languageAddSection?.languages?.map((item) => {
                    return (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              <Form.Item
                label="Field"
                name="field"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Field !",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Field"
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              <Form.Item
                label="English"
                name="english"
                rules={[
                  {
                    required: true,
                    message: "Please Enter English !",
                  },
                ]}
              >
                <Input placeholder="English" />
              </Form.Item>
            </div>
          </div>
          <div className="col-md-12" style={{ marginBottom: "-6px" }}>
            <div className="form-group categoryField">
              <Form.Item
                label="Translated"
                name="translated"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Translated !",
                  },
                ]}
              >
                <Input type="text" placeholder="Translated" />
              </Form.Item>
            </div>
          </div>

          {/* <input type={"file"} /> */}

          <div className="col-md-12 col-lg-12 mt-3">
            <Button
              htmlType="submit"
              type="primary"
              loading={addLanguageLoading}
              className="btn btn-primary all_btn rounded-0"
              style={{ marginRight: "5px" }}
            >
              Save
            </Button>
            <button
              type="button"
              onClick={() => {
                setIsEditLanguageOpen(false);
              }}
              className="btn btn-primary all_btn btn_red rounded-0"
            >
              Cancel
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default EditLanguage;

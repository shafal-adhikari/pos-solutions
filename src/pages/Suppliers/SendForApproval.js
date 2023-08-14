import { Button, Checkbox, Form, Input, Select, Switch } from "antd";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";

function SendForApproval({
  isOpen,
  setIsOpen,
  subject,
  submitHandler,
  mailSender,
}) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (mailSender) {
      form.setFieldValue("EmailFrom", mailSender);
    }
    if (subject) {
      form.setFieldValue("Subject", subject);
    }
  }, [mailSender, subject]);
  return (
    <Modal
      show={isOpen}
      size="md"
      backdrop="static"
      onHide={() => setIsOpen(false)}
      className="categoryField"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "20px" }}>
          Send For Approval
        </Modal.Title>
      </Modal.Header>
      <Form form={form} onFinish={submitHandler}>
        <Modal.Body>
          <div className="newsupplier_form">
            <div className="form-group">
              <Form.Item
                label="From"
                name="EmailFrom"
                rules={[
                  {
                    required: true,
                    message: "Please enter sender email",
                  },
                ]}
              >
                <Input placeholder="From" readOnly />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item
                label="To"
                name="EmailTo"
                rules={[
                  {
                    required: true,
                    message: "Please enter receiver email",
                  },
                ]}
              >
                <Select mode="tags" placeholder="To" notFoundContent={null} />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item label="CC" name="EmailCC">
                <Select mode="tags" placeholder="CC" notFoundContent={null} />
              </Form.Item>
            </div>
          </div>
          <div className="bank_details email_details">
            {/* <h5>Message</h5> */}
            <div className="form-group">
              <div className=" pt-0">
                <Form.Item label="Subject" name="Subject">
                  <Input placeholder="Subject" readOnly />
                </Form.Item>
              </div>
            </div>
            <div className="form-group">
              <div className=" pt-0">
                <Form.Item
                  label="Your Message"
                  name="Message"
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
          <div className="d-flex justify-content-between">
            <div className="form-check pt-2 ps-0 ">
              <Form.Item
                valuePropName="checked"
                name="IsSendMail"
                className="m-0"
              >
                <Checkbox>Send Email and save</Checkbox>
              </Form.Item>
              {/* <input
                className="form-check-input mt-2"
                type="checkbox"
                defaultValue=""
                id="defaultCheck1"
              />
              <label className="form-check-label" htmlFor="defaultCheck1">
                Do not send Email and save
              </label> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="primary"
            htmlType="submit"
            className="btn btn-primary all_btn rounded-0"
          >
            Send
          </Button>
          <Button type="danger" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default SendForApproval;

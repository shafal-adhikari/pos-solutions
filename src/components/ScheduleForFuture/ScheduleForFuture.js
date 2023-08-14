import { Button, DatePicker, Form } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { dayjs } from "../../helpers/frontendHelper";
function ScheduleForFuture({ addHandler, isOpen, setOpen }) {
  const [currentDate, setCurrentDate] = useState(dayjs().add(1, "day"));
  const disablePreviousDates = (current) => {
    return current && current < dayjs().endOf("day");
  };
  const { addLoading } = useSelector((state) => state.giftCardReducer);
  const {
    activeStore: { dateFormat },
  } = useSelector((state) => state.authenticationReducer);
  return (
    <Modal show={isOpen} centered>
      <Modal.Header className="modal-header  ">
        <h5 className="modal-title" id="futureschedulemodalLabel">
          Schedule for Future
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setOpen(false)}
        />
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form>
          <div className="row categoryField">
            <div className="col-md-12 col-lg-12">
              <div className="form-group w-100">
                <Form.Item label="Date" className="w-100">
                  <DatePicker
                    className="w-100"
                    value={currentDate}
                    format={dateFormat.split(" ")[0].toUpperCase()}
                    disabledDate={disablePreviousDates}
                    onChange={(date) => setCurrentDate(date)}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer justify-content-start">
        <Button
          type="primary"
          loading={addLoading}
          className="btn btn-primary all_btn rounded-0"
          data-bs-dismiss="modal"
          onClick={() => {
            addHandler(
              dayjs(currentDate).format(dateFormat.split(" ")[0].toUpperCase())
            );
          }}
        >
          Schedule
        </Button>
        <button
          type="button"
          className="btn btn-danger rounded-0"
          onClick={() => {
            setCurrentDate(new Date());
            setOpen(false);
          }}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ScheduleForFuture;

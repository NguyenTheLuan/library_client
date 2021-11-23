import React from "react";
import { Button, Modal } from "react-bootstrap";
import CheckBooks from "../CheckBooks/CheckBooks";

function ModalCheckBooks({ userId, isShow, onShow }) {
  const handleClose = () => {
    onShow(false);
  };
  const handleShow = (show) => {
    // console.log("trạng thái lấy được", show);
    return onShow(show);
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Kiểm tra thông tin sách</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CheckBooks userId={userId} onHandleShow={handleShow} />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default ModalCheckBooks;

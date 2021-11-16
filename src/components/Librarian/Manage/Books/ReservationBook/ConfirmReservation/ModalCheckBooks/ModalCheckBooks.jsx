import React from "react";
import { Modal, Button } from "react-bootstrap";
import CheckCopies from "../CheckCopies/CheckCopies";

function ModalCheckBooks({ userId, isShow, onShow }) {
  const handleClose = () => {
    return onShow(false);
  };
  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Kiểm tra thông tin sách</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CheckCopies userId={userId} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Quay lại
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCheckBooks;

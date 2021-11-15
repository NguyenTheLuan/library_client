import React from "react";
import productsApi from "apis/productsApi";
import { Modal, Button } from "react-bootstrap";

import "./ModalHandle.scss";

function ModalIncreaseBooks({ isShow, onShow, bookName, bookId }) {
  const handleClose = () => {
    return onShow(false);
  };

  const handleIncreaseBook = async () => {
    try {
      await productsApi.postCopies(bookId);
      onShow(false);
      alert("Thêm sách thành công");
    } catch (error) {
      console.log("lỗi rồi");
    }
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Tăng số lượng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Xác nhận số lượng cho <strong> {bookName}</strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleIncreaseBook}>
          Tăng số lượng
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Quay lại
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalIncreaseBooks;

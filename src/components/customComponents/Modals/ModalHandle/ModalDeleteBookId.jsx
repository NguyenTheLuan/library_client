import productsApi from "apis/productsApi";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteBookById } from "reducers/bookSlice";

import "./ModalHandle.scss";

function ModalDeleteBookId({ isShow, bookId, onShow, bookName }) {
  //Delete books by id
  const dispatch = useDispatch();
  const deleteBookId = async () => {
    const id = bookId;
    // console.log(id);
    try {
      await productsApi.postDeleteBookById(id);
      alert("Xoá thành công");
      dispatch(deleteBookById(id));
      // console.log("Thành công");

      onShow(false);
    } catch (error) {
      console.log("có lỗi", { error });
    }
  };
  const handleClick = () => {
    // console.log("đã lấy được Id", bookId);
    deleteBookId();
  };

  //Thiết lập cho cha
  const handleClose = () => {
    return onShow(false);
  };
  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Tiến hành xoá sách</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Xoá sách có tên là
        <strong> {bookName}</strong>, bạn có chắc chắn xoá không?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClick}>
          Xoá sách
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Quay lại
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteBookId;

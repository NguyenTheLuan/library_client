import productsApi from "apis/productsApi";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteBookById } from "reducers/bookSlice";
import "./Modals.scss";
function ModalDeleteBookId({ isShow, bookId, onShow, title, body }) {
  //Delete books by id
  const dispatch = useDispatch();
  const deleteBookId = async () => {
    const id = bookId;
    // console.log(id);
    try {
      await productsApi.postDeleteBookById(id);
      dispatch(deleteBookById(id));
      console.log("Thành công");
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
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
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

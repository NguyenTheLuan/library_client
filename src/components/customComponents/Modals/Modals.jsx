import productsApi from "apis/productsApi";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteBookById } from "reducers/bookSlice";
function Modals({ isShow, onShow, bookId, title, body }) {
  //   console.log("con nhận show từ cha", onShow());
  //Modal
  //show modal
  const [show, setShow] = useState(false);

  //Delete books by id
  const dispatch = useDispatch();
  const deleteBookId = async () => {
    const id = bookId;
    console.log(id);
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
        <Button onClick={handleClose}>Huỷ</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals;

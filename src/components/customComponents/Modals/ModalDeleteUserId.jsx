import adminApi from "apis/adminApi";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./Modals.scss";
function ModalDeleteUserId({ userId, isShow, onShow, title, body }) {
  //Delete books by id
  const deleteUserId = async () => {
    const id = userId;
    // console.log(id);
    try {
      await adminApi.deleteUser(id);
      alert("Xoá người dùng hoàn tất");
      onShow(false);
    } catch (error) {
      console.log("có lỗi", { error });
    }
  };
  const handleClick = () => {
    console.log("đã lấy được Id", userId);
    deleteUserId();
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
          Xoá người dùng
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Quay lại
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteUserId;

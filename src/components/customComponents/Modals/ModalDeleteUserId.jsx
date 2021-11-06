import adminApi from "apis/adminApi";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteUserById } from "reducers/userSlice";
import "./Modals.scss";
function ModalDeleteUserId({ userId, isShow, onShow, title, body }) {
  const dispatch = useDispatch();

  //Delete books by id
  const deleteUserId = async () => {
    const id = userId;
    // console.log(id);
    try {
      await adminApi.deleteUser(id);
      alert("Xoá người dùng hoàn tất");
      //reset lại user
      dispatch(deleteUserById());
      onShow(false);
    } catch (error) {
      console.log("có lỗi", { error });
    }
  };
  const handleClick = () => {
    // console.log("đã lấy được Id", userId);
    deleteUserId();
  };

  //Thiết lập cho cha
  const handleClose = () => {
    return onShow(false);
  };
  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
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

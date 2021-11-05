import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Modals.scss";

function ModalUpdateUserInfo({ isShow, onShow, userId }) {
  //Thiết lập cho cha
  const handleClose = () => {
    return onShow(false);
  };

  const handleClick = () => {
    console.log("cập nhật thông tin cho user có id: ", userId);
  };

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header>
          <span className="title">Thay đổi thông tin người dùng</span>
          <span className="note">(Chỉ nhập thông tin cần thay đổi)</span>
        </Modal.Header>
        <Modal.Body>
          <Form className="formMenu">
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">
                Tên người dùng
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên người dùng"
                className="formMenu_items_control"
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập địa chỉ email"
                className="formMenu_items_control"
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Mật Khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                className="formMenu_items_control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClick}>
            Thay đổi thông tin
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Quay lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUserInfo;

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Modals.scss";

function ModalUpdateUserInfo({ isShow, onShow, userInfo }) {
  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);
  const [password, setPassword] = useState("");
  //Thiết lập cho cha
  const handleClose = () => {
    return onShow(false);
  };

  const handleClick = () => {
    console.log("cập nhật thông tin cho user có id: ", userInfo);
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
              <Form.Label className="formMenu_items_label">Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Nhập địa chỉ email"
                className="formMenu_items_control"
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">
                Tên người dùng
              </Form.Label>
              <Form.Control
                value={name}
                type="text"
                placeholder="Nhập tên người dùng"
                className="formMenu_items_control"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Mật Khẩu</Form.Label>
              <Form.Control
                value={password}
                type="password"
                placeholder="Nhập mật khẩu"
                className="formMenu_items_control"
                onChange={(e) => setPassword(e.target.password)}
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

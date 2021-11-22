import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import adminApi from "apis/adminApi";
import "./ModalsForm.scss";

function ModalUpdateUserInfo({ isShow, onShow, userInfo }) {
  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);
  const [status, setStatus] = useState(userInfo.status);
  const [password, setPassword] = useState(null);
  const [show, setShow] = useState(false);

  //Thiết lập cho cha
  const handleClose = () => {
    return onShow(false);
  };

  useEffect(() => {
    handlePassWord();
  }, [password]);

  const handlePassWord = () => {
    if (password) {
      return { password: password };
    } else {
      return null;
    }
  };

  const updateUserInfo = async () => {
    //id user
    const userId = userInfo.id;
    const password = handlePassWord();
    //data update
    const bookInfo = {
      name: name,
      email: email,
      status: status,
      ...password,
    };

    try {
      await adminApi.updateUser(userId, bookInfo);

      alert("Cập nhật thông tin người dùng thành công");
      onShow(false);
    } catch (error) {
      console.log("lỗi", { error });
      alert(error.response.data.message);
      onShow(false);
    }
  };

  const handleClick = () => {
    // console.log("update user", userInfo.id, { password, status, name });
    updateUserInfo();
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
            {/* Email */}
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                // placeholder="Nhập địa chỉ email"
                className="formMenu_items_control"
                // onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </Form.Group>
            {/* UserName */}
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
            {/* status */}
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">
                Trạng thái
              </Form.Label>
              <Form.Select
                value={status}
                name="status"
                className="formMenu_items_checkbox"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="inactive">Không kích hoạt</option>
                <option value="active">Kích hoạt</option>
              </Form.Select>
            </Form.Group>
            {/* Password */}
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Mật Khẩu</Form.Label>
              <Form.Control
                value={password}
                type="password"
                placeholder="Nhập mật khẩu"
                className="formMenu_items_control"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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

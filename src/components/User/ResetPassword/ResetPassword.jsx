import userApi from "apis/userApi";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function ResetPassword() {
  document.title = "Thay đổi mật khẩu";

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const resetPassword = async () => {
    try {
      await userApi.updateInfo({
        password: password,
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log(password, passwordConfirm);
  };
  return (
    <div>
      <Form className="form" onSubmit={handleResetPassword}>
        <legend className="form_name">Thay Đổi Mật Khẩu</legend>
        <Form.Group className="mb-3 form_items">
          <Form.Label className="form_items_label">
            Mật khẩu hiện tại
          </Form.Label>
          <Form.Control
            className="form_items_input"
            name="title"
            type="text"
            placeholder="Nhập mật khẩu hiện tại"
          />
        </Form.Group>
        <Form.Group className="mb-3 form_items">
          <Form.Label className="form_items_label">
            Nhập mật khẩu mới
          </Form.Label>
          <Form.Control
            className="form_items_input"
            name="title"
            type="text"
            placeholder="Nhập mật khẩu mới"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 form_items">
          <Form.Label className="form_items_label">
            Nhập lại mật khẩu mới
          </Form.Label>
          <Form.Control
            className="form_items_input"
            name="title"
            type="text"
            placeholder="Xác nhận đúng mật khẩu mới"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Thay đổi mật khẩu
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;

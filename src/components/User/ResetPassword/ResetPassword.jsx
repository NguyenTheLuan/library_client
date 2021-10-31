import React from "react";
import { Button, Form } from "react-bootstrap";

function ResetPassword() {
  const handleResetPassword = (e) => {
    e.preventDefault();
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
            Xác nhập lại mật khẩu
          </Form.Label>
          <Form.Control
            className="form_items_input"
            name="title"
            type="text"
            placeholder="Xác nhận đúng mật khẩu hiện tại"
          />
        </Form.Group>
        <Form.Group className="mb-3 form_items">
          <Form.Label className="form_items_label">Mật khẩu mới</Form.Label>
          <Form.Control
            className="form_items_input"
            name="title"
            type="text"
            placeholder="Nhập mật khẩu mới"
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

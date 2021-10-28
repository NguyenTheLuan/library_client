import React from "react";
import { Form, Button } from "react-bootstrap";
import "components/Admin/Manage/ManageForm.scss";
function CreateUser() {
  return (
    <Form className="form">
      <legend>Tạo người dùng mới</legend>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Tên người dùng</Form.Label>
        <Form.Control
          className="form_items_input"
          name="name"
          type="text"
          placeholder="Nhập tên người dùng"
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Địa chỉ email</Form.Label>
        <Form.Control
          className="form_items_input"
          name="email"
          type="email"
          placeholder="Nhập địa chỉ email"
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">
          Mật khẩu người dùng
        </Form.Label>
        <Form.Control
          className="form_items_input"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu người dùng"
        />
      </Form.Group>
      <Button type="submit">Tạo người dùng mới</Button>
    </Form>
  );
}

export default CreateUser;

import React from "react";
import { Form, Button } from "react-bootstrap";
import "components/Admin/Manage/ManageForm.scss";
function CreateUser() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Form className="form" onSubmit={handleSubmit}>
      <legend className="form_name">Tạo người dùng mới</legend>
      <Form.Group className="mb-3 form_items"></Form.Group>
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

      <div className="btnSubmit">
        <Button type="submit" variant="primary">
          Tạo người dùng mới
        </Button>
        <Button variant="warning">Nhập lại</Button>
      </div>
    </Form>
  );
}

export default CreateUser;

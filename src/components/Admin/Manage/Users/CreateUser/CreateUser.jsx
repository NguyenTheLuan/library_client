import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "components/Admin/Manage/ManageForm.scss";
import adminApi from "apis/adminApi";

function CreateUser() {
  const [userCreate, setUserCreate] = useState({});
  const [error, setError] = useState("");

  const createUser = async () => {
    const infoUser = { ...userCreate };
    try {
      await adminApi.createUser(infoUser);
      setError("Tạo user thành công");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userCreate);
    createUser();
  };
  return (
    <Form className="form" onSubmit={handleSubmit}>
      {error && <h2>{error}</h2>}
      <legend className="form_name">Tạo người dùng mới</legend>
      <Form.Group className="mb-3 form_items"></Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Tên người dùng</Form.Label>
        <Form.Control
          className="form_items_input"
          name="name"
          type="text"
          placeholder="Nhập tên người dùng"
          onChange={(e) =>
            setUserCreate({ ...userCreate, [e.target.name]: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Chức vụ</Form.Label>
        <Form.Control
          className="form_items_input"
          name="role"
          type="text"
          placeholder="user, librarian???"
          onChange={(e) =>
            setUserCreate({ ...userCreate, [e.target.name]: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Địa chỉ email</Form.Label>
        <Form.Control
          className="form_items_input"
          name="email"
          type="email"
          placeholder="Nhập địa chỉ email"
          onChange={(e) =>
            setUserCreate({ ...userCreate, [e.target.name]: e.target.value })
          }
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
          onChange={(e) =>
            setUserCreate({ ...userCreate, [e.target.name]: e.target.value })
          }
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

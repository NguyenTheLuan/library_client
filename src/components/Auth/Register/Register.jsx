import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../StyleForm.scss";
function Register() {
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("abc");
    setErr("ok");
  };
  return (
    <div className="formMain">
      <div className="formMain_container">
        <Form className="formMenu" onSubmit={handleSubmit}>
          <legend className="formMenu_title">Đăng ký tài khoản</legend>
          <Form.Group className="mb-3 formMenu_items" controlId="formBasicName">
            <Form.Label className="mb-3 formMenu_items_name">
              Tên người dùng
            </Form.Label>
            <Form.Control
              name="name"
              className="mb-3 formMenu_items_value"
              type="text"
              placeholder="Nhập tên người dùng"
            />
          </Form.Group>

          <Form.Group
            className="mb-3 formMenu_items"
            controlId="formBasicEmail"
          >
            <Form.Label className="mb-3 formMenu_items_name">
              Địa chỉ email
            </Form.Label>
            <Form.Control
              name="email"
              className="mb-3 formMenu_items_value"
              type="email"
              placeholder="Nhập địa chỉ email"
            />
          </Form.Group>
          <Form.Group
            className="mb-3 formMenu_items"
            controlId="formBasicPassword"
          >
            <Form.Label className="mb-3 formMenu_items_name">
              Mật khẩu
            </Form.Label>
            <Form.Control
              className="mb-3 formMenu_items_value"
              type="password"
              placeholder="Nhập Mật Khẩu"
            />
          </Form.Group>
          <div className=" mb-3 formMenu_items_link">
            <p>{err && <span>{err}</span>}</p>
          </div>
          {/* <Form.Group className="mb-3 formMenu_items" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Duy Trì Đăng Nhập" />
      </Form.Group> */}
          <Button className="mb-3 formMenu_btn" variant="success" type="submit">
            Đăng Ký Tài Khoản
          </Button>
          <div className="formMenu_extraLinks">
            <Link to="/login">Quay Trở Lại Đăng Nhập</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;

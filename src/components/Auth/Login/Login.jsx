import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../StyleForm.scss";

function Login() {
  const [userLogin, setUserLogin] = useState({});
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("nhập email và mk");
  };

  return (
    <div className="formMain">
      <div className="formMain_container">
        <Form className="formMenu" onSubmit={handleSubmit}>
          <legend className="formMenu_title">Đăng nhập tài khoản</legend>
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
              onChange={(e) =>
                setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
              }
            />
            {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
          </Form.Group>

          <Form.Group
            className="mb-3 formMenu_items"
            controlId="formBasicPassword"
          >
            <Form.Label className="mb-3 formMenu_items_name">
              Mật khẩu
            </Form.Label>
            <Form.Control
              name="password"
              className="mb-3 formMenu_items_value"
              type="password"
              placeholder="Nhập Mật Khẩu"
              onChange={(e) =>
                setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <div className=" mb-3 formMenu_items_link">
            <p>{err && <span>{err}</span>}</p>
            <Link to="forgot-password">Quên mật khẩu?</Link>
          </div>
          <Form.Group
            className="mb-3 formMenu_items"
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Duy Trì Đăng Nhập" />
          </Form.Group>
          <Button
            className=" mb-3 formMenu_btn"
            variant="primary"
            type="submit"
          >
            Đăng Nhập
          </Button>
          <div className="formMenu_extraLinks">
            <Link to="/register">Bạn chưa có tài khoản?</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

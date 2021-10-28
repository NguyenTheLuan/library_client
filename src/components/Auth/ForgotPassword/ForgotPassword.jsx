import React, { useState } from "react";
import accountApi from "apis/authApi";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import "../StyleForm.scss";

function ForgotPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const Forgot_Password = async () => {
    const dataResetPassword = { ...email };
    try {
      await accountApi.postForgotPasword(dataResetPassword);
      setErr("Lấy mật khẩu thành công, vui lòng kiểm tra email");
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Forgot_Password();
  };

  return (
    <div className="formMain">
      <div className="formMain_container">
        <Form className="formMenu" onSubmit={handleSubmit}>
          <div
            className="mb-3 formMenu_title"
            onClick={() => history.push("/home")}
          >
            <AiOutlineHome className="icon" />
            <legend className="title">Quên mật khẩu</legend>
          </div>
          <Form.Group className="mb-3 formMenu_items" controlId="formBasicName">
            <Form.Label className="mb-3 formMenu_items_name">
              Địa chỉ email
            </Form.Label>
            <Form.Control
              name="email"
              className="mb-3 formMenu_items_value"
              type="email"
              placeholder="Nhập địa chỉ email đăng ký tài khoản"
              onChange={(e) => setEmail({ [e.target.name]: e.target.value })}
            />
          </Form.Group>
          <div className=" mb-3 formMenu_items_link">
            <p>
              {err && (
                <span>
                  {err} <Link to="/login">Quay Lại Đăng Nhập?</Link>
                </span>
              )}
            </p>
          </div>
          <div className="formMenu_extraLinks">
            <Button
              className="turnBack"
              variant="light"
              onClick={() => history.push("/login")}
            >
              Quay Lại
            </Button>
            <Button className="forgotPassword" variant="primary" type="submit">
              Lấy lại mật khẩu
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;

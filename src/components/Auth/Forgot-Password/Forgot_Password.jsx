import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import "../StyleForm.scss";
function Forgot_Password() {
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("ok");
  };
  const handleTurnBack = () => {
    history.push("/login");
  };
  return (
    <div className="formMain">
      <div className="formMain_container">
        <Form className="formMenu" onSubmit={handleSubmit}>
          <legend className="formMenu_title">Quên mật khẩu</legend>
          <Form.Group className="mb-3 formMenu_items" controlId="formBasicName">
            <Form.Label className="mb-3 formMenu_items_name">
              Địa chỉ email
            </Form.Label>
            <Form.Control
              name="email"
              className="mb-3 formMenu_items_value"
              type="text"
              placeholder="Nhập địa chỉ email đăng ký tài khoản"
            />
          </Form.Group>
          <div className="formMenu_extraLinks">
            <Button
              className="turnBack"
              variant="light"
              onClick={handleTurnBack}
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

export default Forgot_Password;

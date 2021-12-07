import accountApi from "apis/authApi";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

function RenewPassword() {
  document.title = "Lấy lại mật khẩu";

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [err, setErr] = useState("");

  const history = useHistory();
  const location = useLocation();

  const tokenActive = new URLSearchParams(location.search).get("token");
  //   console.log("có chạy r", tokenActive);
  //   useEffect(() => {
  //     activePassword();
  //   }, []);

  const resetPassword = async (password) => {
    const params = { password: password };
    try {
      await accountApi.postResetPasword(tokenActive, params);
      setErr("Lấy lại mật khẩu thành công");
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password || !passwordConfirm) {
      setErr("Mật khẩu không được bỏ trống");
    } else if (password !== passwordConfirm) {
      setErr("Mật khẩu xác nhận không chính xác");
    } else {
      resetPassword(password);
    }
  };

  return (
    <div className="formMain">
      <div className="formMain_container">
        <Form className="formMenu" onSubmit={handleResetPassword}>
          <legend className="form_name">Thay Đổi Mật Khẩu</legend>
          <Form.Group className="mb-3 formMenu_items">
            <Form.Label className="formMenu_items_name">
              Nhập mật khẩu mới
            </Form.Label>
            <Form.Control
              className="formMenu_items_value"
              name="title"
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 formMenu_items">
            <Form.Label className="formMenu_items_name">
              Nhập lại mật khẩu mới
            </Form.Label>
            <Form.Control
              className="formMenu_items_value"
              name="title"
              type="password"
              placeholder="Xác nhận đúng mật khẩu mới"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
          <Button type="submit" variant="success" style={{ width: "100%" }}>
            Thay đổi mật khẩu
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RenewPassword;

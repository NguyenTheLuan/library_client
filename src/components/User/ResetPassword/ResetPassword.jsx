import userApi from "apis/userApi";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/authSlice";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  document.title = "Thay đổi mật khẩu";

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const isUser = useSelector(selectUser);
  //Custom alert
  const notify = (status, info) =>
    toast[status](info, { position: toast.POSITION.BOTTOM_LEFT });

  const resetPassword = async () => {
    const userId = isUser.id;
    const params = { password: password };
    try {
      await userApi.userUpdateInfo(userId, params);
      notify("success", "Thay đổi thành công");
      // console.log("thành công");
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  const resetValue = () => {
    setPassword("");
    setPasswordConfirm("");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password || !passwordConfirm) {
      notify("warn", "Không được bỏ trống");
    } else if (password !== passwordConfirm) {
      notify("warn", "Mật khẩu xác nhận không chính xác");
    } else {
      resetPassword();
      resetValue();
    }
  };
  return (
    <>
      <div>
        <Form className="form" onSubmit={handleResetPassword}>
          <legend className="form_name">Thay Đổi Mật Khẩu</legend>
          {/* <Form.Group className="mb-3 form_items">
          <Form.Label className="form_items_label">
            Mật khẩu hiện tại
          </Form.Label>
          <Form.Control
            className="form_items_input"
            name="title"
            type="text"
            placeholder="Nhập mật khẩu hiện tại"
          />
        </Form.Group> */}
          <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">
              Nhập mật khẩu mới
            </Form.Label>
            <Form.Control
              className="form_items_input"
              name="title"
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={password}
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
              type="password"
              placeholder="Xác nhận đúng mật khẩu mới"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Thay đổi mật khẩu
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
}

export default ResetPassword;

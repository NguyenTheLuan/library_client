import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import accountApi from "apis/authApi";
import { useDispatch } from "react-redux";
import { loginIn } from "reducers/userSlice";

import { AiOutlineHome } from "react-icons/ai";
import "../StyleForm.scss";

function Register() {
  const [userRegister, setUserRegister] = useState({});
  const [err, setErr] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const Register = async () => {
    const dataRegister = { ...userRegister };
    try {
      const response = await accountApi.postRegister(dataRegister);
      // console.log("đăng kí thành công", response);
      //Trả về user, access-token, refresh token
      const { user, tokens } = response;
      const { access, refresh } = tokens;
      //Chuyển vào redux store
      dispatch(loginIn(user));
      //Lưu vào local-storage
      user && localStorage.setItem("user", JSON.stringify(user));
      access && localStorage.setItem("access", JSON.stringify(access));
      refresh && localStorage.setItem("refresh", JSON.stringify(refresh));

      setErr("Đăng kí thành công");
      history.push("/");
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Register();
  };
  return (
    <div className="formMain">
      <div className="formMain_container">
        <Form className="formMenu" onSubmit={handleSubmit}>
          <div className="mb-3 formMenu_title">
            <AiOutlineHome
              className="icon"
              onClick={() => history.push("/home")}
            />
            <legend className="title">Đăng ký tài khoản</legend>
          </div>

          <Form.Group className="mb-3 formMenu_items" controlId="formBasicName">
            <Form.Label className="mb-3 formMenu_items_name">
              Tên người dùng
            </Form.Label>
            <Form.Control
              name="name"
              className="mb-3 formMenu_items_value"
              type="text"
              placeholder="Nhập tên người dùng"
              onChange={(e) =>
                setUserRegister({
                  ...userRegister,
                  [e.target.name]: e.target.value,
                })
              }
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
              onChange={(e) =>
                setUserRegister({
                  ...userRegister,
                  [e.target.name]: e.target.value,
                })
              }
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
              name="password"
              className="mb-3 formMenu_items_value"
              type="password"
              placeholder="Nhập Mật Khẩu"
              onChange={(e) =>
                setUserRegister({
                  ...userRegister,
                  [e.target.name]: e.target.value,
                })
              }
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

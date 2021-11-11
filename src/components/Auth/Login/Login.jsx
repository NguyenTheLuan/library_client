import accountApi from "apis/authApi";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
//redux
import { loginIn } from "reducers/authSlice";
import "../StyleForm.scss";

function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "admin@gmail.com",
    password: "12345678",
  });
  const [err, setErr] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const Login = async () => {
    const dataLogin = { ...userLogin };
    try {
      const response = await accountApi.postLogin(dataLogin);
      // console.log("success", response);
      //Trả về user, access-token, refresh token
      const { user, tokens } = response;
      const { access, refresh } = tokens;
      //Lưu vào local-storage
      user && localStorage.setItem("user", JSON.stringify(user));
      access && localStorage.setItem("access", JSON.stringify(access));
      refresh && localStorage.setItem("refresh", JSON.stringify(refresh));
      setErr("Đăng Nhập Thành Công");
      //Chuyển vào redux store
      dispatch(loginIn(user));
      //admin or user?
      user && checkRoute(user);
    } catch (error) {
      console.log("err", { error });
      // setErr(error.response.data.message);
    }
  };

  const checkRoute = (user) => {
    if (user.role === "admin") {
      history.push("/admin");
    } else if (user.role === "user") {
      history.push("/");
    } else if (user.role === "librarian") {
      history.push("/librarian");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login();
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
            <legend className="title">Đăng nhập tài khoản</legend>
          </div>
          <Form.Group
            className="mb-3 formMenu_items"
            controlId="formBasicEmail"
          >
            <Form.Label className="mb-3 formMenu_items_name">
              Địa chỉ email
            </Form.Label>
            <Form.Control
              value={userLogin.email}
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
              value={userLogin.password}
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

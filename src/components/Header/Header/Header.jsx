// import LogoMenu from "assets/icons/LogoMenu.gif";
import LogoMenu from "assets/icons/logo.png";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { BsFillPersonFill } from "react-icons/bs";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "reducers/userSlice";
import Logout from "components/Auth/Logout/Logout";

function Header() {
  const history = useHistory();
  const isUser = useSelector(selectUser);

  const checkBtn = () => {
    if (isUser) {
      return (
        <div className="header_btn">
          <span className="nameUser">Xin chào, {isUser.name}</span>
          <Logout />
        </div>
      );
    } else {
      return (
        <div className="header_btn" onClick={() => history.push("/login")}>
          <span>
            <BsFillPersonFill className="icon" />
          </span>
          <Button variant="primary">Đăng Nhập</Button>
        </div>
      );
    }
  };

  return (
    <div className="header">
      <div className="header_logo">
        <Link exact={true} to="/home">
          <img alt="logoMenu" src={LogoMenu} />
          <span>Geny Library</span>
        </Link>
      </div>
      <div className="header_search">
        <Form.Group className="header_search_form">
          <Form.Label className="formLabel"></Form.Label>
          <Form.Control
            className="formInput"
            type="input"
            placeholder="Nhập tên sách bạn muốn tìm"
          ></Form.Control>
          <Button className="formSearch">
            <GoSearch />
            Tìm kiếm
          </Button>
        </Form.Group>
      </div>
      {/* <div className="header_btn" onClick={() => history.push("/login")}>
        <span>
          <BsFillPersonFill className="icon" />
        </span>
        <Button variant="primary">Đăng Nhập</Button>
      </div> */}
      {checkBtn()}
    </div>
  );
}

export default Header;

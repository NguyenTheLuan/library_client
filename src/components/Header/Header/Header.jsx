// import LogoMenu from "assets/icons/LogoMenu.gif";
import LogoMenu from "assets/icons/logo.png";
import Logout from "components/Auth/Logout/Logout";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { selectUser } from "reducers/userSlice";
import "./Header.scss";

function Header() {
  const history = useHistory();
  const isUser = useSelector(selectUser);

  const showName = (name) => {
    const getName = name.split(" ");
    return getName[getName.length - 1];
  };

  const checkBtn = () => {
    if (isUser && isUser.status === "active") {
      return (
        <div className="header_btn">
          <span className="nameUser">Xin chào, {showName(isUser.name)}</span>
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
      {checkBtn()}
    </div>
  );
}

export default Header;

import LogoMenu from "assets/icons/LogoMenu.gif";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import "./Header.scss";
function Header() {
  const history = useHistory();

  return (
    <div className="header">
      <div className="header_logo">
        <Link exact to="/home">
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
      <div className="header_btn">
        <span>
          <BsFillPersonFill className="icon" />
        </span>
        <Button variant="primary" onClick={() => history.replace("/login")}>
          {/* <FaUserCircle className="icon" /> */}
          Đăng Nhập
        </Button>
      </div>
    </div>
  );
}

export default Header;

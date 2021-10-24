import LogoMenu from "assets/icons/LogoMenu.gif";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <div className="logoHeader">
        <Link exact to="/">
          <img alt="logoMenu" src={LogoMenu} />
          <span>Geny Library</span>
        </Link>
      </div>
      <div className="searchHeader">
        <Form.Group className="searchHeader_form">
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
      <div className="userLogin">
        User Login <Button variant="primary">Login</Button>
      </div>
    </div>
  );
}

export default Header;

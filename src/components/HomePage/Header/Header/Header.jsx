import LogoMenu from "assets/icons/logo.png";
import Carts from "components/customComponents/Carts/Carts";
import DropdownItems from "components/customComponents/DropdownItems/DropdownItems";
import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { HashLink as Link } from "react-router-hash-link";
import { selectUser } from "reducers/authSlice";
import Navigation from "../Navigation/Navigation";
import "./Header.scss";

function Header() {
  const history = useHistory();
  const isUser = useSelector(selectUser);

  //Hiện tên cuối
  const showName = (name) => {
    const getName = name.split(" ");
    return getName[getName.length - 1];
  };

  const UserForm = () => {
    //Đăng nhập
    if (isUser && isUser.status === "active") {
      return (
        <div className="header_btn">
          <span className="nameUser">Xin chào, {showName(isUser.name)}</span>
          <Carts />
          <DropdownItems />
        </div>
      );
    }
    //Chưa đăng nhập
    else {
      return (
        <div className="header_btn" onClick={() => history.push("/login")}>
          <Carts />
          <Button className="btnLogin" variant="primary">
            Đăng Nhập
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="header">
      <div className="header_logo">
        <Link smooth={true} to="/home/#about">
          <img alt="logoMenu" src={LogoMenu} />
          <span className="nameLogo">Geny Library</span>
        </Link>
      </div>
      <div className="header_navigation">
        <Navigation />
      </div>
      {/* <div className="header_search">
        <SearchForm />
      </div> */}
      {/* <div className="header_btn"> */}
      <UserForm />
      {/* </div> */}
    </div>
  );
}

export default Header;

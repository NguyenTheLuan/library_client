// import LogoMenu from "assets/icons/LogoMenu.gif";
import LogoMenu from "assets/icons/logo.png";
import Carts from "components/customComponents/Carts/Carts";
import DropdownItems from "components/customComponents/DropdownItems/DropdownItems";
import SearchForm from "components/customComponents/InputForms/SearchForm/SearchForm";
import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { selectUser } from "reducers/authSlice";
import "./Header.scss";

function Header() {
  const history = useHistory();
  const isUser = useSelector(selectUser);

  //Hiện tên cuối
  const showName = (name) => {
    const getName = name.split(" ");
    return getName[getName.length - 1];
  };

  const checkBtn = () => {
    //Đăng nhập
    if (isUser && isUser.status === "active") {
      return (
        <>
          <span className="nameUser">Xin chào, {showName(isUser.name)}</span>
          <Carts />
          <DropdownItems />
        </>
      );
    }
    //Chưa đăng nhập
    else {
      return (
        <div className="header_btn" onClick={() => history.push("/login")}>
          <Carts />
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
        <SearchForm />
      </div>
      <div className="header_btn">{checkBtn()}</div>
    </div>
  );
}

export default Header;

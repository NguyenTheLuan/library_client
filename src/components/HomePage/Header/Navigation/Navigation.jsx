import React from "react";
//Scroll link
import { NavHashLink as NavLink } from "react-router-hash-link";
import "./Navigation.scss";

function Navigation() {
  return (
    <div className="navMenu">
      <ul className="navMenuItems">
        <li className="navMenuItem">
          <NavLink to="/home/#about" activeClassName="active" smooth={true}>
            Giới thiệu
          </NavLink>
        </li>

        <li className="navMenuItem">
          <NavLink
            to="/home/#danh-muc-sach"
            activeClassName="active"
            smooth={true}
          >
            Danh mục sách
          </NavLink>
        </li>
        <li className="navMenuItem">
          <NavLink to="/home/#rating" activeClassName="active" smooth={true}>
            Đánh giá
          </NavLink>
        </li>
        <li className="navMenuItem">
          <NavLink to="/home/#contact" activeClassName="active" smooth={true}>
            Liên hệ hỗ trợ
          </NavLink>
        </li>

        {/* <NavLink exact={true} to={`${url}`} activeClassName="active">
            Trang Chủ
          </NavLink>
        </li>
        <li className="navMenu_items_links">
          <NavLink to={`${url}/tai-lieu`} activeClassName="active">
            Bài Giảng
          </NavLink>
        </li>
        <li className="navMenu_items_links">
          <NavLink to={`${url}/tu-lieu`} activeClassName="active">
            Tư Liệu
          </NavLink>
        </li>
        <li className="navMenu_items_links">
          <NavLink to={`${url}/community`} activeClassName="active">
            Cộng Đồng
          </NavLink> */}
      </ul>
    </div>
  );
}

export default Navigation;

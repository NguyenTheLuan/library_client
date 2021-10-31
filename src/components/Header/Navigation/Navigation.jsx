import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

function Navigation({ url }) {
  // console.log("hàm con", url);
  return (
    <div className="navMenu">
      <ul className="navMenu_items">
        <li className="navMenu_items_links">
          <NavLink exact={true} to={`${url}`} activeClassName="active">
            Trang Chủ
          </NavLink>
        </li>
        <li className="navMenu_items_links">
          <NavLink to={`${url}/bai-giang`} activeClassName="active">
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
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;

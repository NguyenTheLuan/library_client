import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

function Navigation() {
  return (
    <ul className="listItems">
      <li className="list">
        <NavLink to="/" activeClassName="active">
          Trang Chủ
        </NavLink>
      </li>
      <li className="list">
        <NavLink to="/bai-giang" activeClassName="active">
          Bài Giảng
        </NavLink>
      </li>
      <li className="list">
        <NavLink to="/tu-lieu" activeClassName="active">
          Tư Liệu
        </NavLink>
      </li>
      <li className="list">
        <NavLink to="/community" activeClassName="active">
          Thảo Luận
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;

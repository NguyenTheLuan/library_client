import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

function Navigation({ url }) {
  console.log("hàm con", url);
  return (
    <ul className="listItems">
      <li className="list">
        <NavLink exact={true} to={`${url}`} activeClassName="active">
          Trang Chủ
        </NavLink>
      </li>
      <li className="list">
        <NavLink to={`${url}/bai-giang`} activeClassName="active">
          Bài Giảng
        </NavLink>
      </li>
      <li className="list">
        <NavLink to={`${url}/tu-lieu`} activeClassName="active">
          Tư Liệu
        </NavLink>
      </li>
      <li className="list">
        <NavLink to={`${url}/community`} activeClassName="active">
          Thảo Luận
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;

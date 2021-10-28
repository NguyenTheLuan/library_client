import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

function Navigation({ url }) {
  // console.log("hàm con", url);
  return (
    <div className="navMenu">
      <ul className="listItems" style={{ padding: "0px", margin: "0px" }}>
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
            Cộng Đồng
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;

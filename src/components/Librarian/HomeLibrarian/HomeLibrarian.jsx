import Logout from "components/Auth/Logout/Logout";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/authSlice";

import { FaUserCircle } from "react-icons/fa";
import "./AdminPage.scss";

function HomeLibrarian() {
  const admin = useSelector(selectUser);
  return (
    <div className="adminMenu">
      <div className="adminMenu_menu">
        <div className="adminMenu_menu_logo">
          <FaUserCircle className="icons" />
        </div>
        <div className="adminMenu_menu_contents">
          <h2>Thông tin cá nhân</h2>
          <div className="adminMenu_menu_contents_items">
            <span className="title">
              <strong>Họ và tên:</strong>
            </span>
            <span>{admin.name}</span>
          </div>
          <div className="adminMenu_menu_contents_items">
            <span className="title">
              <strong>Chức vụ:</strong>
            </span>
            <span>{admin.role}</span>
          </div>
          <div className="adminMenu_menu_contents_items">
            <span className="title">
              <strong>Ngày vô làm:</strong>
            </span>
            <span>"Ngày chưa thiết lập"</span>
          </div>
          {/* <div className="adminMenu_menu_contents_items">
            <Logout />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default HomeLibrarian;

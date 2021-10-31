import Logout from "components/Auth/Logout/Logout";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { useRouteMatch } from "react-router";

import "./DropdownItems.scss";

function DropdownItems() {
  let { path, url } = useRouteMatch();
  console.log(path);
  return (
    <div>
      <Dropdown className="dropdownMain">
        <Dropdown.Toggle
          variant="primary"
          // variant="secondary"
          id="dropdown-basic"
          className="dropdownMain_name"
        >
          <FaRegUser className="icon" />
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdownMain_menu">
          <Dropdown.Item href={`/user`} className="dropdownMain_menu_items">
            Xem Thông Tin
          </Dropdown.Item>

          <Dropdown.Item
            href={`/user/reset-password`}
            className="dropdownMain_menu_items"
          >
            Thay Đổi Mật Khẩu
          </Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Item className="dropdownMain_menu_items">
            <Logout />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropdownItems;

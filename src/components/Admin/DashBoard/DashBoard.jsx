import React from "react";
import { Accordion } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { ImHome } from "react-icons/im";
import "./DashBoard.scss";

function DashBoard({ url }) {
  // console.log("dashboard", url);
  return (
    <div>
      <div className="homeMenu">
        <div className="homeMenu_link">
          {/* <div className="homeNav"> */}
          <Link to="/" exact>
            <ImHome className="iconItem" />
            <span className="iconName">Trở lại trang chủ</span>
          </Link>
          {/* </div> */}
        </div>
      </div>
      <Accordion>
        {/* Quản lý người dùng */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Quản Lý Người Dùng</Accordion.Header>
          <Accordion.Body>
            <NavLink to={`${url}/users`} exact={true} activeClassName="active">
              Danh sách người dùng
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to={`${url}/users/create`} activeClassName="active">
              Tạo người dùng mới
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to={`${url}/users/edit`} activeClassName="active">
              Chỉnh Sửa Thông Tin
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to={`${url}/users/:id/delete`} activeClassName="active">
              Xoá Thông Tin
            </NavLink>
          </Accordion.Body>
        </Accordion.Item>

        {/* Quản Lý Sách */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Quản Lý Sách</Accordion.Header>
          <Accordion.Body>
            <NavLink to="/admin/user" activeClassName="active">
              Tạo Mới
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to="/admin/user" activeClassName="active">
              Xem Danh Sách
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to="/admin/user" activeClassName="active">
              Xem Tác Giả
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to="/admin/user" activeClassName="active">
              Xem Danh Mục
            </NavLink>
          </Accordion.Body>
        </Accordion.Item>
        {/* Quản Lý Báo Cáo */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Quản Báo Cáo</Accordion.Header>
          <Accordion.Body>
            <NavLink to="/admin/user" activeClassName="active">
              Xem Báo Cáo
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to="/admin/user" activeClassName="active">
              Xuất Báo Cáo
            </NavLink>
          </Accordion.Body>
        </Accordion.Item>
        {/* Quản Lý Danh Mục */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>Quản Danh Mục</Accordion.Header>
          <Accordion.Body>
            <NavLink to="/admin/user" activeClassName="active">
              Tìm kiếm danh mục
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to="/admin/user" activeClassName="active">
              Cập nhật danh mục
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to="/admin/user" activeClassName="active">
              Xoá danh mục
            </NavLink>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default DashBoard;

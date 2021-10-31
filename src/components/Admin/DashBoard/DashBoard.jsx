import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { ImHome } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";
import "./DashBoard.scss";

function DashBoard({ url }) {
  // console.log("dashboard", url);
  useEffect(() => {
    handleShow();
  }, []);

  const handleShow = () => {
    return localStorage.getItem("showItem");
  };

  return (
    <div>
      <div className="homeMenu">
        <div className="homeMenu_link">
          {/* <div className="homeNav"> */}
          <Link to="/" exact={true}>
            <ImHome className="iconItem" />
            <span className="iconName">Trở lại trang chủ</span>
          </Link>
          {/* </div> */}
        </div>
      </div>
      <Accordion
        defaultActiveKey={handleShow}
        onSelect={(e) => localStorage.setItem("showItem", e)}
      >
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
          {/* <Accordion.Body>
            <NavLink to={`${url}/users/edit`} activeClassName="active">
              Chỉnh Sửa Thông Tin
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to={`${url}/users/:id/delete`} activeClassName="active">
              Xoá Thông Tin
            </NavLink>
          </Accordion.Body> */}
        </Accordion.Item>

        {/* Quản Lý Sách */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Quản Lý Sách</Accordion.Header>
          <Accordion.Body>
            <NavLink to={`${url}/books`} exact={true} activeClassName="active">
              Tổng số sách
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to={`${url}/books/create`} activeClassName="active">
              Thêm một đầu sách
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to={`${url}/authors`} activeClassName="active">
              Xem Tác Giả
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to={`${url}/categories`} activeClassName="active">
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

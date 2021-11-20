import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

//icon
import { AiFillFileExcel } from "react-icons/ai";
import { FaBook, FaUserCog } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import "./DashBoard.scss";

function LibrarianDashBoard({ url }) {
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
          <Link to="/librarian" exact={true}>
            <IoLibrarySharp className="iconItem" />
            <span className="iconName">Librarian dashboard</span>
          </Link>
        </div>
      </div>
      <Accordion
        defaultActiveKey={handleShow}
        onSelect={(e) => localStorage.setItem("showItem", e)}
      >
        {/* Quản lý người dùng */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaUserCog className="iconItem" />
            Quản Lý Người Dùng
          </Accordion.Header>
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
        </Accordion.Item>

        {/* Quản Lý Sách */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            {/* <RiBookletFill className="iconItem" /> */}
            <FaBook className="iconItem" />
            Quản Lý Sách
          </Accordion.Header>
          <Accordion.Body>
            <NavLink
              to={`${url}/books/view`}
              exact={true}
              activeClassName="active"
            >
              Thông tin sách thư viện
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink
              to={`${url}/books/reservations`}
              exact={true}
              activeClassName="active"
            >
              Lịch hẹn người dùng
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink
              to={`${url}/books/copies`}
              // exact={true}
              activeClassName="active"
            >
              Mượn sách
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink
              to={`${url}/books/return`}
              exact={true}
              activeClassName="active"
            >
              Trả sách
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink
              to={`${url}/books/borrowing`}
              exact={true}
              activeClassName="active"
            >
              Sách đã cho mượn
            </NavLink>
          </Accordion.Body>
        </Accordion.Item>
        {/* Quản Lý Báo Cáo */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <AiFillFileExcel className="iconItem" />
            Quản Lý Báo Cáo
          </Accordion.Header>
          <Accordion.Body>
            <NavLink to={`${url}/report`} activeClassName="active" exact={true}>
              Thống kê hoạt động
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to={`${url}/report/activities`} activeClassName="active">
              Hoạt động thủ thư
            </NavLink>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default LibrarianDashBoard;

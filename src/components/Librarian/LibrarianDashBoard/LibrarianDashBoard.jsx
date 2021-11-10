import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { AiFillFileExcel } from "react-icons/ai";
// import { GrUserSettings } from "react-icons/gr";
// import { RiBookletFill } from "react-icons/ri";
import { FaBook, FaUserCog } from "react-icons/fa";
//icon
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import "./DashBoard.scss";

function LibrarianDashBoard({ url }) {
  // console.log("dashboard", url);
  useEffect(() => {
    handleShow();
  }, []);

  const handleShow = () => {
    return sessionStorage.getItem("showItem");
  };

  return (
    <div>
      <div className="homeMenu">
        <div className="homeMenu_link">
          <Link to="/librarian" exact={true}>
            <MdOutlineAdminPanelSettings className="iconItem" />
            <span className="iconName">Librarian dashboard</span>
          </Link>
        </div>
      </div>
      <Accordion
        defaultActiveKey={handleShow}
        onSelect={(e) => sessionStorage.setItem("showItem", e)}
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
            <NavLink to={`${url}/books`} exact={true} activeClassName="active">
              Thông tin sách thư viện
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to={`${url}/users/reservation`} activeClassName="active">
              Danh sách hẹn nhận sách
            </NavLink>
          </Accordion.Body>
        </Accordion.Item>
        {/* Quản Lý Báo Cáo */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            {/* <AiTwotoneFileText className="iconItem" /> */}
            <AiFillFileExcel className="iconItem" />
            Quản Báo Cáo
          </Accordion.Header>
          <Accordion.Body>
            <NavLink to={`${url}/report`} activeClassName="active" exact={true}>
              Thống kê
            </NavLink>
          </Accordion.Body>
          <Accordion.Body>
            <NavLink to="/admin/report/export" activeClassName="active">
              Xuất Báo Cáo
            </NavLink>
          </Accordion.Body>
        </Accordion.Item>

        {/* Quản Lý Danh Mục */}
        {/* <Accordion.Item eventKey="3">
          <Accordion.Header>Quản Lý Mượn Sách</Accordion.Header>
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
        </Accordion.Item> */}
      </Accordion>
    </div>
  );
}

export default LibrarianDashBoard;

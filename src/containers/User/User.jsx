import Logout from "components/Auth/Logout/Logout";
import VerifyEmail from "components/Auth/VerifyEmail/VerifyEmail";
import MyCarts from "components/User/MyCarts/MyCarts";
import Profile from "components/User/Profile/Profile";
import Reservation from "components/User/Reservation/Reservation";
import ResetPassword from "components/User/ResetPassword/ResetPassword";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link, NavLink } from "react-router-dom";
import "./User.scss";

function User() {
  let { path } = useRouteMatch();

  return (
    <div className="mainUser">
      <div className="mainUser_nav">
        <div className="mainUser_nav_icon">
          <FaUserCircle />
        </div>
        <div className="mainUser_nav_links">
          <Link to="/">Trang Chủ</Link>
          {/* <NavLink to={`${path}`} activeClassName="active" exact={true}>
            Trang Home
          </NavLink> */}
          <NavLink to={`${path}`} activeClassName="active" exact={true}>
            Thông Tin Cá Nhân
          </NavLink>
          <NavLink
            to={`${path}/reset-password`}
            activeClassName="active"
            exact={true}
          >
            Thay Đổi Mật Khẩu
          </NavLink>
          <NavLink to={`${path}/carts`} activeClassName="active">
            Giỏ Hàng
          </NavLink>
          <NavLink to={`${path}/reservation`} activeClassName="active">
            Xem lịch hẹn
          </NavLink>
          <Logout />
        </div>
      </div>
      <div className="mainUser_contents">
        <div className="mainUser_contents_headers"></div>
        <div className="mainUser_contents_containers">
          <Switch>
            {/* <Route
              path={`${path}`}
              component={() => <UserHome />}
              exact={true}
            />
            <Route
              path={`${path}/profile`}
              component={() => <Profile />}
              exact={true}
            /> */}
            <Route
              path={`${path}`}
              component={() => <Profile />}
              exact={true}
            />
            <Route
              path={`${path}/reset-password`}
              component={() => <ResetPassword />}
              exact={true}
            />

            <Route
              path={`${path}/profile/verify`}
              component={() => <VerifyEmail />}
              exact={true}
            />
            <Route
              path={`${path}/carts`}
              component={() => <MyCarts />}
              exact={true}
            />
            <Route
              path={`${path}/reservation`}
              component={() => <Reservation />}
              exact={true}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default User;

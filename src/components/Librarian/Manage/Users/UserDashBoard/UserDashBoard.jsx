import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { Link, NavLink } from "react-router-dom";
import ConfirmReservation from "../../Books/ReservationBook/ConfirmReservation/ConfirmReservation";

import UserInfo from "../UserInfo/UserInfo";

import "./UserDashBoard.scss";

function UserDashBoard() {
  const { id } = useParams();
  const { path } = useRouteMatch();

  // console.log("xem thông tin của user có id", id);
  return (
    <div className="userDashBoard">
      <div className="userDashBoard_links">
        <Link to={"/librarian/users"}>Quay lại danh sách</Link>
        <NavLink
          to={`${path.split(":")[0]}${id}`}
          activeClassName="active"
          exact={true}
        >
          Thông tin người dùng
        </NavLink>
        <NavLink
          to={`${path.split(":")[0]}${id}/carts`}
          activeClassName="active"
        >
          Danh sách lịch hẹn
        </NavLink>
        <NavLink
          to={`${path.split(":")[0]}${id}/resevations`}
          activeClassName="active"
          exact={true}
        >
          Sách đặt trước
        </NavLink>
        <NavLink
          to={`${path.split(":")[0]}${id}/resevations/book`}
          activeClassName="active"
        >
          Mượn sách
        </NavLink>
        <NavLink
          to={`${path.split(":")[0]}${id}/resevations/return`}
          activeClassName="active"
        >
          Trả sách
        </NavLink>
      </div>
      <div className="userDashBoard_contents">
        <Switch>
          {/* <Route
            path={`${path.split(":")[0]}${id}/carts`}
            component={() => <ViewCartUser />}
            exact={true}
          /> */}
          <Route
            path={`${path.split(":")[0]}${id}`}
            component={() => <UserInfo />}
            exact={true}
          />
          {/* <Route
            path={`${path.split(":")[0]}${id}/resevations`}
            component={() => <ViewScheduleUser />}
            exact={true}
          /> */}
          <Route
            path={`${path.split(":")[0]}${id}/resevations/book`}
            component={() => <ConfirmReservation />}
            // exact={true}
          />
          {/* <Route
            path={`${path.split(":")[0]}${id}/resevations/book`}
            component={() => <ConfirmReservation />}
            // exact={true}
          /> */}
          <Route
            path={`${path.split(":")[0]}${id}/resevations/return`}
            component={() => "trang trả sách"}
            exact={true}
          />
        </Switch>
      </div>
    </div>
  );
}

export default UserDashBoard;

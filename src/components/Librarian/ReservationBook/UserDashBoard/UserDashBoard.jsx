import React from "react";
import { Button } from "react-bootstrap";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link, NavLink } from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";
import ViewCartUser from "../ReservationSchedule/ReservationSchedule";
import ViewScheduleUser from "../BookReservation/BookReservation";
import "./UserDashBoard.scss";

function UserDashBoard() {
  const { id } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
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
          Sách đã hẹn
        </NavLink>
        <NavLink
          to={`${path.split(":")[0]}${id}/resevations/checkout`}
          activeClassName="active"
        >
          Sách đã đặt hẹn
        </NavLink>
        <NavLink
          to={`${path.split(":")[0]}${id}/resevations/checkin`}
          activeClassName="active"
        >
          Lịch sử trả sách
        </NavLink>
      </div>
      <div className="userDashBoard_contents">
        <Switch>
          <Route
            path={`${path.split(":")[0]}${id}/carts`}
            component={() => <ViewCartUser />}
            exact={true}
          />
          <Route
            path={`${path.split(":")[0]}${id}`}
            component={() => <UserInfo />}
            exact={true}
          />
          <Route
            path={`${path.split(":")[0]}${id}/resevations`}
            component={() => <ViewScheduleUser />}
            exact={true}
          />
          <Route
            path={`${path.split(":")[0]}${id}/checkout`}
            component={() => "trang cho mượn"}
            exact={true}
          />
          <Route
            path={`${path.split(":")[0]}${id}/checkin`}
            component={() => "trang trả sách"}
            exact={true}
          />
        </Switch>
      </div>
    </div>
  );
}

export default UserDashBoard;

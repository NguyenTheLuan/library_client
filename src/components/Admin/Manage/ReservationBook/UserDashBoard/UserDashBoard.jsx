import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { Link, NavLink } from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";
import ViewCartUser from "../ViewCartUser/ViewCartUser";
import "./UserDashBoard.scss";

function UserDashBoard() {
  const { id } = useParams();
  const { path } = useRouteMatch();

  // console.log("xem thông tin của user có id", id);
  return (
    <div className="userDashBoard">
      <div className="userDashBoard_links">
        <NavLink
          to={`${path.split(":")[0]}${id}`}
          activeClassName="active"
          exact={true}
        >
          Thông tin user
        </NavLink>
        <NavLink
          to={`${path.split(":")[0]}${id}/carts`}
          activeClassName="active"
        >
          Giỏ hàng users
        </NavLink>
        <NavLink
          to={`${path.split(":")[0]}${id}/resevations`}
          activeClassName="active"
          exact={true}
        >
          Lịch hẹn đặt sách
        </NavLink>
        <NavLink
          to={`${path.split(":")[0]}${id}/resevations/checkout`}
          activeClassName="active"
        >
          Lịch hẹn nhận sách
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
            component={() => "trang xem lịch mượn"}
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

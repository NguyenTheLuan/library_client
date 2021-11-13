import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import BookReserved from "./BookReserved/BookReserved";
import CheckBooks from "./CheckBooks/CheckBooks";
import CheckCopies from "./CheckCopies/CheckCopies";

import "./ConfirmReservation.scss";

function ConfirmReservation() {
  const { path } = useRouteMatch();
  return (
    <div className="confirmMenu">
      <div className="confirmMenu_links">
        <NavLink to={`${path}`} activeClassName="active" exact={true}>
          Kiểm tra sách đã hẹn trước
        </NavLink>
        <NavLink
          to={`${path}/check-copies`}
          activeClassName="active"
          exact={true}
        >
          Kiểm tra Copies sách
        </NavLink>
        <NavLink to={`${path}/checkId`} activeClassName="active" exact={true}>
          Kiểm tra ID sách
        </NavLink>

        {/* <NavLink to={`${path}/checkout`} activeClassName="active">
          Tiến thành đặt sách
        </NavLink> */}
      </div>
      <div className="confirmMenu_contents">
        <Switch>
          {/* Xem các sách đã được đặt trước */}
          <Route
            path={`${path}`}
            component={() => <BookReserved />}
            exact={true}
          />
          {/* Kiểm tra sách theo id */}
          <Route
            path={`${path}/checkId`}
            component={() => <CheckBooks />}
            exact={true}
          />
          {/* Kiểu tra sách theo mã copies */}
          <Route
            path={`${path}/check-copies`}
            component={() => <CheckCopies />}
            exact={true}
          />
          {/* <Route
            path={`${path}/checkout`}
            component={() => <CheckoutBooks />}
            exact={true}
          /> */}
        </Switch>
      </div>
    </div>
  );
}

export default ConfirmReservation;

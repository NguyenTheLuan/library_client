import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import Checkout from "./ConfirmReservation/Checkout/Checkout";
import ConfirmReservation from "./ConfirmReservation/ConfirmReservation";
import ReservationSchedule from "./ViewSchedule/ViewSchedule";

import "./CheckoutBooks.scss";

function CheckoutBooks() {
  const { path } = useRouteMatch();
  // console.log(path);
  return (
    <div className="checkoutForm">
      <div className="checkoutForm_links">
        <NavLink to={`${path}`} activeClassName="active" exact={true}>
          Xem lịch hẹn
        </NavLink>
        <NavLink to={`${path}/check`} activeClassName="active" exact={true}>
          Kiểm tra thông tin sách
        </NavLink>
        <NavLink to={`${path}/checkout`} activeClassName="active" exact={true}>
          Tiến thành đặt sách
        </NavLink>
      </div>
      <div className="checkoutForm_contents">
        <Switch>
          <Route
            path={`${path}`}
            component={() => <ReservationSchedule />}
            exact={true}
          />
          <Route
            path={`${path}/check`}
            component={() => <ConfirmReservation />}
          />
          <Route
            path={`${path}/checkout`}
            component={() => <Checkout />}
            exact={true}
          />
        </Switch>
      </div>
    </div>
  );
}

export default CheckoutBooks;

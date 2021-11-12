import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import CheckBooks from "./CheckBooks/CheckBooks";
import CheckoutBooks from "./CheckoutBooks/CheckoutBooks";

import "./ConfirmReservation.scss";

function ConfirmReservation() {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <div className="confirmMenu">
      <div className="confirmMenu_links">
        <NavLink to={`${path}`} activeClassName="active" exact={true}>
          Kiểm tra sách
        </NavLink>
        <NavLink to={`${path}/checkout`} activeClassName="active">
          Đặt sách
        </NavLink>
      </div>
      <div className="confirmMenu_contents">
        <Switch>
          {/* <Route path={`${path}/check`} component={() => <CheckBooks />} /> */}
          <Route
            path={`${path}`}
            component={() => <CheckBooks />}
            exact={true}
          />
          <Route
            path={`${path}/checkout`}
            component={() => <CheckoutBooks />}
            exact={true}
          />
        </Switch>
      </div>
    </div>
  );
}

export default ConfirmReservation;

import React from "react";
import { Redirect, Route } from "react-router";

const isAuth = localStorage.getItem("access-token");

//Auth Route (for login, register,..)
export const MenuLink = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (isAuth ? <Redirect to={"/"} /> : children)}
    />
  );
};

//Private Route (for admin, user)
export const PrivateRoutes = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (isAuth ? children : <Redirect to={"/login"} />)}
    />
  );
};

// render route
export const showRoutes = (menuRoute) => {
  if (menuRoute.length > 0) {
    return menuRoute.map((route) => {
      return route.exact ? (
        <Route
          key={route.name}
          path={route.path}
          exact
          component={route.main}
        />
      ) : (
        <Route key={route.name} path={route.path} component={route.main} />
      );
    });
  }
  return null;
};

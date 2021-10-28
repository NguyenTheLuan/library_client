import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { selectUser } from "reducers/userSlice";

function AuthRoute({ children, ...rest }) {
  const isLogin = useSelector(selectUser);
  return (
    <Route
      {...rest}
      render={() => (isLogin ? <Redirect to={"/"} exact={true} /> : children)}
    />
  );
}

export default AuthRoute;

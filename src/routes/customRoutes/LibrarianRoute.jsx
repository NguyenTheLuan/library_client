import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { selectUser } from "reducers/authSlice";

function AdminRoute({ children, ...rest }) {
  const isAdmin = useSelector(selectUser);
  return (
    <Route
      {...rest}
      render={() =>
        isAdmin && isAdmin.role === "librarian" ? (
          children
        ) : (
          <Redirect to={"/login"} exact={true} />
        )
      }
    />
  );
}

export default AdminRoute;

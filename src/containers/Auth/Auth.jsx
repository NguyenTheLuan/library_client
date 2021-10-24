import Login from "components/Auth/Login/Login";
import { AUTH_USER_ROUTES } from "constants/routes";
import React from "react";
import { Switch } from "react-router";
import { showRoutes } from "routes/customRoutes";

function Auth() {
  console.log(showRoutes(AUTH_USER_ROUTES));
  return (
    <>
      <Login />

      <Switch>
        {/* auth routes */}
        {showRoutes(AUTH_USER_ROUTES)}
      </Switch>
    </>
  );
}

export default Auth;

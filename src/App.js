import ForgotPassword from "components/Auth/ForgotPassword/ForgotPassword";
import Login from "components/Auth/Login/Login";
import Register from "components/Auth/Register/Register";
import Admin from "containers/Admin/Admin";
import HomePage from "containers/HomePage/HomePage";
import NotFound from "containers/HomePage/NotFound/NotFound";

import User from "containers/User/User";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminRoute from "routes/customRoutes/AdminRoute";
import AuthRoute from "routes/customRoutes/AuthRoute";
import UserRoute from "routes/customRoutes/UserRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/home" exact={true} />
        {/* home route */}
        <Route path="/home">
          <HomePage />
        </Route>

        {/* <Route path={["/admin", "/dash-board"]}>
          <Admin />
        </Route> */}
        {/* admin route */}
        <AdminRoute path={["/admin", "/dash-board"]}>
          <Admin />
        </AdminRoute>

        {/* for user route */}
        <UserRoute path="/user">
          <User />
        </UserRoute>

        {/* Login form */}
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
        <AuthRoute path="/register">
          <Register />
        </AuthRoute>
        <AuthRoute path="/forgot-password">
          <ForgotPassword />
        </AuthRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import ForgotPassword from "components/Auth/ForgotPassword/ForgotPassword";
import Login from "components/Auth/Login/Login";
import Register from "components/Auth/Register/Register";
import Admin from "containers/Admin/Admin";
import HomePage from "containers/HomePage/HomePage";
import User from "containers/User/User";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AdminPrivateRoutes, MenuLink } from "routes/customRoutes";
import AdminRoute from "routes/customRoutes/AdminRoute";
import AuthRoute from "routes/customRoutes/AuthRoute";
import UserRoute from "routes/customRoutes/UserRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/home" exact={true} />
        <Route path="/home">
          <HomePage />
        </Route>

        {/* <Route path={["/admin", "/dash-board"]}>
          <Admin />
        </Route> */}
        <AdminRoute path={["/admin", "/dash-board"]}>
          <Admin />
        </AdminRoute>

        <UserRoute path="/user">
          <User />
        </UserRoute>
        {/* Login form */}

        <AuthRoute path="/login">
          {/* <Auth /> */}
          <Login />
        </AuthRoute>
        <AuthRoute path="/register">
          <Register />
        </AuthRoute>
        <AuthRoute path="/forgot-password">
          <ForgotPassword />
        </AuthRoute>
        {/* <MenuLink path="/login">
          <Auth />
        </MenuLink>
        <MenuLink path="/register">
          <Register />
        </MenuLink>
        <MenuLink path="/forgot-password">
          <Forgot_Password />
        </MenuLink> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

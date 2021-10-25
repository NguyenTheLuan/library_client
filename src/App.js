import Forgot_Password from "components/Auth/Forgot-Password/Forgot_Password";
import Register from "components/Auth/Register/Register";
import Admin from "containers/Admin/Admin";
import Auth from "containers/Auth/Auth";
import HomePage from "containers/HomePage/HomePage";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/home" exact={true} />
        <Route path="/home">
          <HomePage />
        </Route>

        <Route path={["/admin", "/dash-board"]}>
          <Admin />
        </Route>
        {/* Login form */}
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgot-password">
          <Forgot_Password />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

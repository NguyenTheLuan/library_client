import Forgot_Password from "components/Auth/Forgot-Password/Forgot_Password";
import Register from "components/Auth/Register/Register";
import Auth from "containers/Auth/Auth";
import HomePage from "containers/HomePage/HomePage";
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/home" exact />
        <Route path="/home">
          <HomePage />
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

import accountApi from "apis/authApi";
import ForgotPassword from "components/Auth/ForgotPassword/ForgotPassword";
import Login from "components/Auth/Login/Login";
import Register from "components/Auth/Register/Register";
import Admin from "containers/Admin/Admin";
import HomePage from "containers/HomePage/MainHome/MainHome";
import NotFound from "containers/HomePage/NotFound/NotFound";
import Librarian from "containers/Librarian/Librarian";
import User from "containers/User/User";
import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminRoute from "routes/customRoutes/AdminRoute";
import AuthRoute from "routes/customRoutes/AuthRoute";
import UserRoute from "routes/customRoutes/UserRoute";

function App() {
  //Xử lí time
  const timeExpire = JSON.parse(localStorage.getItem("access"))?.expires;

  const timeRefresh = new Date(timeExpire);
  const currentTime = new Date();

  //refresh token
  useEffect(() => {
    const clearTime = setInterval(() => {
      refreshToken();
    }, timeRefresh.getTime() - currentTime.getTime());
    //Clean up
    return () => {
      clearInterval(clearTime);
    };
  }, []);

  const refreshToken = async () => {
    const token = {
      refreshToken: JSON.parse(localStorage.getItem("refresh"))?.token,
    };
    try {
      const response = await accountApi.postRefreshToken(token);
      // console.log("refresh thành công", response);

      //Thiết lập lại access token
      localStorage.setItem("access", JSON.stringify(response.access));
      //Thiết lập lại refresh token
      localStorage.setItem("refresh", JSON.stringify(response.refresh));
      console.log("refreshToken thành công");
    } catch (error) {
      console.log("refresh-token lỗi", { error });
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/home" exact={true} />

        {/* for home route */}
        <Route path="/home">
          <HomePage />
        </Route>

        {/* for admin route */}
        <AdminRoute path={["/admin", "/dash-board"]}>
          <Admin />
        </AdminRoute>

        {/* for librarian route */}
        <Librarian path="/user">
          <Librarian />
        </Librarian>

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

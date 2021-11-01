import accountApi from "apis/authApi";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logOut } from "reducers/userSlice";
// import "./Logout.scss";

function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();

  const Logout = async () => {
    const logoutToken = JSON.parse(localStorage.getItem("refresh"));
    // const { token, expires } = logoutToken;
    const { token } = logoutToken;
    // post refresh token to logout
    const tokenOut = { refreshToken: token };
    // console.log(tokenOut);
    try {
      //call api logout
      await accountApi.postLogout(tokenOut);
      // console.log("logout ok");

      //clear user after logout
      localStorage.clear();
      sessionStorage.clear();
      dispatch(logOut());
      //return to Home Page
      history.push("/");
    } catch (error) {
      alert(error);
      //   console.log(error.reponse);
      //   console.log("logout fail");
    }
  };
  const handleLogout = () => {
    Logout();
  };

  return (
    <Button type="submit" variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;

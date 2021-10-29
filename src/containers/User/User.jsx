import VerifyEmail from "components/Auth/VerifyEmail/VerifyEmail";
import Profile from "components/User/Profile/Profile";
import React from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

function User() {
  // function useQuery() {
  //   return new URLSearchParams(useLocation().search);
  // }

  let { path, url } = useRouteMatch();
  // const query = useQuery();
  // console.log({ query });

  return (
    <div>
      <Link to={`${path}/profile`}>User</Link>
      <Switch>
        <Route path={`${path}`} component={() => "Trang Home"} exact={true} />
        <Route
          path={`${path}/profile`}
          component={() => <Profile />}
          exact={true}
        />
        <Route
          path={`${path}/profile/verify`}
          component={() => <VerifyEmail />}
          exact={true}
        />
      </Switch>
    </div>
  );
}

export default User;

import React from "react";
import { useParams, useRouteMatch } from "react-router";

function UserInfo() {
  const route = useRouteMatch();
  console.log(route);
  return <div>info user</div>;
}

export default UserInfo;

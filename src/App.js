import {
  ADMIN_DASHBOARD_ROUTES,
  ADMIN_DASHBOARD_USER,
  MAIN_PAGES,
} from "constants/routes";
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { showRoutes } from "routes/customRoutes";

function App() {
  // let match = useRouteMatch();
  // console.log({ match });
  return (
    <BrowserRouter>
      <Switch>{showRoutes(MAIN_PAGES)}</Switch>

      {/* <Switch> */}
      {/* admin route */}
      {showRoutes(ADMIN_DASHBOARD_ROUTES)}
      {showRoutes(ADMIN_DASHBOARD_USER)}
      {/* </Switch> */}
    </BrowserRouter>
  );
}

export default App;

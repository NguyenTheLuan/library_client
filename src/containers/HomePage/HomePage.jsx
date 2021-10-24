import Header from "components/Header/Header/Header";
import Navigation from "components/Header/Navigation/Navigation";
import { HOME_ROUTES } from "constants/routes";
import React from "react";
import { Switch } from "react-router";
import { showRoutes } from "routes/customRoutes";
import "./HomePage.scss";

function HomePage() {
  return (
    <div>
      <Header />
      <Navigation />
      <Switch>{showRoutes(HOME_ROUTES)}</Switch>
    </div>
  );
}

export default HomePage;

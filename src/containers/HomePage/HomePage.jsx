import Header from "components/Header/Header/Header";
import Navigation from "components/Header/Navigation/Navigation";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import BaiGiang from "./Bai-giang/BaiGiang";
import "./HomePage.scss";

export const MainPage = () => {
  return <>Item Lists</>;
};

function HomePage() {
  // const match = useRouteMatch();
  // console.log(match.url);
  // console.log(match.url);
  let { path, url } = useRouteMatch();
  console.log("Home page ", { path, url });

  return (
    <div>
      <Header />
      <Navigation url={url} />
      <Switch>
        {/* <Route exact={true} path={path} /> */}
        <Route path={`${path}`} component={() => <MainPage />} exact={true} />
        <Route path={`${path}/community`} component={() => "trang cộng đỒng"} />
        <Route path={`${path}/tu-lieu`} component={() => "trang tư liệu"} />
        <Route path={`${path}/bai-giang`} component={BaiGiang} />
      </Switch>
    </div>
  );
}

export default HomePage;

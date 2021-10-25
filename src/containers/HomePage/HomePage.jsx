import Header from "components/Header/Header/Header";
import Navigation from "components/Header/Navigation/Navigation";
import { GetProducts } from "components/productFetch/getProducts/GetProducts";
import ProductDetails from "components/productFetch/ProductDetails/ProductDetails";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import BaiGiang from "./Bai-giang/BaiGiang";
import "./HomePage.scss";

function HomePage() {
  // const match = useRouteMatch();
  let { path, url } = useRouteMatch();

  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <Navigation url={url} />
      <Switch>
        {/* <Route exact={true} path={path} /> */}
        <Route
          path={`${path}`}
          component={() => <GetProducts />}
          exact={true}
        />
        <Route path={`${path}/community`} component={() => "trang cộng đỒng"} />
        <Route path={`${path}/tu-lieu`} component={() => "trang tư liệu"} />
        <Route path={`${path}/bai-giang`} component={BaiGiang} />
        <Route
          path={`${path}/:itemsId`}
          component={() => <ProductDetails />}
          exact={true}
        />
      </Switch>
    </div>
  );
}

export default HomePage;

import Header from "components/Header/Header/Header";
import Navigation from "components/Header/Navigation/Navigation";
import { GetProducts } from "components/productFetch/getProducts/GetProducts";
import ProductDetails from "components/productFetch/ProductDetails/ProductDetails";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router";
import { selectUser } from "reducers/authSlice";
import BaiGiang from "./Bai-giang/BaiGiang";
import "./HomePage.scss";

function HomePage() {
  // const match = useRouteMatch();
  const isUser = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      isUser && checkRole();
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  const checkRole = () => {
    if (isUser.role === "admin") {
      history.push("/admin");
    }
  };

  let { path, url } = useRouteMatch();

  return (
    <div className="mainPage">
      <div className="mainPage_header">
        <Header />
      </div>
      <div className="mainPage_content">
        <div className="mainPage_content_nav">
          <Navigation url={url} />
        </div>
        <div className="mainPage_content_items">
          <div className="items">
            <Switch>
              <Route
                path={`${path}`}
                component={() => <GetProducts />}
                exact={true}
              />
              <Route
                path={`${path}/community`}
                component={() => "trang cộng đỒng"}
              />
              <Route
                path={`${path}/tu-lieu`}
                component={() => "trang tư liệu"}
              />
              <Route path={`${path}/bai-giang`} component={BaiGiang} />
              <Route
                path={`${path}/details/:itemsId`}
                component={() => <ProductDetails />}
                exact={true}
              />
              <Route>
                <Redirect to="/NotFound" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

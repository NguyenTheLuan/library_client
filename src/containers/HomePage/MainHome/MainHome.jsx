import BookDetails from "components/HomePage/Contains/BookDetails/ProductDetails";

import Header from "components/HomePage/Header/Header/Header";
import Navigation from "components/HomePage/Header/Navigation/Navigation";
import About from "components/HomePage/Pages/About/About";
import Contact from "components/HomePage/Pages/Contact/Contact";
import MainPage from "components/HomePage/Pages/MainPage/MainPage";
import Rating from "components/HomePage/Pages/Rating/Rating";
import TaiLieu from "components/HomePage/Pages/TaiLieu/TaiLieu";
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

import "./MainHome.scss";

function HomePage() {
  document.title = "Thư viện trực tuyến";

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
    if (isUser.role === "librarian") {
      history.push("/librarian");
    }
  };

  let { path, url } = useRouteMatch();

  return (
    <div className="mainPage">
      <div className="mainPage_header">
        <Header />
      </div>

      <div className="mainPage_contents">
        <About />

        {/* <MainPage /> */}
        <TaiLieu />
        <Rating />
        <Contact />
        {/* <Switch>
          <Route path={`${path}`} component={() => <MainPage />} exact={true} />
          <Route
            path={`${path}/community`}
            component={() => "trang cộng đỒng"}
          />
          <Route path={`${path}/tu-lieu`} component={() => "trang tư liệu"} />
          <Route path={`${path}/tai-lieu`} component={() => <TaiLieu />} />
          <Route
            path={`${path}/details/:itemsId`}
            component={() => <BookDetails />}
            exact={true}
          />
          <Route>
            <Redirect to="/NotFound" />
          </Route>
        </Switch> */}
      </div>

      <div className="mainPage_footer">{/* <Footer /> */}</div>
    </div>
  );
}

export default HomePage;

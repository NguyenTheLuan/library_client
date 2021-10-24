import productsApi from "apis/productsApi";
import Header from "components/Header/Header/Header";
import Navigation from "components/Header/Navigation/Navigation";
import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import BaiGiang from "./Bai-giang/BaiGiang";
import "./HomePage.scss";
import { Card, Button } from "react-bootstrap";

export const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await productsApi.getBooks();
      // console.log(response.results);
      setProducts(response.results);
    } catch (error) {
      console.log("err ", error);
    }
  };

  const listBooks = products?.map((product, index) => {
    return (
      <Card key={index} style={{ width: "150px", height: "150px" }}>
        <Card.Img src={product.cover} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>Được phát hành bởi{product.author}</Card.Text>
          <Button variant="success">Xem Thử</Button>
        </Card.Body>
      </Card>
    );
  });
  console.log(products);

  return (
    <div className="list_Items">
      {listBooks}
      {listBooks}
      {listBooks}
      {listBooks}
      {listBooks}
      {listBooks}
    </div>
  );
};

function HomePage() {
  // const match = useRouteMatch();
  // console.log(match.url);
  // console.log(match.url);
  let { path, url } = useRouteMatch();
  // console.log("Home page ", { path, url });

  return (
    <div style={{ overflowX: "hidden" }}>
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

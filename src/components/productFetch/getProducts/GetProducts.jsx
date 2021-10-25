import productsApi from "apis/productsApi";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router";
import "./GetProduct.scss";

export const GetProducts = () => {
  let { path } = useRouteMatch();
  const [products, setProducts] = useState([]);
  const history = useHistory();
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
      <Card key={index}>
        <Card.Img src={product.cover} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>Được phát hành bởi{product.author}</Card.Text>
          <Button
            variant="success"
            onClick={() => history.push(`${path}/${product.id}`)}
          >
            Xem Thử
          </Button>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div className="list_items">
      <div className="items">
        {listBooks}
        {listBooks}
        {listBooks}
      </div>
    </div>
  );
};

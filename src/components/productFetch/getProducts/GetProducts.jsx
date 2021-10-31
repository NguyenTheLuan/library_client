import productsApi from "apis/productsApi";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory, useRouteMatch } from "react-router";
import "./GetProduct.scss";

export const GetProducts = () => {
  let { path } = useRouteMatch();
  //Danh sách những cuốn sách
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const checkAuthorName = (author) => {
    return author;
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await productsApi.getBooks();
      // console.log(response.results);
      setProducts(response.results);
    } catch (error) {
      console.log("err trang getProducts ", error);
    }
  };

  // console.log(products);
  const listBooks = products?.map((product, index) => {
    return (
      <div
        key={index}
        className="menuBooks_list_items"
        onClick={() => history.push(`${path}/${product.id}`)}
      >
        <div className="menuBooks_list_items_img">
          <img src={product.cover} alt="img" />
        </div>
        <div className="menuBooks_list_items_contents">
          <div className="menuBooksList_items_contents_title">
            <span> {product.title}</span>
          </div>
          <div className="menuBooks_list_items_contents_title">
            Tác giả: <span>{checkAuthorName(product.authors)}</span>
          </div>
          <div className="menuBooks_list_items_contents_title">
            {/* <Button variant="primary">Xem Thử</Button> */}
            <Button className="btnClick">
              <AiOutlineShoppingCart className="btnClick_icon" />
              <span className="btnClick_name">Thêm vào giỏ sách</span>
            </Button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="menuBooks">
      <div className="menuBooks_list">
        {listBooks}
        {listBooks}
        {listBooks}
        {listBooks}
        {listBooks}
        {listBooks}
      </div>
    </div>
  );
};

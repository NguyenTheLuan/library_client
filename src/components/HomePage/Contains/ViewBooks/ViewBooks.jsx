import productsApi from "apis/productsApi";
import ButtonAddCarts from "components/customComponents/ButtonHandleCarts/ButtonAddCarts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { selectBooks, selectTotalBooks } from "reducers/bookSlice";
import "./ViewBooks.scss";

export const ViewBooks = () => {
  let { path } = useRouteMatch();

  const bookUpdate = useSelector(selectBooks);

  //Danh sách những cuốn sách
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const checkAuthorName = (author) => {
    return author;
  };

  //Lần 1
  useEffect(() => {
    getAllProducts();
  }, []);

  //After search
  useEffect(() => {
    setProducts(bookUpdate);
  }, [bookUpdate]);

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
      <div key={index} className="menuBooks_list_items">
        <div
          className="menuBooks_list_items_img"
          onClick={() => history.push(`${path}/details/${product.id}`)}
        >
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
            <ButtonAddCarts product={product} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="menuBooks">
      <div className="menuBooks_list">{listBooks}</div>
    </div>
  );
};

import productsApi from "apis/productsApi";
import ButtonAddCarts from "components/customComponents/ButtonHandleCarts/ButtonAddCarts";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { selectBooks, selectTotalBooks } from "reducers/bookSlice";
import "./BookHome.scss";

export const BookHome = () => {
  let { path } = useRouteMatch();

  const bookUpdate = useSelector(selectBooks);

  //Danh sách những cuốn sách
  const [books, setBooks] = useState([]);
  const history = useHistory();

  const checkAuthorName = (author) => {
    return author;
  };

  //Lần 1
  useEffect(() => {
    getAllBooks();
  }, []);

  //After search
  useEffect(() => {
    console.log(books);
    setBooks(bookUpdate);
  }, [bookUpdate]);

  const getAllBooks = async () => {
    try {
      const response = await productsApi.getBooks();
      console.log(response);
      setBooks(response.results);
    } catch (error) {
      console.log("err trang getProducts ", error);
    }
  };

  const renderBook = books?.map((book) => {
    return (
      <Card className="menuBooks_items">
        <Card.Img
          variant="top"
          src={book.cover}
          onClick={() => viewDetails(book.id)}
        />
        <Card.Body onClick={() => viewDetails(book.id)}>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <ButtonAddCarts product={book}>Thêm vào giỏ</ButtonAddCarts>
        </Card.Footer>
      </Card>
    );
  });

  const viewDetails = (bookId) => {
    history.push(`${path}/book/${bookId}`);
  };

  return <div className="menuBooks">{renderBook}</div>;
};

import productsApi from "apis/productsApi";
import ButtonAddCarts from "components/customComponents/ButtonHandleCarts/ButtonAddCarts";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { selectBooks, selectTotalBooks } from "reducers/bookSlice";
import "./BookHome.scss";

export const BookHome = ({ searchInfo }) => {
  let { path } = useRouteMatch();
  // console.log(searchInfo);

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

  //Khi có categories
  useEffect(() => {
    getAllBooks(searchInfo);
  }, [searchInfo]);

  //After search
  useEffect(() => {
    // console.log(books);
    setBooks(bookUpdate);
  }, [bookUpdate]);

  const getAllBooks = async (searchInfo) => {
    const params = {
      ...searchInfo,
      limit: 8,
    };
    try {
      const response = await productsApi.getBooks(params);
      // console.log(response);
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
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
            Tác giả: <strong> {book.authors}</strong> <br />
            Thể loại: <strong> {book.categories}</strong>
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

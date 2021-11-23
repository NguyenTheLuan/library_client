import productsApi from "apis/productsApi";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import { useHistory, useRouteMatch } from "react-router";

import "./BookRelate.scss";

function BookByAuthor({ authorName, bookId }) {
  const history = useHistory();
  const { path } = useRouteMatch();

  const breakPoints = [
    {
      width: 1,
      itemsToShow: 1,
    },
    {
      width: 550,
      itemsToShow: 2,
    },
    {
      width: 768,
      itemsToShow: 3,
    },
    {
      width: 1200,
      itemsToShow: 4,
    },
  ];

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBookByAuthor(...authorName);
  }, [authorName]);

  //   useEffect(() => {
  //     console.log(books);
  //   }, [books]);

  const getBookByAuthor = async (authorName) => {
    try {
      const response = await productsApi.getBooks({
        authors: authorName,
      });
      setBooks(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleViewDetail = (bookId) => {
    history.push(`${path.split(":")[0]}${bookId}`);
  };

  const renderBooks = books?.map((book, index) => {
    if (book.id !== bookId) {
      return (
        <Card key={index}>
          <Card.Img variant="top" src={book.cover} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              <strong>Tác giả </strong>
              {book.authors}
              <br /> <strong>Thể loại </strong>
              {book.categories}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => handleViewDetail(book.id)}>
              Xem chi tiết
            </Button>
          </Card.Footer>
        </Card>
      );
    }
  });

  const renderCarousel = () => {
    if (books.length > 1) {
      return <Carousel breakPoints={breakPoints}>{renderBooks}</Carousel>;
    } else {
      return <span className="notFindRelate">Tạm thời chưa có cuốn nào</span>;
    }
  };

  return (
    <div className="carouselForm">
      <legend>Những sách cùng chung tác giả: {authorName}</legend>
      {renderCarousel()}
    </div>
  );
}

export default BookByAuthor;

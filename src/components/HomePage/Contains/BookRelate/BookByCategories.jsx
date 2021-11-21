import productsApi from "apis/productsApi";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import { useHistory, useRouteMatch } from "react-router";

import "./BookRelate.scss";

function BookByCategories({ categoriesName, bookId }) {
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
    getBookByCategories(...categoriesName);
  }, [categoriesName]);

  //   useEffect(() => {
  //     console.log(books);
  //   }, [books]);

  const getBookByCategories = async (categoriesName) => {
    try {
      const response = await productsApi.getBooks({
        categories: categoriesName,
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
        <Card key={index} onClick={() => handleViewDetail(book.id)}>
          <Card.Img variant="top" src={book.cover} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.categories}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button>Xem chi tiết</Button>
          </Card.Footer>
        </Card>
      );
    }
  });

  return (
    <div className="carouselForm">
      <legend>Cùng chung thể loại {categoriesName}</legend>
      <Carousel breakPoints={breakPoints}>{renderBooks}</Carousel>
    </div>
  );
}

export default BookByCategories;

import productsApi from "apis/productsApi";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import {
  createCarts,
  deleteCarts,
  selectCartCheckout,
} from "reducers/librarianSlice";

function Checkout() {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const booksCheckout = useSelector(selectCartCheckout);

  useEffect(() => {
    // console.log("có chạy lại mà");
    setBooks(booksCheckout);
  }, [booksCheckout]);

  const renderBooksCheckout = books.map((book, index) => {
    return (
      <tr>
        <th>{index + 1}</th>
        <th>{book}</th>
        <th>
          <button onClick={() => dispatch(deleteCarts(book))}>Xoá</button>
        </th>
      </tr>
    );
  });

  const checkoutBooks = async () => {
    const userId = path.split("/")[4];

    try {
      await productsApi.postCopiesCheckout({
        user: userId,
        copies: books,
      });
      console.log("cho mượn thành công");

      dispatch(createCarts([]));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleCheckout = () => {
    checkoutBooks();
  };

  return (
    <div>
      <legend> Các sách đã được đặt là</legend>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã số sách đặt</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderBooksCheckout}</tbody>
      </Table>
      <button onClick={handleCheckout}>Cho mượn</button>
    </div>
  );
}

export default Checkout;

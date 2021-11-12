import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCarts, selectCartCheckout } from "reducers/librarianSlice";

function CheckoutBooks() {
  const booksCheckout = useSelector(selectCartCheckout);
  const dispatch = useDispatch();
  const [books, setBooks] = useState();
  useEffect(() => {
    setBooks(booksCheckout);
  }, [booksCheckout]);

  const renderBooksCheckout = books?.map((book, index) => {
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
      <button>Cho mượn</button>
    </div>
  );
}

export default CheckoutBooks;

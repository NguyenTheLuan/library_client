import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartCheckout } from "reducers/librarianSlice";

function CheckoutBooks() {
  const booksCheckout = useSelector(selectCartCheckout);
  const [books, setBooks] = useState();
  useEffect(() => {
    setBooks(booksCheckout);
  }, [booksCheckout]);

  return (
    <div>
      Các sách đã được đặt là
      {booksCheckout[0]}
      {booksCheckout[1]}
      {booksCheckout[2]}
      <button>Cho mượn</button>
    </div>
  );
}

export default CheckoutBooks;

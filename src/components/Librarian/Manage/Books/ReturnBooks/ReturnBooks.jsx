import productsApi from "apis/productsApi";
import { renderStatus } from "constants/RenderDate";
import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createCarts,
  deleteCarts,
  selectCartCheckout,
  selectCartUserId,
} from "reducers/librarianSlice";

function ReturnBooks() {
  document.title = "Trả sách";

  const booksCart = useSelector(selectCartCheckout);

  const [bookId, setBookId] = useState();
  const [hide, setHide] = useState(false);
  const [booksReserved, setBooksReserved] = useState();

  const [cartsCheckout, setCartsCheckout] = useState();

  useEffect(() => {
    booksCart && setCartsCheckout(booksCart);
  }, [booksCart]);

  //Để update
  const [update, setUpdate] = useState(false);

  const handleUpdate = (status) => {
    setUpdate(status);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    bookId && getCheckBookCopies();
  }, [update, bookId]);

  const getCheckBookCopies = async () => {
    try {
      const response = await productsApi.getCheckCopies(bookId);
      setHide(true);
      console.log(response);
      setBooksReserved([response]);
    } catch (error) {
      alert("Hãy nhập đúng mã Copies sách");
      console.log("lỗi rồi", { error });
    }
  };

  // trả sách
  const postReturnBook = async (bookId) => {
    try {
      await productsApi.postCopiesReturn({ copies: [bookId] });
      alert("Trả sách thành công");
      setBookId();
    } catch (error) {
      console.log("lỗi rồi", { error });
      alert("Trả sách thất bại");
    }
  };

  //render component
  const setImg = (img) => {
    return <img style={{ width: "40px" }} src={img} alt="img" />;
  };

  const renderCarts = booksReserved?.map((books, index) => {
    return (
      <>
        <tr key={index}>
          <td>{setImg(books.cover)}</td>
          <td>{renderStatus(books.status)}</td>
          <td>{books.user.name}</td>
          <td>{books.id}</td>
          <td>{books.title}</td>
          <td>{books.categories}</td>
          <td>
            <Button
              variant="success"
              onClick={() => handleReturnBooks(books.id)}
            >
              Trả sách
            </Button>
          </td>
        </tr>
      </>
    );
  });

  const handleReturnBooks = (bookId) => {
    // console.log("trả sách có id", bookId);
    postReturnBook(bookId);
  };

  //render form
  const renderReservation = () => {
    if (hide) {
      return (
        <Table className="tableForm" striped bordered hover>
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Ảnh bìa</th>
              <th>Trạng thái</th>
              <th>Người mượn</th>
              <th>Mã sách</th>
              <th>Tên sách</th>
              <th>Thể loại</th>
              <th>Chọn sách</th>
            </tr>
          </thead>
          <tbody>{renderCarts}</tbody>
        </Table>
      );
    } else {
      return <h3>Không có gì để hiện, hãy nhập mã copies của sách</h3>;
    }
  };

  return (
    <div className="checkoutForm">
      <legend className="form_name">Quản lý trả sách người dùng</legend>
      {/* Search thông tin user */}
      <div className="checkoutForm_input">
        <FloatingLabel label="Nhập mã copies sách">
          <Form.Control
            placeholder="abcxyz"
            onChange={(e) => setBookId(e.target.value)}
          />
        </FloatingLabel>
        <Button onClick={getCheckBookCopies}>Tìm kiếm</Button>
      </div>

      {/* Hiện thị nội dung */}
      {renderReservation()}
    </div>
  );
}

export default ReturnBooks;

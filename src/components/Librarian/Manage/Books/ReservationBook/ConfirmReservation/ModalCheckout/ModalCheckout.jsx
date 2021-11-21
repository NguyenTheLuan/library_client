import productsApi from "apis/productsApi";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createCarts,
  deleteCarts,
  selectCartCheckout,
} from "reducers/librarianSlice";

function ModalCheckout({ userId, isShow, onShow, update, onUpdate }) {
  const dispatch = useDispatch();

  const booksCart = useSelector(selectCartCheckout);

  const [book, setBook] = useState();
  useEffect(() => {
    setBook(booksCart);
  }, [booksCart]);

  const handleClose = () => {
    // onUpdate(!update);
    onShow(false);
  };

  const handleDelete = (bookId) => {
    dispatch(deleteCarts(bookId));
  };

  const renderBooks = book?.map((bookId, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{bookId}</td>
        <td>
          <Button onClick={() => handleDelete(bookId)}>Xoá</Button>
        </td>
      </tr>
    );
  });

  const checkoutBooks = async () => {
    try {
      await productsApi.postCopiesCheckout({
        user: userId,
        copies: book,
      });
      alert("Cho mượn thành công");
      //set lại carts checkout
      dispatch(createCarts());
      onUpdate(!update);
      onShow(false);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleCheckout = () => {
    // console.log("Tiến hành cho mượn", book);

    if (book) {
      checkoutBooks();
    } else {
      alert("Chưa có cuốn nào");
    }
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Tiến hành cho mượn sách</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table hover bordered>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sách</th>
            </tr>
          </thead>
          <tbody>{renderBooks}</tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCheckout} variant="success">
          Cho mượn sách
        </Button>
        <Button onClick={handleClose} variant="secondary">
          Quay lại
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCheckout;

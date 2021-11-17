import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCarts, selectCartCheckout } from "reducers/librarianSlice";

function ModalCheckout({ userId, isShow, onShow }) {
  const dispatch = useDispatch();

  const booksCart = useSelector(selectCartCheckout);

  const [book, setBook] = useState();
  useEffect(() => {
    setBook(booksCart);
  }, [booksCart]);

  const handleClose = () => {
    return onShow(false);
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
      {/* <Modal.Footer>
       
      </Modal.Footer> */}
    </Modal>
  );
}

export default ModalCheckout;

import ModalDeleteBookId from "components/customComponents/Modals/ModalHandle/ModalDeleteBookId";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function DeleteBooks({ bookId, bookName }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
  };

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Xoá sách
      </Button>

      <ModalDeleteBookId
        onShow={onShow}
        isShow={show}
        bookName={bookName}
        bookId={bookId}
      />
    </div>
  );
}

export default DeleteBooks;

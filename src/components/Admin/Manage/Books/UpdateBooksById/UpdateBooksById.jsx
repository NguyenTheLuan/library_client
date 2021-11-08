import ModalUpdateBookById from "components/customComponents/Modals/ModalUpdateBookById";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function UpdateBooksById({ bookDetails }) {
  const [show, setShow] = useState(false);

  const [bookInfo, setBookInfo] = useState(bookDetails);
  const handleShow = () => {
    console.log(bookDetails);

    setShow(true);
  };

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Chỉnh sửa sách
      </Button>
      <ModalUpdateBookById
        bookDetails={bookInfo}
        onShow={onShow}
        isShow={show}
      />
    </>
  );
}

export default UpdateBooksById;

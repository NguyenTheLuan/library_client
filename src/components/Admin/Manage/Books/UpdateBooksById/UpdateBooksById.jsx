import ModalUpdateBookById from "components/customComponents/Modals/ModalForm/ModalUpdateBookById";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { FaEdit } from "react-icons/fa";

function UpdateBooksById({ bookDetails, onUpdate, update }) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
    onUpdate(!update);
  };

  return (
    <>
      <Button variant="none" onClick={handleShow}>
        <FaEdit style={{ fontSize: "30px", color: "#045B21" }} />
      </Button>
      <ModalUpdateBookById
        bookDetails={bookDetails}
        onShow={onShow}
        isShow={show}
      />
    </>
  );
}

export default UpdateBooksById;

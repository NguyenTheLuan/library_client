import ModalViewBookDetails from "components/customComponents/Modals/ModalForm/ModalViewBookDetails";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function ViewBookDetails({ bookDetails }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
  };
  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Xem chi tiết
      </Button>
      <ModalViewBookDetails
        onShow={onShow}
        isShow={show}
        bookDetails={bookDetails}
      />
    </>
  );
}

export default ViewBookDetails;

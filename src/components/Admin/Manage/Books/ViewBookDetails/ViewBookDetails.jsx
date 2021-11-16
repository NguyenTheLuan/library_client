import ModalViewBookDetails from "components/customComponents/Modals/ModalForm/ModalViewBookDetails";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { GoInfo } from "react-icons/go";

function ViewBookDetails({ bookDetails }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
  };
  return (
    <>
      <Button variant="none" onClick={handleShow}>
        <GoInfo style={{ fontSize: "30px", color: "#714FFC" }} />
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

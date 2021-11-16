import ModalIncreaseBooks from "components/customComponents/Modals/ModalHandle/ModalIncreaseBooks";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { GoPlus } from "react-icons/go";

function IncreaseBooks({ bookId, bookName, onUpdate, update }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
    onUpdate(!update);
  };
  return (
    <div>
      <Button variant="none" onClick={handleShow}>
        <GoPlus style={{ fontSize: "30px", color: "#0d6efd" }} />
      </Button>

      <ModalIncreaseBooks
        onShow={onShow}
        isShow={show}
        bookId={bookId}
        bookName={bookName}
      />
    </div>
  );
}

export default IncreaseBooks;

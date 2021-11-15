import ModalIncreaseBooks from "components/customComponents/Modals/ModalHandle/ModalIncreaseBooks";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

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
      <Button onClick={handleShow}>Tăng số lượng</Button>

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

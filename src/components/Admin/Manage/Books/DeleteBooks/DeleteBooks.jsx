import ModalDeleteBookId from "components/customComponents/Modals/ModalHandle/ModalDeleteBookId";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { GoTrashcan } from "react-icons/go";

function DeleteBooks({ bookId, bookName, onUpdate, update, onChangePage }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
    onUpdate(!update);
    onChangePage(1);
  };

  return (
    <div>
      <Button variant="none" onClick={handleShow}>
        <GoTrashcan style={{ fontSize: "30px", color: "red" }} />
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

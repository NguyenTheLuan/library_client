import ModalDeleteBookId from "components/customComponents/Modals/ModalDeleteBookId";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function DeleteBooks({ bookId, bookName }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    // console.log("cha nhận được từ con", isShow);
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
        title={"Tiến hành xoá sách"}
        body={`Xoá ${bookName}, bạn có chắc chắn xoá không?`}
        bookId={bookId}
      />
    </div>
  );
}

export default DeleteBooks;

import Modals from "components/customComponents/Modals/Modals";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function DeleteBooks({ bookId }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    // console.log("cha nhận được từ con", isShow);
    setShow(isShow);
    // return show;
  };

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Xoá sách
      </Button>

      <Modals
        onShow={onShow}
        isShow={show}
        title={"Tiến hành xoá sách"}
        body={"Bạn có chắc chắn xoá không?"}
        bookId={bookId}
      />
    </div>
  );
}

export default DeleteBooks;

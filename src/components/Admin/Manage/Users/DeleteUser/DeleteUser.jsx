import ModalDeleteUserId from "components/customComponents/Modals/ModalDeleteUserId";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
function DeleteUser({ userId, userEmail }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    // console.log("cha nhận được từ con", isShow);
    setShow(isShow);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Xoá người dùng
      </Button>
      <ModalDeleteUserId
        onShow={onShow}
        isShow={show}
        userEmail={userEmail}
        userId={userId}
      />
    </>
  );
}

export default DeleteUser;

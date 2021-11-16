import ModalDeleteUserId from "components/customComponents/Modals/ModalHandle/ModalDeleteUserId";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { GoTrashcan } from "react-icons/go";

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
      <Button variant="none" onClick={handleShow}>
        {/* Xoá người dùng */}
        <GoTrashcan style={{ fontSize: "30px", color: "red" }} />
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

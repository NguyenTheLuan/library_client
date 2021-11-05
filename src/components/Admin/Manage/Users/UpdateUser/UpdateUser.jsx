import ModalUpdateUserInfo from "components/customComponents/Modals/ModalUpdateUserInfo";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function UpdateUser({ userId }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  //Nhận props từ con
  const onShow = (isShow) => {
    // console.log("cha nhận được từ con", isShow);
    setShow(isShow);
  };
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Thay đổi thông tin
      </Button>
      <ModalUpdateUserInfo onShow={onShow} isShow={show} userId={userId} />
    </>
  );
}

export default UpdateUser;

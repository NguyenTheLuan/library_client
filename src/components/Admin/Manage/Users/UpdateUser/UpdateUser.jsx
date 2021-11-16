import ModalUpdateUserInfo from "components/customComponents/Modals/ModalForm/ModalUpdateUserInfo";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { FaEdit } from "react-icons/fa";

function UpdateUser({ userInfo, onUpdate, update }) {
  // console.log("update user nhận từ view user", userInfo);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
    onUpdate(!update);
  };
  return (
    <>
      <Button variant="none" onClick={handleShow}>
        {/* Thay đổi thông tin */}
        <FaEdit style={{ fontSize: "30px", color: "#045B21" }} />
      </Button>
      <ModalUpdateUserInfo onShow={onShow} isShow={show} userInfo={userInfo} />
    </>
  );
}

export default UpdateUser;

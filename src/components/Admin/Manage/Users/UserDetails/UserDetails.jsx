import ModalViewUserDetails from "components/customComponents/Modals/ModalForm/ModalViewUserDetails";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { GoInfo } from "react-icons/go";

function UserDetails({ userInfo }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
  };
  return (
    <>
      <Button variant="none" onClick={handleShow}>
        {/* Xem chi tiết */}
        <GoInfo style={{ fontSize: "30px", color: "#714FFC" }} />
      </Button>

      <ModalViewUserDetails
        onShow={onShow}
        isShow={show}
        userDetails={userInfo}
      />
    </>
  );
}

export default UserDetails;

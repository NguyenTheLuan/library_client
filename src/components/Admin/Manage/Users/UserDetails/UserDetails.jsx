import ModalViewUserDetails from "components/customComponents/Modals/ModalViewUserDetails";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function UserDetails({ userInfo }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Nhận props từ con
  const onShow = (isShow) => {
    setShow(isShow);
  };
  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Xem chi tiết
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

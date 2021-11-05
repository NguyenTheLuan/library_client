import React from "react";
import { Button } from "react-bootstrap";
function UpdateUser({ userId }) {
  const handleClick = () => {
    console.log("cập nhật user có id:", userId);
  };
  return (
    <>
      <Button variant="success" onClick={handleClick}>
        Thay đổi thông tin
      </Button>
    </>
  );
}

export default UpdateUser;

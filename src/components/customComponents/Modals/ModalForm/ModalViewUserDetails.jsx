import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalViewUserDetails({ isShow, onShow, userDetails }) {
  // console.log(userDetails);
  const handleClose = () => {
    return onShow(false);
  };

  //render components

  const countExpired = (copies) => {
    const times = copies.filter((time) => time.status === "expired");
    return times.length;
  };
  const countSuccess = (copies) => {
    const times = copies.filter((time) => time.status === "fulfilled");
    return times.length;
  };
  const countCopies = (copies) => {
    return copies.length;
  };
  const checkEmail = (status) => {
    if (status) {
      return <span>(đã kích hoạt)</span>;
    } else {
      return <span style={{ color: "red" }}>(chưa kích hoạt)</span>;
    }
  };

  const RenderInfo = () => {
    return (
      <div className="detailsUsers">
        <div>
          <strong>Tên người dùng: </strong>
          {userDetails.name}
        </div>
        <div>
          <strong>Mã ID người dùng: </strong>
          {userDetails.id}
        </div>
        <div>
          <strong>Địa chỉ email: </strong>
          {userDetails.email}
          {checkEmail(userDetails.isEmailVerified)}
        </div>
        <div>
          <strong>Trạng thái: </strong>
          {userDetails.status}
        </div>
        <div>
          <strong>Chức vụ: </strong>
          {userDetails.role}
        </div>
        <div>
          <strong>Tổng sách đang mượn: </strong>
          {countCopies(userDetails.books)} cuốn
        </div>
        <div>
          <strong>Số lần bỏ hẹn: </strong>
          {countExpired(userDetails.reservations)} lần
        </div>
        <div>
          <strong>Số lần đặt hẹn thành công: </strong>
          {countSuccess(userDetails.reservations)} lần
        </div>
      </div>
    );
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Thông tin chi tiết người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenderInfo />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalViewUserDetails;

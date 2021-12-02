import { renderBarCode, renderDate, renderDateNow, renderStatus } from "constants/RenderDate";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./ModalsForm.scss";

function ModalReservationDetails({ isShow, onShow, reservationDetails }) {
  // console.log("đã nhận được ", reservationDetails);
  //Thiết lập cho cha
  const handleClose = () => {
    return onShow(false);
  };

  //render components 
  const renderBooks = (books) => {
    if (books.length === 0) {
      return
    }
    else {
      return books.map(book => {
        return (
          <span>
            Tên sách: {book.book.title} - Mã copies: {renderBarCode(book.barcode, book.copy)}
          </span>
        )
      })
    }
  }



  const RenderBody = () => {
    return (
      <div className="detailsUsers">
        <div>
          <strong>Trạng thái mượn: </strong>
          {renderStatus(reservationDetails.status)}</div>
        <div>
          <strong>Người mượn: </strong>
          {reservationDetails.user.name} - <strong>Mã số: </strong>{reservationDetails.user.uid} </div>
        <div className="booksReservation">
          <div className="name"><strong>Sách đã mượn: </strong></div>
          <div className="bookName" >{renderBooks(reservationDetails.books)}</div>
        </div>
        <div>
          <strong>Ngày bắt đầu hẹn: </strong>
          {renderDateNow(reservationDetails.createdDate)}</div>
        <div>
          <strong>Ngày kết thúc hẹn: </strong>
          {renderDate(reservationDetails.dueDate)}</div>
      </div>
    )
  }



  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Thông tin chi tiết lịch hẹn người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <RenderBody />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>

  );
}

export default ModalReservationDetails;

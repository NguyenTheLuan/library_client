import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalViewBookDetails({ isShow, onShow, bookDetails }) {
  // console.log(bookDetails);
  const handleClose = () => {
    return onShow(false);
  };

  //render components
  const countCopies = (copies) => {
    return copies?.length;
  };
  const checkCopiesBooks = (copies) => {
    // console.log(copies);
    return copies.map((copy) => {
      if (copy.status === "available") {
        // return <span> {copy._id}</span>;
        return <span> {copy.barcode}</span>;
      }
    });
  };

  const renderImg = (img) => {
    return <img src={img} alt="img" />;
  };

  const RenderInfo = () => {
    return (
      <div className="detailsMenu">
        <div className="detailsMenu_cover">{renderImg(bookDetails.cover)}</div>

        <div className="detailsMenu_contents">
          <div>
            <strong>Tên sách: </strong>
            {bookDetails.title}
          </div>
          <div>
            <strong>Mã ID sách:</strong> {bookDetails.id}
          </div>
          <div>
            <strong>Tác giả:</strong> {bookDetails.authors}
          </div>
          <div>
            <strong>Thể loại:</strong> {bookDetails.categories}
          </div>
          <div>
            <strong>Thời gian mượn:</strong> {bookDetails.loanPeriodDays} ngày
          </div>
          <div>
            <strong>Số lượng còn lại</strong> {bookDetails.availableCopies}/
            {countCopies(bookDetails.copies)}
          </div>
          <div className="copies">
            <div className="nameCopies">
              <strong>Mã sách còn trống:</strong>
            </div>
            <div className="nameCopiesId">
              {checkCopiesBooks(bookDetails.copies)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Thông tin chi tiết sách</Modal.Title>
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

export default ModalViewBookDetails;

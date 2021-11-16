import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalViewBookDetails({ isShow, onShow, bookDetails }) {
  //   console.log(bookDetails);
  const handleClose = () => {
    return onShow(false);
  };

  //render components
  const countCopies = (copies) => {
    return copies?.length;
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
        </div>
      </div>
    );
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{bookDetails.title}</Modal.Title>
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

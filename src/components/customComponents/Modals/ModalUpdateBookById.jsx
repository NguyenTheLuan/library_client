import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Modals.scss";

function ModalUpdateBookById({ isShow, onShow, bookId }) {
  //Thiết lập cho cha
  const handleClose = () => {
    return onShow(false);
  };

  const handleClick = () => {
    console.log("cập nhật thông tin cho book có id: ", bookId);
  };

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header>Thay đổi thông tin người dùng</Modal.Header>
        <Modal.Body>
          <Form className="formMenu">
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Tên sách</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sách"
                className="formMenu_items_control"
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Ảnh bìa</Form.Label>
              <Form.Control
                name="cover"
                className="formMenu_items_control"
                type="file"
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Tác giả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên tác giả"
                className="formMenu_items_control"
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Thể loại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập thể loại sách"
                className="formMenu_items_control"
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mô tả"
                className="formMenu_items_control"
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">
                Số ngày mượn sách
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số ngày mượn sách"
                className="formMenu_items_control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClick}>
            Thay đổi thông tin
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Quay lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateBookById;

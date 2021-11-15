import productsApi from "apis/productsApi";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./ModalsForm.scss";

function ModalUpdateBookById({ isShow, onShow, bookDetails }) {
  //Thiết lập cho cha
  const handleClose = () => {
    return onShow(false);
  };

  // console.log(bookDetails);

  //Tên sách
  const [title, setTitle] = useState(bookDetails.title);
  //Số ngày mượn
  const [loanPeriodDays, setLoanPeriodDays] = useState(
    bookDetails.loanPeriodDays
  );
  // //Số lượng
  // const [copies, setCopies] = useState("");
  //Tên tác giả
  const [authors, setAuthors] = useState(bookDetails.authors);
  //Tiêu đề
  const [categories, setCategories] = useState(bookDetails.categories);
  //Mô tả
  const [description, setDescription] = useState(bookDetails.description);

  const [postImage, setPostImage] = useState();

  //Xử lí file ảnh
  const handleImgPost = (e) => {
    setPostImage(e.target.files[0]);
  };

  const updateBookById = async () => {
    const bookId = bookDetails.id;

    const formData = new FormData();
    // formData.append("cover", postImage);
    formData.append("title", title);
    formData.append("loanPeriodDays", loanPeriodDays);
    // formData.append("copies", copies);
    formData.append("authors", authors);
    formData.append("categories", categories);
    formData.append("description", description);
    try {
      await productsApi.updateBookById(bookId, formData);
      onShow(false);
      alert("Cập nhật thông tin sách thành công");
    } catch (error) {
      console.log("lỗi rồi", { error });
      alert(error.response.data.message);
      onShow(false);
    }
  };

  // console.log("cập nhật thông tin cho book có id: ", bookDetails);
  const handleClick = () => {
    updateBookById();
  };

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header>
          <span className="title">Thay đổi thông tin sách</span>
          <span className="note">(Chỉ nhập thông tin cần thay đổi)</span>
        </Modal.Header>
        <Modal.Body>
          <Form className="formMenu">
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Tên sách</Form.Label>
              <Form.Control
                value={title}
                type="text"
                placeholder="Nhập tên sách"
                className="formMenu_items_control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Ảnh bìa</Form.Label>
              <Form.Control
                name="cover"
                className="formMenu_items_control"
                type="file"
                onChange={handleImgPost}
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Tác giả</Form.Label>
              <Form.Control
                value={authors}
                type="text"
                placeholder="Nhập tên tác giả"
                className="formMenu_items_control"
                onChange={(e) => setAuthors(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Thể loại</Form.Label>
              <Form.Control
                type="text"
                value={categories}
                placeholder="Nhập thể loại sách"
                className="formMenu_items_control"
                onChange={(e) => setCategories(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">Mô tả</Form.Label>
              <Form.Control
                type="text"
                value={description}
                placeholder="Nhập mô tả"
                className="formMenu_items_control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="formMenu_items">
              <Form.Label className="formMenu_items_label">
                Số ngày mượn sách
              </Form.Label>
              <Form.Control
                type="text"
                value={loanPeriodDays}
                placeholder="Nhập số ngày mượn sách"
                className="formMenu_items_control"
                onChange={(e) => setLoanPeriodDays(e.target.value)}
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

import productsApi from "apis/productsApi";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addBookById, getBooks } from "reducers/bookSlice";

import "components/Admin/Manage/AddForm.scss";
import CheckBoxAuthor from "components/customComponents/CheckBoxItems/CheckBoxAuthor";
import CheckBoxCategory from "components/customComponents/CheckBoxItems/CheckBoxCategory";

function AddBooks({ isShow, onShow }) {
  // const [bookCreate, setBookCreate] = useState({});
  const dispatch = useDispatch();
  //Tên sách
  const [title, setTitle] = useState("");
  //Số ngày mượn
  const [loanPeriodDays, setLoanPeriodDays] = useState("");
  //Số lượng
  const [copies, setCopies] = useState("");
  //Tên tác giả
  const [authors, setAuthors] = useState("");
  //Tiêu đề
  const [categories, setCategories] = useState("");
  //Mô tả
  const [description, setDescription] = useState("");
  //Ảnh
  const [postImage, setPostImage] = useState();

  const [error, setError] = useState("");
  const createBooks = async () => {
    // const infoBookCreate = { ...bookCreate, ...postImage };
    // console.log("đây là info sách muốn nhập", infoBookCreate);

    const formData = new FormData();
    formData.append("cover", postImage);
    formData.append("title", title);
    formData.append("loanPeriodDays", loanPeriodDays);
    formData.append("copies", copies);
    formData.append("authors", authors);
    formData.append("categories", categories);
    formData.append("description", description);

    // console.log("đây là formData", formData.entries());
    try {
      // await productsApi.postCreateBook(formData);
      const response = await productsApi.postCreateBook(formData);
      // console.log("tạo sách thành công", response);
      // setError("Tạo sách thành công");
      setError("");
      alert("Tạo thành công");
      //Truyền vô redux
      dispatch(addBookById(response));
      //reset lại
      handleReset();
      //Tắt form
      onShow(false);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setError(error.response.data.message);
    }
  };

  //Xử lí ảnh
  const handleImgPost = (e) => {
    // setPostImage({ [e.target.name]: e.target.files[0] });
    setPostImage(e.target.files[0]);
  };

  // useEffect(() => {
  //   console.log("img đã nhận", postImage);
  // }, [postImage]);

  const handleReset = () => {
    setCopies("");
    setDescription("");
    setLoanPeriodDays("");
    setTitle("");
    setAuthors("");
    // setPostImage("");
    setCategories("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setBookCreate({ ...bookCreate, ...img });
    // console.log("dữ liệu đã nhập", bookCreate);
    createBooks();
  };

  //Thiết lập cho cha
  const handleClose = () => {
    setShowAuthor(true);
    setShowCategories(true);
    return onShow(false);
  };
  const handleAuthorsName = (authorName) => {
    console.log("cha đã nhận được authorname", authorName);
  };
  const handleCategoriesName = (categoriesName) => {
    console.log("cha đã nhận được authorname", categoriesName);
  };

  //Dùng để disabled authors, actegories
  const [showAuthor, setShowAuthor] = useState(true);
  const [showCategories, setShowCategories] = useState(true);

  return (
    <Modal show={isShow} onHide={handleClose}>
      {/* <Modal.Header>
        <Modal.Title>Nhập sách mới</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <Form className="form" onSubmit={handleSubmit}>
          {error && <h2>{error}</h2>}
          <legend className="form_name">Tạo mới một đầu sách</legend>
          <Form.Group className="mb-3 form_items"></Form.Group>
          <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">Tên sách</Form.Label>
            <Form.Control
              value={title}
              name="title"
              className="form_items_input"
              type="text"
              placeholder="Nhập tên tên sách"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">
              Ảnh bìa của sách
            </Form.Label>
            <Form.Control
              // value={postImage}
              name="cover"
              className="form_items_input"
              type="file"
              onChange={handleImgPost}
            />
          </Form.Group>
          {/* Form tác giả */}
          <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">Tác giả</Form.Label>
            <CheckBoxAuthor
              onAuthorName={handleAuthorsName}
              status={showAuthor}
            />
            <Form.Control
              className="form_items_input"
              placeholder="Nhập tên tác giả mới"
              disabled={!showAuthor}
            />
            <Form.Check
              label="Thêm tác giả mới"
              onClick={() => setShowAuthor(!showAuthor)}
            />
          </Form.Group>
          {/* Form thể loại */}
          <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">Thể loại</Form.Label>
            <CheckBoxCategory
              onCategoryName={handleCategoriesName}
              status={showCategories}
            />
            <Form.Control
              className="form_items_input"
              placeholder="Nhập tên thể loại mới"
              disabled={!showCategories}
            />
            <Form.Check
              label="Thêm thể loại mới"
              onClick={() => setShowCategories(!showCategories)}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">Tác giả</Form.Label>
            <Form.Control
              value={authors}
              name="authors"
              className="form_items_input"
              type="text"
              placeholder="Nhập tên tác giả"
              onChange={(e) => setAuthors(e.target.value)}
            />
          </Form.Group> */}
          {/* <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">Thể loại</Form.Label>
            <Form.Control
              value={categories}
              name="categories"
              className="form_items_input"
              type="text"
              placeholder="Nhập tên thể loại"
              onChange={(e) => setCategories(e.target.value)}
            />
          </Form.Group> */}
          <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">Mô tả</Form.Label>
            <Form.Control
              value={description}
              name="description"
              className="form_items_input"
              type="text"
              placeholder="Nhập tên mô tả"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">
              Số ngày mượn sách
            </Form.Label>
            <Form.Control
              value={loanPeriodDays}
              name="loanPeriodDays"
              className="form_items_input"
              type="text"
              placeholder="Nhập số ngày mà người mượn có thể mượn sách"
              onChange={(e) => setLoanPeriodDays(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 form_items">
            <Form.Label className="form_items_label">Số lượng</Form.Label>
            <Form.Control
              value={copies}
              name="copies"
              className="form_items_input"
              type="text"
              placeholder="Nhập số lượng"
              onChange={(e) => setCopies(e.target.value)}
            />
          </Form.Group>
          <div className="btnSubmit">
            <Button type="submit" variant="primary">
              Thêm sách mới
            </Button>
            <Button variant="danger" onClick={handleReset}>
              Nhập lại
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Quay lại
            </Button>
          </div>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
}

export default AddBooks;

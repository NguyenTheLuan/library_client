import productsApi from "apis/productsApi";
import "components/Admin/Manage/ManageForm.scss";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function AddBooks() {
  // const [bookCreate, setBookCreate] = useState({});
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
      await productsApi.postCreateBook(formData);
      // const response = await productsApi.postCreateBook(formData);
      // console.log("tạo sách thành công", response);
      setError("Tạo sách thành công");
      alert("Tạo thành công");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // setBookCreate({ ...bookCreate, ...img });
    // console.log("dữ liệu đã nhập", bookCreate);
    createBooks();
  };
  return (
    <Form className="form" onSubmit={handleSubmit}>
      {error && <h2>{error}</h2>}
      <legend className="form_name">Tạo mới một đầu sách</legend>
      <Form.Group className="mb-3 form_items"></Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Tên sách</Form.Label>
        <Form.Control
          name="title"
          className="form_items_input"
          type="text"
          placeholder="Nhập tên tên sách"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Ảnh bìa của sách</Form.Label>
        <Form.Control
          name="cover"
          className="form_items_input"
          type="file"
          placeholder="Nhập link hình ảnh"
          onChange={handleImgPost}
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Tác giả</Form.Label>
        <Form.Control
          name="authors"
          className="form_items_input"
          type="text"
          placeholder="Nhập tên tác giả"
          onChange={(e) => setAuthors(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Thể loại</Form.Label>
        <Form.Control
          name="categories"
          className="form_items_input"
          type="text"
          placeholder="Nhập tên thể loại"
          onChange={(e) => setCategories(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Mô tả</Form.Label>
        <Form.Control
          name="description"
          className="form_items_input"
          type="text"
          placeholder="Nhập tên mô tả"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Số ngày mượn sách</Form.Label>
        <Form.Control
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
        <Button variant="warning">Nhập lại</Button>
      </div>
    </Form>
  );
}

export default AddBooks;

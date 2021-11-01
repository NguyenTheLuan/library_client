import productsApi from "apis/productsApi";
import "components/Admin/Manage/ManageForm.scss";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function AddBooks() {
  const [bookCreate, setBookCreate] = useState({});
  const [error, setError] = useState("");
  const createBooks = async () => {
    const infoBookCreate = { ...bookCreate };
    try {
      const response = await productsApi.postCreateBook(infoBookCreate);
      console.log("tạo sách thành công", response);
    } catch (error) {
      console.log("lỗi rồi", { error });
      setError(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookCreate);
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
          onChange={(e) =>
            setBookCreate({ ...bookCreate, [e.target.name]: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Ảnh bìa của sách</Form.Label>
        <Form.Control
          name="cover"
          className="form_items_input"
          type="file"
          placeholder="Nhập link hình ảnh"
          onChange={(e) =>
            setBookCreate({ ...bookCreate, [e.target.name]: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Tác giả</Form.Label>
        <Form.Control
          name="authors"
          className="form_items_input"
          type="text"
          placeholder="Nhập tên tác giả"
          onChange={(e) =>
            setBookCreate({ ...bookCreate, [e.target.name]: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Thể loại</Form.Label>
        <Form.Control
          name="categories"
          className="form_items_input"
          type="text"
          placeholder="Nhập tên thể loại"
          onChange={(e) =>
            setBookCreate({ ...bookCreate, [e.target.name]: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Mô tả</Form.Label>
        <Form.Control
          name="description"
          className="form_items_input"
          type="text"
          placeholder="Nhập tên mô tả"
          onChange={(e) =>
            setBookCreate({ ...bookCreate, [e.target.name]: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Số ngày mượn sách</Form.Label>
        <Form.Control
          name="loanPeriodDays"
          className="form_items_input"
          type="text"
          placeholder="Nhập số ngày mà người mượn có thể mượn sách"
          onChange={(e) =>
            setBookCreate({ ...bookCreate, [e.target.name]: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Số lượng</Form.Label>
        <Form.Control
          name="copies"
          className="form_items_input"
          type="text"
          placeholder="Nhập số lượng"
          onChange={(e) =>
            setBookCreate({ ...bookCreate, [e.target.name]: e.target.value })
          }
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

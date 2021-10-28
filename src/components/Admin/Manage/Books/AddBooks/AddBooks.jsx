import React from "react";
import { Form, Button } from "react-bootstrap";
import "components/Admin/Manage/ManageForm.scss";

function AddBooks() {
  return (
    <Form className="form">
      <legend className="form_name">Tạo mới một đầu sách</legend>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Tên sách</Form.Label>
        <Form.Control
          className="form_items_input"
          name="title"
          type="text"
          placeholder="Nhập tên tên sách"
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Ảnh bìa của sách</Form.Label>
        <Form.Control
          className="form_items_input"
          name="cover"
          type="text"
          placeholder="Nhập link hình ảnh"
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Tác giả</Form.Label>
        <Form.Control
          className="form_items_input"
          name="authors"
          type="text"
          placeholder="Nhập tên tác giả"
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Thể loại</Form.Label>
        <Form.Control
          className="form_items_input"
          name="categories"
          type="text"
          placeholder="Nhập tên thể loại"
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Mô tả</Form.Label>
        <Form.Control
          className="form_items_input"
          name="description"
          type="text"
          placeholder="Nhập tên mô tả"
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Số ngày mượn sách</Form.Label>
        <Form.Control
          className="form_items_input"
          name="loanPeriodDays"
          type="text"
          placeholder="Nhập số ngày mà người mượn có thể mượn sách"
        />
      </Form.Group>
      <Form.Group className="mb-3 form_items">
        <Form.Label className="form_items_label">Số lượng</Form.Label>
        <Form.Control
          className="form_items_input"
          name="copies"
          type="text"
          placeholder="Nhập số lượng"
        />
      </Form.Group>
      <Button type="submit">Thêm sách mới</Button>
    </Form>
  );
}

export default AddBooks;

import React from "react";
import { Button, Form } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import "./SearchForm.scss";

function SearchForm() {
  return (
    <>
      <Form className="formSearch">
        <Form.Group className="formSearch_items">
          <Form.Label className="formLabel"></Form.Label>
          <Form.Control
            className="formInput"
            type="input"
            placeholder="Nhập tên sách bạn muốn tìm"
          ></Form.Control>
          <Button className="formSearch">
            <GoSearch />
            Tìm kiếm
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default SearchForm;

import AddBooks from "components/Admin/Manage/Books/AddBooks/AddBooks";
import CheckBoxAuthor from "components/customComponents/CheckBoxItems/CheckBoxAuthor";
import CheckBoxCategory from "components/customComponents/CheckBoxItems/CheckBoxCategory";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

import "./SearchForm.scss";

function SearchBooksAdmin({ onChangeInfo, onUpdate, update }) {
  //Search Form
  const [searchInfo, setSearchInfo] = useState({});

  const handleSubmit = () => {
    onChangeInfo(searchInfo);
  };

  const handleForm = (e) => {
    e.preventDefault();
  };

  //Xử lý tên tác giả
  const handleAuthorsName = (authorName) => {
    //Nhận tên tác giả
    const { authors } = authorName;
    // console.log("cha đã nhận đƯợc tên tác giả là", authorName);
    setSearchInfo({ ...searchInfo, authors });
  };
  //Xử lý tên danh mục
  const handleCategoriesName = (categoryName) => {
    //Nhận tên danh mục
    const { categories } = categoryName;
    setSearchInfo({ ...searchInfo, categories });
  };

  //Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const onShow = (isShow) => {
    setShow(isShow);
    onUpdate(!update);
  };

  useEffect(() => {
    onChangeInfo(searchInfo);
  }, [searchInfo]);

  return (
    <>
      <Form className="formSearch" onSubmit={handleForm}>
        <div className="inputForm">
          <Form.Group className="inputForm_items">
            <Form.Label className="inputForm_items_label">Tên sách</Form.Label>
            <Form.Control
              name="title"
              className="inputForm_items_control"
              placeholder="Nhập tên sách bạn muốn tìm"
              onChange={(e) => {
                if (e.target.value !== "") {
                  setSearchInfo({
                    ...searchInfo,
                    [e.target.name]: e.target.value,
                  });
                } else {
                  setSearchInfo({
                    ...searchInfo,
                    [e.target.name]: " ",
                  });
                }
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            className="inputForm_button"
            type="submit"
            onClick={handleSubmit}
          >
            <GoSearch className="icon" />
            <span className="title">Tìm kiếm</span>
          </Button>
          <Button
            className="inputForm_button"
            type="submit"
            onClick={handleShow}
          >
            <BsPlusLg className="icon" />
            <span className="title">Thêm sách</span>
          </Button>
        </div>

        <div className="checkboxForm">
          <Form.Group className="checkboxForm_items">
            <Form.Label className="checkboxForm_items_label">
              Sắp xếp
            </Form.Label>
            <Form.Select
              name="sortBy"
              className="checkboxForm_items_control"
              onChange={(e) =>
                setSearchInfo({
                  ...searchInfo,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value="title:asc">Tăng dần</option>
              <option value="title:desc">Giảm dần</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="checkboxForm_items">
            <CheckBoxAuthor onAuthorName={handleAuthorsName} />
          </Form.Group>
          <Form.Group className="checkboxForm_items">
            <CheckBoxCategory onCategoryName={handleCategoriesName} />
          </Form.Group>
        </div>
      </Form>

      {/* modal */}
      <AddBooks onShow={onShow} isShow={show} />
    </>
  );
}

export default SearchBooksAdmin;

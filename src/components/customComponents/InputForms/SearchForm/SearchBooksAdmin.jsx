import AddBooks from "components/Admin/Manage/Books/AddBooks/AddBooks";
import CheckBoxAuthor from "components/customComponents/CheckBoxItems/CheckBoxAuthor";
import CheckBoxCategory from "components/customComponents/CheckBoxItems/CheckBoxCategory";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import "./SearchForm.scss";

function SearchBooksAdmin({ onChangeInfo }) {
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
  };

  return (
    <>
      <Form className="formSearchAdmin" onSubmit={handleForm}>
        <div className="formSearchAdmin_order">
          <div className="formSearchAdmin_order_items">
            <div onClick={() => handleSubmit()}>
              <Form.Select
                name="sortBy"
                className="formSearchAdmin_order_items_select"
                onChange={(e) =>
                  setSearchInfo({
                    ...searchInfo,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option>Sắp xếp</option>
                <option value="title:asc">{`A -> Z`}</option>
                <option value="title:desc">{`Z -> A`}</option>
              </Form.Select>
            </div>

            <Button
              variant="primary"
              className="formSearchAdmin_order_items_btn"
              type="submit"
              onClick={handleSubmit}
            >
              <GoSearch className="icon" />
              <span className="title">Tìm kiếm</span>
            </Button>
            <Button
              className="formSearchAdmin_order_items_btn"
              type="submit"
              onClick={handleShow}
            >
              <BsPlusLg className="icon" />
              <span className="title">Thêm sách</span>
            </Button>
          </div>
        </div>
        <div className="formSearchAdmin_search">
          {/* Tên sách */}
          <Form.Group className="formSearchAdmin_search_items">
            <Form.Label className="formLabel"></Form.Label>
            <Form.Control
              name="title"
              className="formInput"
              placeholder="Nhập tên sách bạn muốn tìm"
              onChange={(e) =>
                setSearchInfo({
                  ...searchInfo,
                  [e.target.name]: e.target.value,
                })
              }
            ></Form.Control>
          </Form.Group>

          {/* Tên tác giả */}
          <div onClick={() => handleSubmit()}>
            <CheckBoxAuthor onAuthorName={handleAuthorsName} />
          </div>

          {/* Thể loại sách */}
          <div onClick={() => handleSubmit()}>
            <CheckBoxCategory onCategoryName={handleCategoriesName} />
          </div>
        </div>
      </Form>

      {/* modal */}
      <AddBooks onShow={onShow} isShow={show} />
    </>
  );
}

export default SearchBooksAdmin;

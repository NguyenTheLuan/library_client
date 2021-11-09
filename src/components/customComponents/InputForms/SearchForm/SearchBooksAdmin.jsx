import productsApi from "apis/productsApi";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getBooks } from "reducers/bookSlice";
import CheckBoxAuthor from "components/customComponents/CheckBoxItems/CheckBoxAuthor";
import CheckBoxCategory from "components/customComponents/CheckBoxItems/CheckBoxCategory";
import AddBooks from "components/Admin/Manage/Books/AddBooks/AddBooks";
import "./SearchForm.scss";

function SearchBooksAdmin({ limit, newPage, onTotalRow }) {
  //Search Form
  const [searchInfo, setSearchInfo] = useState({});
  const dispatch = useDispatch();

  // console.log("trang search", limit, newPage);
  const getBook = async () => {
    const params = { page: newPage, limit: limit, ...searchInfo };
    try {
      const response = await productsApi.searchBooks(params);
      console.log("sách sau khi search là", response);
      //Truyền tổng books cho cha để phân trang
      onTotalRow(response.totalResults);
      //Truyền vô redux
      dispatch(getBooks(response.results));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleSubmit = () => {
    // console.log("thông tin cần search là", searchInfo);
    getBook();
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
    // console.log("tiến hành cập nhật", searchInfo);
  };
  //Xử lý tên danh mục
  const handleCategoriesName = (categoryName) => {
    //Nhận tên danh mục
    const { categories } = categoryName;
    setSearchInfo({ ...searchInfo, categories });
    // console.log("tiến hành cập nhật", searchInfo);
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
            <div onClick={() => getBook()}>
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
          <div onClick={() => getBook()}>
            <CheckBoxAuthor onAuthorName={handleAuthorsName} />
          </div>

          {/* Thể loại sách */}
          <div onClick={() => getBook()}>
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

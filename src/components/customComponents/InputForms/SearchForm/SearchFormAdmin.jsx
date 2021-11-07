import productsApi from "apis/productsApi";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getBooks } from "reducers/bookSlice";
import "./SearchForm.scss";
import AddBooks from "components/Admin/Manage/Books/AddBooks/AddBooks";

function SearchFormAdmin() {
  //Search Form
  const [searchInfo, setSearchInfo] = useState({});
  const dispatch = useDispatch();
  const getBook = async () => {
    try {
      const response = await productsApi.searchBooks(searchInfo);
      console.log("sách sau khi search là", response);
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

            <Button
              variant="secondary"
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
          <Form.Group className="formSearchAdmin_search_items">
            <Form.Label className="formLabel"></Form.Label>
            <Form.Control
              name="authors"
              className="formInput"
              placeholder="Nhập tên sách tác giả"
              onChange={(e) =>
                setSearchInfo({
                  ...searchInfo,
                  [e.target.name]: e.target.value,
                })
              }
            ></Form.Control>
          </Form.Group>

          {/* Thể loại sách */}
          <Form.Group className="formSearchAdmin_search_items">
            <Form.Label className="formLabel"></Form.Label>
            <Form.Control
              name="categories"
              className="formInput"
              placeholder="Nhập thể loại sách"
              onChange={(e) =>
                setSearchInfo({
                  ...searchInfo,
                  [e.target.name]: e.target.value,
                })
              }
            ></Form.Control>
          </Form.Group>
        </div>
      </Form>

      {/* modal */}
      <AddBooks onShow={onShow} isShow={show} />
    </>
  );
}

export default SearchFormAdmin;

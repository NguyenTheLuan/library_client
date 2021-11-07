import productsApi from "apis/productsApi";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { useDispatch } from "react-redux";
import { getBooks } from "reducers/bookSlice";
import "./SearchForm.scss";

function SearchFormAdmin() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("thông tin cần search là", searchInfo);
    getBook();
  };
  return (
    <>
      <Form className="formSearchAdmin" onSubmit={handleSubmit}>
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
              <option value="title:asc">{`a -> z`}</option>
              <option value="title:desc">{`z -> a`}</option>
            </Form.Select>

            <Button className="formSearchAdmin_order_items_btn" type="submit">
              <GoSearch />
              Tìm kiếm
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
    </>
  );
}

export default SearchFormAdmin;

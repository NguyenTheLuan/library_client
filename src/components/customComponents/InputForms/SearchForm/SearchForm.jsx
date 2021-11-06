import productsApi from "apis/productsApi";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { useDispatch } from "react-redux";
import { getAllProduct } from "reducers/bookSlice";
import "./SearchForm.scss";

function SearchForm() {
  const [searchInfo, setSearchInfo] = useState("");
  const dispatch = useDispatch();
  const searchBooks = async () => {
    try {
      const response = await productsApi.searchBooks(searchInfo);
      //   console.log("đã search ra được", response);
      dispatch(getAllProduct(response.results));
    } catch (error) {
      console.log("lỗi tại search", { error });
    }
  };

  const handleSearch = (e) => {
    // console.log("sẽ search với thông tin:", searchInfo);
    e.preventDefault();
    searchBooks();
  };
  return (
    <>
      <Form className="formSearch" onSubmit={handleSearch}>
        <Form.Group className="formSearch_items">
          <Form.Label className="formLabel"></Form.Label>
          <Form.Control
            className="formInput"
            type="input"
            placeholder="Nhập tên sách bạn muốn tìm"
            onChange={(e) => setSearchInfo(e.target.value)}
          ></Form.Control>
          <Button className="formSearch" type="submit">
            <GoSearch />
            Tìm kiếm
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default SearchForm;

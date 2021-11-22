import productsApi from "apis/productsApi";
import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import { useDispatch } from "react-redux";
import { getBooks } from "reducers/bookSlice";
import "./SearchForm.scss";

function SearchForm() {
  //Debounce typing
  const typingRef = useRef(null);

  const [searchInfo, setSearchInfo] = useState("");
  const dispatch = useDispatch();

  //search books
  const searchBooks = async () => {
    try {
      const response = await productsApi.searchBooks(searchInfo);
      //   console.log("đã search ra được", response);
      dispatch(getBooks(response.results));
    } catch (error) {
      console.log("lỗi tại search", { error });
    }
  };

  const handleSearchByName = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      setSearchInfo({ [name]: value });
    }, 500);
  };

  const resetValue = () => {
    setSearchInfo({ title: "" });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    searchBooks();
    resetValue();
  };
  return (
    <>
      <Form className="formSearch" onSubmit={handleSearch}>
        <Form.Group className="inputForm" style={{ gap: "5px" }}>
          <Form.Label></Form.Label>
          <Form.Control
            value={searchInfo.title}
            style={{ flex: "4" }}
            name="title"
            className="inputForm_items_control"
            type="input"
            placeholder="Nhập tên sách bạn muốn tìm"
            onChange={handleSearchByName}
          ></Form.Control>
          <Button className="inputForm_button" type="submit">
            <GoSearch />
            Tìm kiếm
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default SearchForm;

import productsApi from "apis/productsApi";
import SearchForm from "components/customComponents/InputForms/SearchForm/SearchForm";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectBooks } from "reducers/bookSlice";
function CreateBooks() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const [bookInfo, setBookInfo] = useState([]);

  useEffect(() => {
    dispatch(getBooks([]));
  }, []);
  useEffect(() => {
    setBookInfo(books);
  }, [books]);

  const renderBooks = bookInfo?.map((info, index) => {
    return (
      <tr key={index}>
        <td>{info.title}</td>
        <td>{info.authors}</td>
        <td>{info.categories}</td>
        <td>{info.availableCopies}</td>
        <td>
          <Button
            variant="secondary"
            onClick={() => handleIncreaseBook(info.id)}
          >
            Nhập sách
          </Button>
        </td>
        {/* <td>{info.cover}</td> */}
        {/* <td>{info.copies}</td> */}
      </tr>
    );
  });

  const inscreaseBook = async (bookId) => {
    try {
      await productsApi.postCopies(bookId);
      // const response = await productsApi.postCopies(bookId);
      // console.log(response);
      alert("thêm thành công");
    } catch (error) {
      console.log("thêm 1 đầu sách bị lỗi", { error });
    }
  };

  const handleIncreaseBook = (bookId) => {
    inscreaseBook(bookId);
    // console.log("tăng cho sách có id", bookId);
  };

  return (
    <div>
      <div>
        <SearchForm />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Số lượng còn lại</th>
            <th>Tăng số lượng</th>
          </tr>
        </thead>
        <tbody>{renderBooks}</tbody>
      </Table>
      <Button variant="success">Tạo sách mới?</Button>
    </div>
  );
}

export default CreateBooks;

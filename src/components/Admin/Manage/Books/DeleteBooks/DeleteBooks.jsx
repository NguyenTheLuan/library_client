import productsApi from "apis/productsApi";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteBookById } from "reducers/bookSlice";

function DeleteBooks({ bookId }) {
  const dispatch = useDispatch();
  const deleteBookId = async () => {
    const id = bookId;
    console.log(id);
    try {
      await productsApi.postDeleteBookById(id);
      dispatch(deleteBookById(id));
      console.log("Thành công");
    } catch (error) {
      console.log("có lỗi", { error });
    }
  };
  const handleClick = () => {
    // console.log("đã lấy được Id", bookId);
    deleteBookId();
  };
  return (
    <div>
      <Button variant="danger" onClick={handleClick}>
        Xoá sách
      </Button>
    </div>
  );
}

export default DeleteBooks;

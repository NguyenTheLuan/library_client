import productsApi from "apis/productsApi";
import React, { useState } from "react";
import { FloatingLabel, Form, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCarts } from "reducers/librarianSlice";
import "./CheckBooks.scss";

function CheckBooks() {
  const [bookId, setBookId] = useState("");
  const [copies, setCopies] = useState();

  const dispatch = useDispatch();
  //Kiếm thông tin sách
  const getInfoCopies = async () => {
    try {
      const response = await productsApi.getBooksById(bookId);
      console.log("đã lấy ra thông tin sách", response);
      setCopies(response.copies);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderDate = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  // render
  const renderCopies = copies?.map((copy, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{copy.status}</td>
        <td>{copy._id}</td>
        {/* <td>{renderDate(copy.createdAt)}</td> */}
        <td>{renderDate(copy.borrowedDate)}</td>
        <td>{copy.user}</td>
        <td>
          <button type="checkbox" onClick={() => dispatch(addCarts(copy._id))}>
            Chọn sách
          </button>
        </td>
      </tr>
    );
  });

  return (
    // <div className="checkoutReservation">
    <div>
      {/* <div className="checkoutReservation_search"> */}
      <FloatingLabel
        // className="checkoutReservation_search_form"
        label="Nhập mã sách"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={(e) => setBookId(e.target.value)}
        />
      </FloatingLabel>
      <button onClick={getInfoCopies}>search danh sách</button>
      <div className="checkoutReservation_search_show">
        <Table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Trạng thái</th>
              <th>Mã sách</th>
              {/* <th>Ngày bắt đầu</th> */}
              <th>Ngày trả sách</th>
              <th>Người mượn</th>
              <th>Chọn sách</th>
            </tr>
          </thead>
          <tbody>{renderCopies}</tbody>
        </Table>
      </div>
      {/* </div> */}
      {/* <div className="checkoutReservation_checkout">Đặt sách</div> */}
    </div>
  );
}

export default CheckBooks;

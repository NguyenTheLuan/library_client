import productsApi from "apis/productsApi";
import React, { useState } from "react";
import { FloatingLabel, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { addCarts, selectCartUserId } from "reducers/librarianSlice";
import "./CheckBooks.scss";

function CheckBooks() {
  const [bookId, setBookId] = useState("");
  const [copies, setCopies] = useState();
  const selectUserId = useSelector(selectCartUserId);

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

  //render component
  const renderBtn = (status, bookId) => {
    if (status === "borrowed" || status === "reserved") {
      return <button disabled>Không đặt được</button>;
    } else {
      return (
        <button type="checkbox" onClick={() => dispatch(addCarts(bookId))}>
          Chọn sách
        </button>
      );
    }
  };
  const renderUserName = (userId) => {
    // console.log("userId", userId);
    const userReservedId = selectUserId;
    if (userReservedId === userId) {
      return <>Bạn là người mượn</>;
    } else {
      return <> {userId}</>;
    }
  };

  // render
  const renderCopies = copies?.map((copy, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{copy.status}</td>
        <td>{copy._id}</td>
        {/* <td>{renderDate(copy.createdAt)}</td> */}
        {/* <td>{renderDate(copy.borrowedDate)}</td> */}
        <td>{renderUserName(copy.user)}</td>
        <td>{renderBtn(copy.status, copy._id)}</td>
      </tr>
    );
  });

  return (
    // <div className="checkoutReservation">
    <div>
      {/* <div className="checkoutReservation_search"> */}
      <FloatingLabel
        // className="checkoutReservation_search_form"
        label="Nhập mã ID của sách"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={(e) => setBookId(e.target.value)}
        />
      </FloatingLabel>
      <button onClick={getInfoCopies}>Kiểm tra sách</button>
      <div className="checkoutReservation_search_show">
        <Table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Trạng thái</th>
              <th>Mã sách</th>
              {/* <th>Ngày bắt đầu</th> */}
              {/* <th>Ngày trả sách</th> */}
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

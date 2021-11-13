import productsApi from "apis/productsApi";
import React, { useState } from "react";
import { FloatingLabel, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCarts, selectCartUserId } from "reducers/librarianSlice";

function CheckCopies() {
  const selectUserId = useSelector(selectCartUserId);
  const [bookId, setBookId] = useState("");
  const [copies, setCopies] = useState();

  const dispatch = useDispatch();

  //Kiếm thông tin sách
  const getInfoCopies = async () => {
    try {
      const response = await productsApi.getCheckCopies(bookId);
      console.log("đã lấy ra thông tin sách", response);
      setCopies([response]);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  //render components
  const renderDate = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };
  const renderBtn = (status, copiesId) => {
    if (status === "borrowed" || status === "reserved") {
      return <button disabled>Không đặt được</button>;
    } else {
      return (
        <button type="checkbox" onClick={() => dispatch(addCarts(copiesId))}>
          Chọn sách
        </button>
      );
    }
  };
  // render userName
  const renderUser = (userId) => {
    const userReservedId = selectUserId;
    if (userReservedId === userId._id) {
      return <>Bạn là người mượn</>;
    } else {
      return <> {userId._id}</>;
    }
  };

  // render
  const renderCopies = copies?.map((copy, index) => {
    return (
      <tr key={index}>
        <td>{copy.status}</td>
        <td>{copy.title}</td>
        {/* <td>{renderDate(copy.createdAt)}</td> */}
        {/* Mã copies */}
        <td>{copy.id}</td>
        {/* Mã sách */}
        <td>{copy.book}</td>
        {/* <td>{renderDate(copy.borrowedDate)}</td> */}
        <td>{renderUser(copy.user)}</td>
        <td>{renderBtn(copy.status, copy.id)}</td>
      </tr>
    );
  });

  return (
    // <div className="checkoutReservation">
    <div>
      {/* <div className="checkoutReservation_search"> */}
      <FloatingLabel
        // className="checkoutReservation_search_form"
        label="Nhập mã Copies của sách"
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
              <th>Trạng thái</th>
              <th>Tên sách</th>
              <th>Mã copies sách</th>
              <th>Mã ID sách</th>
              {/* <th>Ngày bắt đầu</th> */}
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

export default CheckCopies;

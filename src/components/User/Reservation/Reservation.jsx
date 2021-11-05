import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/authSlice";

import "./Reservation.scss";

function Reservation() {
  const isUser = useSelector(selectUser);
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    // console.log(reservation);
    isUser && getReservation();
  }, []);

  const timeDate = (time) => {
    const date = new Date(time);
    return (
      <div className="cartTable_contents_rows_times_items">
        <span>
          Vào lúc {date.getHours() + 1} giờ : {date.getMinutes() + 1} phút :
          {date.getSeconds() + 1} giây.
        </span>
        <span>
          Ngày {date.getDate() + 1} tháng {date.getMonth() + 1} năm
          {date.getFullYear()}
        </span>
      </div>
    );
  };

  const showBooks = (booksInfo) => {
    // console.log("booksInfo", booksInfo);
    return booksInfo.map((details, index) => {
      return (
        <div key={index} className="cartTable_contents_rows_details_items">
          <img src={details.cover} />
          <span>{details.title}</span>
        </div>
      );
    });
  };

  const getReservation = async () => {
    try {
      const response = await userApi.getSchedule(isUser.id);
      console.log("thành công", response);
      //truyền vô state
      setReservation(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  // const showReservation = () => {
  //   console.log("reservation", reservation);
  // };

  const showReservation = reservation.map((details, index) => {
    return (
      <tr key={index} className="cartTable_contents_rows">
        <th className="cartTable_contents_rows_index">{index + 1}</th>
        <th className="cartTable_contents_rows_status">{details.status}</th>
        <th className="cartTable_contents_rows_details">
          {showBooks(details.books)}
        </th>
        <th className="cartTable_contents_rows_times">
          {timeDate(details.createdDate)}
        </th>
        <th className="cartTable_contents_rows_times">
          {timeDate(details.dueDate)}
        </th>
      </tr>
    );
  });

  return (
    <>
      <Table className="cartTable" striped bordered hover>
        <thead className="cartTable_header">
          <tr>
            <th>#</th>
            <th>Trạng thái</th>
            <th>Sách mượn bao gồm</th>
            <th>Ngày tạo</th>
            <th>Hạn chót</th>
          </tr>
        </thead>
        <tbody className="cartTable_contents">{showReservation}</tbody>
      </Table>
    </>
  );
}

export default Reservation;

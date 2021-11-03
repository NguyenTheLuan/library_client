import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/userSlice";

function Reservation() {
  const isUser = useSelector(selectUser);
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    // console.log(reservation);
    isUser && getReservation();
  }, []);

  const showBooks = (booksInfo) => {
    console.log("booksInfo", booksInfo);
    return booksInfo.map((details, index) => {
      return (
        <div key={index}>
          <h2>{details.title}</h2>
          <img src={details.cover} />
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
      <tr key={index}>
        <th>{index + 1}</th>
        <th>{details.status}</th>
        <th>{showBooks(details.books)}</th>
        <th>{details.createdDate}</th>
        <th>{details.dueDate}</th>
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

import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/authSlice";
import "./Reservation.scss";

function Reservation() {
  const isUser = useSelector(selectUser);
  const [reservation, setReservation] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log("huỷ thành công");
    isUser && getReservation();
  }, [update]);

  //render components
  const timeDate = (time) => {
    const date = new Date(time);
    return <>{date.toLocaleString()}</>;
  };

  const showBooks = (booksInfo) => {
    return booksInfo.map((details, index) => {
      return (
        <div key={index} className="cartTable_contents_rows_details_items">
          <img src={details.cover} alt="cover" />
          <span>{details.title}</span>
        </div>
      );
    });
  };

  const cancelButton = (status, reservedId) => {
    if (
      status === "canceled" ||
      status === "expired" ||
      status === "fulfilled"
    ) {
      return <Button disabled>Không thể huỷ</Button>;
    } else {
      return (
        <Button onClick={() => handleCancelReservation(reservedId)}>
          Huỷ lịch đặt
        </Button>
      );
    }
  };

  const getReservation = async () => {
    const userId = isUser.id;
    try {
      const response = await userApi.getSchedule(userId);
      // console.log("thành công", response);
      //truyền vô state
      setReservation(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleCancelReservation = async (reservedId) => {
    const userId = isUser.id;
    try {
      await userApi.postDeleteReservation(userId, reservedId);
      // const response = await userApi.postDeleteReservation(userId, reservedId);
      // console.log("thành công", response);
      alert("Huỷ lịch thành công");
      setUpdate(!update);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

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
        <th>{cancelButton(details.status, details.id)}</th>
      </tr>
    );
  });

  return (
    <>
      <Table className="cartTable" striped bordered hover>
        <thead className="cartTable_header">
          <tr>
            <th>STT</th>
            <th>Trạng thái</th>
            <th>Sách mượn bao gồm</th>
            <th>Ngày tạo</th>
            <th>Hạn chót</th>
            <th>Huỷ lịch</th>
          </tr>
        </thead>
        <tbody className="cartTable_contents">{showReservation}</tbody>
      </Table>
    </>
  );
}

export default Reservation;

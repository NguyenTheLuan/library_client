import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useRouteMatch } from "react-router";
function ReservationSchedule() {
  const { path } = useRouteMatch();
  const [reservation, setReservation] = useState();

  useEffect(() => {
    getInfoReservation();
  }, []);

  const getInfoReservation = async () => {
    const userId = path.split("/")[4];
    try {
      const response = await userApi.getSchedule(userId);
      console.log("thành công", response);
      setReservation(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const renderBook = (books) => {
    // console.log(books);
    return books?.map((info) => {
      return <h6>{info.title}</h6>;
    });
  };

  const rederReservation = reservation?.map((info, index) => {
    return (
      <tr>
        <td>{index}</td>
        {/* <td>{info.id}</td> */}
        <td>{renderBook(info.books)}</td>
        <td>{renderTime(info.createdDate)}</td>
        <td>{renderTime(info.dueDate)}</td>
        <td>{info.status}</td>
      </tr>
    );
  });

  return (
    <div>
      <legend>Danh sách lịch đã hẹn</legend>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            {/* <th>Mã sách</th> */}
            <th>Tên sách</th>
            <th>Ngày bắt đầu nhận</th>
            <th>Hạn chót</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>{rederReservation}</tbody>
      </Table>
    </div>
  );
}

export default ReservationSchedule;

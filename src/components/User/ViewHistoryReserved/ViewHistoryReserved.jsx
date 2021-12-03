import userApi from "apis/userApi";
import { renderDate, renderDateNow, renderStatus } from "constants/RenderDate";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/authSlice";

function ViewHistoryReserved() {
  document.title = "Lịch sử mượn trả sách";

  const isUser = useSelector(selectUser);
  const [reservationInfo, setReservationInfo] = useState([]);
  useEffect(() => {
    viewHistoryReserved();
  }, [isUser]);

  const viewHistoryReserved = async () => {
    const userId = isUser.id;
    try {
      const response = await userApi.postScheduledTimes(userId);
      console.log("lịch mượn trả là", response);
      setReservationInfo(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderReservation = () => {
    if (reservationInfo.length === 0) {
      return <span>Không có thông tin nào</span>;
    } else {
      return reservationInfo?.map((info, index) => {
        if (info.status === "borrowing") {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{renderStatus(info.status)}</td>
              <td>{info.title}</td>
              <td>{info.authors}</td>
              <td>{info.categories}</td>
              <td>{renderDate(info.dueDate)}</td>
            </tr>
          );
        }
      });
    }
  };
  const renderReturned = () => {
    if (reservationInfo.length === 0) {
      return <span>Không có thông tin nào</span>;
    } else {
      return reservationInfo?.map((info, index) => {
        if (info.status === "returned") {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{renderStatus(info.status)}</td>
              <td>{info.title}</td>
              <td>{info.authors}</td>
              <td>{info.categories}</td>
              <td>{renderDateNow(info.returnedDate)}</td>
            </tr>
          );
        }
      });
    }
  };

  return (
    <div>
      <legend className="form_name">Những sách đang mượn</legend>
      <Table striped bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Trạng thái</th>
            <th>Tên sách</th>
            <th>Tên tác giả</th>
            <th>Thể loại</th>
            <th>Hạn trả sách</th>
          </tr>
        </thead>
        <tbody>{renderReservation()}</tbody>
      </Table>
      <legend className="form_name">Những sách đã trả</legend>
      <Table striped bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Trạng thái</th>
            <th>Tên sách</th>
            <th>Tên tác giả</th>
            <th>Thể loại</th>
            <th>Ngày trả sách</th>
          </tr>
        </thead>
        <tbody>{renderReturned()}</tbody>
      </Table>
    </div>
  );
}

export default ViewHistoryReserved;

import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Form, Table, Button } from "react-bootstrap";

import "./ViewResevation.scss";

function ViewReservation() {
  const [status, setStatus] = useState("pending");
  const [name, setName] = useState();
  const [reservationInfo, setReservationInfo] = useState([]);

  useEffect(() => {
    // console.log(reservationInfo);
    getAllUserReservations();
  }, [status]);

  const getAllUserReservations = async () => {
    try {
      const response = await userApi.getUserReservation({
        status: status,
        name: name,
      });
      setReservationInfo(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  //render components
  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <>Đang hẹn</>;

      case "fulfilled":
        return <>Thành công</>;

      case "expired":
        return <>Hết hạn</>;

      default:
        return <>Đã huỷ </>;
    }
  };
  const renderDate = (time) => {
    const date = new Date(time);
    return <>{date.toLocaleString()}</>;
  };
  const renderBooks = (books) => {
    // console.log(books);
    return books?.map((book) => {
      return (
        <div className="bookItems">
          {/* <span className="title">Tên sách</span> */}
          <span className="value">{book.book?.title}</span>
        </div>
      );
    });
  };

  const renderReservation = reservationInfo?.map((info) => {
    return (
      <tr>
        <td>{renderStatus(info.status)}</td>
        <td>{info.user.name}</td>
        <td>{renderBooks(info.books)}</td>
        <td>{renderDate(info.createdDate)}</td>
        <td>{renderDate(info.dueDate)}</td>
      </tr>
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();
    getAllUserReservations();
  };

  return (
    <div className="viewReservation">
      <Form className="viewReservation_form" onSubmit={handleSearch}>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Tên người dùng</Form.Label>
          <Form.Control
            className="control"
            type="text"
            placeholder="Nhập tên người dùng"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Trạng thái mượn sách</Form.Label>
          <Form.Select
            className="control"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Đang hẹn</option>
            <option value="fulfilled">Thành công</option>
            <option value="expired">Đã hết hạn</option>
            <option value="canceled">Đã bị huỷ</option>
          </Form.Select>
        </Form.Group>
        <Button className="btnSearch" type="submit">
          Tìm kiếm
        </Button>
      </Form>

      <Table className="viewReservation_table">
        <thead>
          <tr>
            <th>Trạng thái</th>
            <th>Người mượn</th>
            <th>Thông tin sách mượn</th>
            <th>Ngày bắt đầu hẹn</th>
            <th>Ngày kết thúc hẹn</th>
          </tr>
        </thead>
        <tbody>{renderReservation}</tbody>
      </Table>
    </div>
  );
}

export default ViewReservation;

import React from "react";
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function ReservationReportstoExcel({ dataChart }) {
  const renderDataReservation = dataChart?.map((reservationDate, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{reservationDate.day}</td>
        <td>{reservationDate["Đang chờ"]}</td>
        <td>{reservationDate["Thành công"]}</td>
        <td>{reservationDate["Huỷ hẹn"]}</td>
        <td>{reservationDate["Quá hạn"]}</td>
      </tr>
    );
  });

  return (
    <div>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="tableReservation"
        filename="Thống kê lịch hẹn"
        sheet="Thống kê lịch hẹn"
        buttonText="Xuất thống kê lịch hẹn"
      />
      <Table id="tableReservation" style={{ display: "none" }}>
        <thead>
          <th>STT</th>
          <th>Ngày </th>
          <th>Số lượng lịch đã đang chờ</th>
          <th>Số lượng lịch đã thành công</th>
          <th>Số lượng lịch đã huỷ hẹn</th>
          <th>Số lượng lịch đã quá hạn</th>
        </thead>
        <tbody>{renderDataReservation}</tbody>
      </Table>
    </div>
  );
}

export default ReservationReportstoExcel;

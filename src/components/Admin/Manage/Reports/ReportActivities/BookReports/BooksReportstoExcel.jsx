import React from "react";
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function BooksReportstoExcel({ dataChart }) {
  // console.log("dataChart to excel nè", dataChart);
  const renderDataReservation = dataChart?.map((bookDate, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{bookDate.day}</td>
        <td>{bookDate["Số lượng sách mới"]}</td>
        <td>{bookDate["Số lượng sách bị xoá"]}</td>
      </tr>
    );
  });

  return (
    <div className="btnExcel">
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="tableBooks"
        filename="Thống kê sách"
        sheet="Thống kê sách"
        buttonText="Xuất thống kê sách"
      />
      <Table id="tableBooks" style={{ display: "none" }}>
        <thead>
          <th>STT</th>
          <th>Ngày </th>
          <th>Số lượng lịch sách mới</th>
          <th>Số lượng sách bị xoá</th>
        </thead>
        <tbody>{renderDataReservation}</tbody>
      </Table>
    </div>
  );
}

export default BooksReportstoExcel;

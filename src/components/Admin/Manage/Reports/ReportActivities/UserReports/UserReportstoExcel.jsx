import React from "react";
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function UserReportstoExcel({ dataChart }) {
  const renderDataUser = dataChart?.map((userDate, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{userDate.day}</td>
        <td>{userDate["Tài khoản mới"]}</td>
        <td>{userDate["Tài khoản bị xoá"]}</td>
      </tr>
    );
  });

  return (
    <div>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="tableUser"
        filename="Thống kê người dùng"
        sheet="Thống kê người dùng"
        buttonText="Xuất thống kê người dùng"
      />
      <Table id="tableUser" style={{ display: "none" }}>
        <thead>
          <th>STT</th>
          <th>Ngày </th>
          <th>Số lượng tài khoản mới</th>
          <th>Số lượng tài khoản bị xoá</th>
        </thead>
        <tbody>{renderDataUser}</tbody>
      </Table>
    </div>
  );
}

export default UserReportstoExcel;

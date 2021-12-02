import { renderActions, renderDateNow } from "constants/RenderDate";
import React from "react";
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function ReportLibrarianToExcel({ activitiesData }) {
  // console.log("đã lấy được full rồi", activitiesData);
  //render components
  const renderName = (user, book) => {
    if (user && user.name) {
      return user.name;
    }
    if (book && book.title) {
      return book.title;
    } else {
      return;
    }
  };

  const renderDateActivities = activitiesData?.map((data, index) => {
    return (
      <tr key={index}>
        {/* <td>{index + 1}</td> */}
        <td>{data.librarian?.name}</td>
        <td>{renderActions(data.action)}</td>
        <td>{renderName(data.user, data.book)}</td>
        <td>{renderDateNow(data.createdAt)}</td>
      </tr>
    )
  })


  return (
    <div className="btnExcel" style={{ textAlign: "end" }}>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="tableActivities"
        filename="Thống kê hoạt động thủ thư"
        sheet="Hoạt động thủ thư"
        buttonText="Xuất thống kê hoạt động thủ thư"
      />
      {/* <ReportLibrarianExcel /> */}
      <Table bordered hover striped className="viewReservation_table" id="tableActivities" style={{ display: "none" }}>
        <thead>
          <tr>
            {/* <th>STT</th> */}
            <th>Người thay đổi</th>
            {/* <th>Tên người dùng </th> */}
            <th>Hành động</th>
            <th>Tên sách(Tên người dùng)</th>
            {/* <th>Mã sách</th> */}
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>{renderDateActivities}</tbody>
      </Table>

    </div>
  );
}

export default ReportLibrarianToExcel;

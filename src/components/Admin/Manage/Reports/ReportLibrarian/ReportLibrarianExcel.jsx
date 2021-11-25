import reportsApi from "apis/reportsApi";
import { renderActions, renderDateNow } from "constants/RenderDate";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function ReportLibrarianExcel({ page, limitPage, startDay, endDay, sortBy }) {
  const [activities, setActivities] = useState();

  useEffect(() => {
    getActivities();
  }, [page, limitPage, startDay, endDay, sortBy]);

  const getActivities = async () => {
    const params = {
      from: startDay,
      to: endDay,
      page: page,
      limit: limitPage,
      sortBy,
    };
    try {
      const response = await reportsApi.getLibrarianActivities(params);

      setActivities(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

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
  const renderActivities = activities?.map((activity, index) => {
    return (
      <tr key={index}>
        <td>{index + +1}</td>
        <td>{activity.librarian?.name}</td>
        {/* <td>{activity.user?.name}</td> */}
        <td>{renderActions(activity.action)}</td>
        <td>{renderName(activity.user, activity.book)}</td>
        {/* <td>{activity.book?.title}</td> */}
        {/* <td>{activity.book?.id}</td> */}
        <td>{renderDateNow(activity.createdAt)}</td>
      </tr>
    );
  });

  return (
    <>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="tableActivities"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS"
      />
      {/* Table ảo */}
      <Table
        bordered
        hover
        striped
        className="viewReservation_table"
        id="tableActivities"
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Người thay đổi</th>

            <th>Hành động</th>
            <th>Tên sách( tên người dùng)</th>

            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>{renderActivities}</tbody>
      </Table>
    </>
  );
}

export default ReportLibrarianExcel;

import reportsApi from "apis/reportsApi";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import {
  renderActions,
  renderDateNow,
  renderDateSearch,
} from "constants/RenderDate";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";

function ReportLibrarian() {
  document.title = "Hoạt động thủ thư";

  const [activities, setActivities] = useState();
  //Search
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();

  //Phân trang
  const [totalProducts, setTotalProducts] = useState();
  const [limitPage, setLimitPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getActivities();
  }, [page, limitPage, startDay, endDay]);

  //Handle time
  const handleStartDay = (time) => {
    setPage(1);
    setStartDay(time);
  };
  const handleEndDay = (time) => {
    setPage(1);
    setEndDay(time);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeLimit = (newLimit) => {
    setPage(1);
    setLimitPage(newLimit);
  };

  const getActivities = async () => {
    const params = {
      from: startDay,
      to: endDay,
      page: page,
      limit: limitPage,
    };
    try {
      const response = await reportsApi.getLibrarianActivities(params);

      console.log(response);
      setActivities(response.results);
      setTotalProducts(response.totalResults);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderActivities = activities?.map((activity, index) => {
    return (
      <tr key={index}>
        <td>{index + 1 + (page - 1) * limitPage}</td>
        <td>{activity.user?.name}</td>
        <td>{renderActions(activity.action)}</td>
        <td>{activity.book?.title}</td>
        <td>{activity.book?.id}</td>
        <td>{renderDateNow(activity.createdAt)}</td>
      </tr>
    );
  });

  const showDate = () => {
    if (startDay) {
      if (endDay) {
        return (
          <>
            từ ngày <strong>{renderDateSearch(startDay)}</strong> đến ngày
            <strong> {renderDateSearch(endDay)}</strong>
          </>
        );
      } else {
        return (
          <>
            từ ngày <strong>{renderDateSearch(startDay)}</strong> đến nay
          </>
        );
      }
    } else {
      return;
    }
  };

  return (
    <div className="viewReservation">
      <legend className="form_name">
        Thống kê hoạt động của thủ thư {showDate()}
      </legend>
      <Form className="viewReservation_form">
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Từ ngày</Form.Label>
          <Form.Control
            className="control"
            type="date"
            onChange={(e) => handleStartDay(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Đến ngày</Form.Label>
          <Form.Control
            className="control"
            type="date"
            onChange={(e) => handleEndDay(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Table bordered hover striped className="viewReservation_table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên </th>
            <th>Hành động</th>
            <th>Tên sách</th>
            <th>Mã sách</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>{renderActivities}</tbody>
      </Table>
      <PaginationItems
        totalRows={totalProducts}
        limit={limitPage}
        onChangeLimit={handleChangeLimit}
        onChangePage={handleChangePage}
        activePage={page}
      />
    </div>
  );
}

export default ReportLibrarian;

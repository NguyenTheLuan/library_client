import reportsApi from "apis/reportsApi";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function ReportLibrarian() {
  const [activities, setActivities] = useState();
  //Phân trang
  const [totalProducts, setTotalProducts] = useState();
  const [limitPage, setLimitPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getLibrarian();
  }, [page, limitPage]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeLimit = (newLimit) => {
    setPage(1);
    setLimitPage(newLimit);
  };

  const getLibrarian = async () => {
    try {
      const response = await reportsApi.getLibrarianActivities({
        page: page,
        limit: limitPage,
      });

      console.log(response);
      setActivities(response.results);
      setTotalProducts(response.totalResults);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  //render components
  const renderDate = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const renderActivities = activities?.map((activity, index) => {
    return (
      <tr key={index}>
        <td>{index + 1 + (page - 1) * limitPage}</td>
        <td>{activity.user?.name}</td>
        <td>{activity.action}</td>
        <td>{activity.book?.title}</td>
        <td>{activity.book?.id}</td>
        <td>{renderDate(activity.createdAt)}</td>
      </tr>
    );
  });

  return (
    <div>
      đây là trang quản lí hoạt động thủ thư
      <Table>
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

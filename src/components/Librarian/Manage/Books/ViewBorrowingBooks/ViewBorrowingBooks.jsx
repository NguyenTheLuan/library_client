import productsApi from "apis/productsApi";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import "../ViewReservation/ViewResevation.scss";

function ViewBorrowingBooks() {
  document.title = "Sách đã cho mượn";

  const [borrowing, setBorrowing] = useState([]);
  //Phân trang
  const [totalProducts, setTotalProducts] = useState();
  const [page, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(5);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeLimit = (newLimit) => {
    setPage(1);
    setLimitPage(newLimit);
  };

  useEffect(() => {
    viewBorrowing();
  }, [page, limitPage]);

  const viewBorrowing = async () => {
    try {
      const response = await productsApi.getCopiesBorrowing({
        page: page,
        limit: limitPage,
      });
      console.log(response);
      setBorrowing(response.results);
      setTotalProducts(response.totalResults);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  //render date
  const renderDate = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const renderBorrowing = borrowing?.map((info, index) => {
    return (
      <tr key={index}>
        <th>{index + 1 + (page - 1) * limitPage}</th>
        <th>{info.user?.name}</th>
        <th>{info.title}</th>
        <th>{info.categories}</th>
        {/* <th>{renderDate(info.borrowedDate)}</th> */}
        <th>{renderDate(info.dueDate)}</th>
      </tr>
    );
  });

  return (
    <div className="viewReservation">
      <legend className="form_name">Quản lý thông tin sách đã cho mượn</legend>
      <Table bordered hover striped className="viewReservation_table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Người mượn</th>
            <th>Tên sách</th>
            <th>Thể loại</th>
            {/* <th>Ngày mượn</th> */}
            <th>Hạn trả</th>
          </tr>
        </thead>
        <tbody>{renderBorrowing}</tbody>
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

export default ViewBorrowingBooks;

import productsApi from "apis/productsApi";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import React, { useEffect, useState } from "react";
import { Form, Table, Button } from "react-bootstrap";

import "../ViewReservation/ViewResevation.scss";

function ViewBorrowingBooks() {
  document.title = "Sách đã cho mượn";

  //Thông tin search
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  //Thông tin để render
  const [borrowing, setBorrowing] = useState([]);

  const handleSearch = () => {
    console.log("search với info là");
  };

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
  }, [page, limitPage, name, title]);

  const viewBorrowing = async () => {
    try {
      const response = await productsApi.getCopiesBorrowing({
        user: name,
        title: title,
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
        <td>{index + 1 + (page - 1) * limitPage}</td>
        <td>{info.user?.name}</td>
        <td>{info.title}</td>
        <td>{info.categories}</td>
        {/* <th>{renderDate(info.borrowedDate)}</th> */}
        <td>{renderDate(info.dueDate)}</td>
      </tr>
    );
  });

  return (
    <div className="viewReservation">
      <legend className="form_name">Quản lý thông tin sách đã cho mượn</legend>
      <Form className="viewReservation_form" onSubmit={handleSearch}>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Tên người dùng</Form.Label>
          <Form.Control
            className="control"
            type="text"
            placeholder="Nhập tên người dùng"
            onChange={(e) => {
              if (e.target.value) {
                setName(e.target.value);
              } else {
                setName(" ");
              }
            }}
          />
        </Form.Group>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Tên sách</Form.Label>
          <Form.Control
            className="control"
            type="text"
            placeholder="Nhập tên sách đang mượn"
            onChange={(e) => {
              if (e.target.value) {
                setTitle(e.target.value);
              } else {
                setTitle(" ");
              }
            }}
          />
        </Form.Group>

        <Button className="btnSearch" type="submit">
          Tìm kiếm
        </Button>
      </Form>
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

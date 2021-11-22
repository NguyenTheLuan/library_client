import userApi from "apis/userApi";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "./ViewResevation.scss";

function ViewReservation() {
  document.title = "Lịch hẹn người dùng";

  //Debounce typing
  const typingRef = useRef(null);

  const [status, setStatus] = useState("pending");
  const [name, setName] = useState();
  const [reservationInfo, setReservationInfo] = useState([]);
  //Phân trang
  const [totalProducts, setTotalProducts] = useState();
  const [limitPage, setLimitPage] = useState(5);
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeLimit = (newLimit) => {
    setPage(1);
    setLimitPage(newLimit);
  };

  //Khi thay đổi trang
  useEffect(() => {
    getAllUserReservations();
  }, [page, limitPage, name]);

  //Khi thay đổi trạng thái
  useEffect(() => {
    setPage(1);
    getAllUserReservations();
  }, [status]);

  const getAllUserReservations = async () => {
    console.log(name);
    try {
      const response = await userApi.getUserReservation({
        status: status,
        name: name,
        limit: limitPage,
        page: page,
      });
      // console.log("lịch hẹn", response);
      //Set pagination
      setTotalProducts(response.totalResults);
      //Set info
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

  const renderReservation = reservationInfo?.map((info, index) => {
    return (
      <tr key={index}>
        <td>{index + 1 + (page - 1) * limitPage}</td>
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

  const handleSearchByName = (e) => {
    const value = e.target.value;

    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      if (value !== "") {
        setName(value);
      } else {
        setName(" ");
      }
    }, 500);
  };

  return (
    <div className="viewReservation">
      <legend className="form_name">
        Quản lý lịch hẹn sách của người dùng
      </legend>
      <Form className="viewReservation_form" onSubmit={handleSearch}>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Tên người dùng</Form.Label>
          <Form.Control
            className="control"
            type="text"
            placeholder="Nhập tên người dùng"
            onChange={handleSearchByName}
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

      <Table bordered hover striped className="viewReservation_table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Trạng thái</th>
            <th>Người mượn</th>
            <th>Thông tin sách mượn</th>
            <th>Ngày bắt đầu hẹn</th>
            <th>Ngày kết thúc hẹn</th>
          </tr>
        </thead>
        <tbody>{renderReservation}</tbody>
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

export default ViewReservation;

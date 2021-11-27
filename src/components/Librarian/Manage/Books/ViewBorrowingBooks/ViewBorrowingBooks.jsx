import productsApi from "apis/productsApi";
import reportsApi from "apis/reportsApi";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import { renderBarCode, renderDate } from "constants/RenderDate";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "../ViewReservation/ViewResevation.scss";

function ViewBorrowingBooks() {
  document.title = "Sách đã cho mượn";

  //Debounce typing
  const typingRef = useRef(null);

  //Thông tin search
  const [searchInfo, setSearchInfo] = useState({});
  const [sortBy, setSortBy] = useState();

  //Thông tin để render
  const [borrowing, setBorrowing] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log("search với info là");
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
  }, [page, limitPage, searchInfo, sortBy]);

  const viewBorrowing = async () => {
    const params = {
      ...searchInfo,
      sortBy: sortBy,
      page: page,
      limit: limitPage,
    };

    try {
      const response = await productsApi.getCopiesBorrowing(params);
      console.log(response);
      setBorrowing(response.results);
      setTotalProducts(response.totalResults);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderBorrowing = borrowing?.map((info, index) => {
    return (
      <tr key={index}>
        <td>{index + 1 + (page - 1) * limitPage}</td>
        <td>{info.user?.name}</td>
        <td>{renderBarCode(info.barcode, info.id)}</td>
        <td>{info.title}</td>
        <td>{info.categories}</td>
        {/* <td>{renderDateNow(info.borrowedDate)}</td> */}
        <td>{renderDate(info.dueDate)}</td>
      </tr>
    );
  });

  const handleSearchByName = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      if (value !== "") {
        setSearchInfo({
          ...searchInfo,
          [name]: value,
        });
      } else {
        setSearchInfo({
          ...searchInfo,
          [name]: " ",
        });
      }
    }, 500);
  };

  //Xuât báo cáo
  const exportBooks = async () => {
    try {
      const response = await reportsApi.exportBooksBorrowing();
      window.location.href = "//" + response.path;
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="viewReservation">
      <legend className="form_name">Quản lý thông tin sách đã cho mượn</legend>
      <Form className="viewReservation_form" onSubmit={handleSearch}>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Tên người dùng</Form.Label>
          <Form.Control
            className="control"
            name="user"
            type="text"
            placeholder="Nhập tên người dùng"
            onChange={handleSearchByName}
          />
        </Form.Group>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Tên sách</Form.Label>
          <Form.Control
            name="title"
            className="control"
            type="text"
            placeholder="Nhập tên sách đang mượn"
            onChange={handleSearchByName}
          />
        </Form.Group>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Ngày mượn sách</Form.Label>
          <Form.Select
            className="control"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate:asc">Tăng dần</option>
            <option value="dueDate:desc">Giảm dần</option>
          </Form.Select>
        </Form.Group>
        <div style={{ marginLeft: "auto" }}>
          <Button
            style={{ marginRight: "10px" }}
            className="btnSearch"
            type="submit"
            onClick={viewBorrowing}
          >
            Tìm kiếm
          </Button>
          <Button
            variant="secondary"
            className="btnSearch"
            type="submit"
            onClick={exportBooks}
          >
            Xuất báo cáo
          </Button>
        </div>
      </Form>
      <Table bordered hover striped className="viewReservation_table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Người đang mượn</th>
            <th>Mã sách</th>
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

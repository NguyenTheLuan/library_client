import productsApi from "apis/productsApi";
import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";
import { renderDateNow } from "constants/RenderDate";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "../ViewReservation/ViewResevation.scss";

function ViewReturnBooks() {
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
      const response = await productsApi.getCopiesReturn(params);
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
        <td>{info._id}</td>
        <td>{info.title}</td>
        {/* <th>{renderDate(info.borrowedDate)}</th> */}
        <td>{renderDateNow(info.returnedDate)}</td>
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

  return (
    <div className="viewReservation">
      <legend className="form_name">
        Quản lý thông tin sách người dùng đã trả
      </legend>
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
            placeholder="Nhập tên sách đã trả"
            onChange={handleSearchByName}
          />
        </Form.Group>
        <Form.Group className="viewReservation_form_items">
          <Form.Label className="label">Ngày trả sách</Form.Label>
          <Form.Select
            className="control"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate:asc">Tăng dần</option>
            <option value="dueDate:desc">Giảm dần</option>
          </Form.Select>
        </Form.Group>

        <Button className="btnSearch" type="submit" onClick={viewBorrowing}>
          Tìm kiếm
        </Button>
      </Form>
      <Table bordered hover striped className="viewReservation_table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Người trả sách</th>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Ngày trả</th>
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

export default ViewReturnBooks;

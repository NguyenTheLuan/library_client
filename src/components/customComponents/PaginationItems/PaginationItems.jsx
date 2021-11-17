import React from "react";
import { Form, Pagination } from "react-bootstrap";

import "./PaginationItems.scss";

function PaginationItems({
  totalRows,
  limit,
  onChangePage,
  activePage,
  onChangeLimit,
}) {
  //Tổng số trang
  const totalPage = Math.ceil(totalRows / limit);

  const rowPage = () => {
    const res = [];
    for (var pages = 1; pages <= totalPage; pages++) {
      res.push(pages);
    }
    return res;
  };

  const showPages = rowPage()?.map((pageIndex, index) => {
    return (
      <Pagination.Item
        key={index}
        active={pageIndex === activePage}
        onClick={() => handlePageChange(pageIndex)}
      >
        {pageIndex}
      </Pagination.Item>
    );
  });

  const handlePageChange = (pageIndex) => {
    //Truyền cho cha
    onChangePage(pageIndex);
  };

  return (
    <div className="paginationForm">
      <Form className="formSelect">
        <Form.Select
          className="select"
          onChange={(e) => onChangeLimit(e.target.value)}
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </Form>
      <Pagination>
        <Pagination.First
          onClick={() => onChangePage(1)}
          disabled={activePage === 1}
        />
        {showPages}
        <Pagination.Last
          onClick={() => onChangePage(totalPage)}
          disabled={activePage === totalPage}
        />
      </Pagination>
    </div>
  );
}

export default PaginationItems;

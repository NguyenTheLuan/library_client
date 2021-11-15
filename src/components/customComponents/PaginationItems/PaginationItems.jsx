import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

function PaginationItems({ totalRows, limit, onChangePage }) {
  const [page, setPage] = useState();

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
      <Pagination.Item key={index} onClick={() => handlePageChange(pageIndex)}>
        {pageIndex}
      </Pagination.Item>
    );
  });

  const handlePageChange = (pageIndex) => {
    //Truyền cho cha
    onChangePage(pageIndex);
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => onChangePage(1)} />
      {showPages}
      <Pagination.Last onClick={() => onChangePage(totalPage)} />
    </Pagination>
  );
}

export default PaginationItems;

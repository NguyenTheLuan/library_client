import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

function PaginationItems({ totalRows, limit, onChangePage, activePage }) {
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
  );
}

export default PaginationItems;

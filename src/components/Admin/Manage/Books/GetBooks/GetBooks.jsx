import productsApi from "apis/productsApi";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

import "components/Admin/Manage/ManageForm.scss";

function GetBooks() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  // const checkQuantity = (quantityBooks) => {
  //   return quantityBooks;
  // };
  const imgShow = (img) => {
    return <img src={img} alt="img" />;
  };

  const getAllProducts = async () => {
    try {
      const response = await productsApi.getBooks();

      setProducts(response.results);
    } catch (error) {
      console.log("err ", error);
    }
  };
  console.log("đây là trang admin Products", products);
  const showBody = products.map((bookDetails, index) => {
    return (
      <tr className="viewMenu_table_body_row">
        <td>{index}</td>
        <td>{bookDetails.id}</td>
        <td>{imgShow(bookDetails.cover)}</td>
        <td>{bookDetails.title}</td>
        <td>{bookDetails.availableCopies}</td>
        {/* <td>{checkQuantity(bookDetails.availableCopies)}</td> */}
        <td>{bookDetails.loanPeriodDays}</td>
        {/* custom td */}
        <td>
          <Button variant="success">Chỉnh sửa sách</Button>
        </td>
        <td>
          <Button variant="danger">Xoá sách</Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="viewMenu">
      <Table className="viewMenu_table" striped bordered hover>
        <thead className="viewMenu_table_header">
          <tr className="viewMenu_table_header_row">
            <th>#</th>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên sách</th>
            <th>Số lượng</th>
            <th>Thời gian mượn(ngày)</th>
            <th>Chỉnh sửa</th>
            <th>Xoá sách</th>
          </tr>
        </thead>
        <tbody className="viewMenu_table_body">{showBody}</tbody>
      </Table>
    </div>
  );
}

export default GetBooks;

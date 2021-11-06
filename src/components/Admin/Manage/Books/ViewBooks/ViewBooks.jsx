import productsApi from "apis/productsApi";
import SearchForm from "components/customComponents/InputForms/SearchForm/SearchForm";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  selectProducts,
  selectQuantity,
} from "reducers/bookSlice";
import DeleteBooks from "../DeleteBooks/DeleteBooks";
import UpdateBooksById from "../UpdateBooksById/UpdateBooksById";

import "components/Admin/Manage/ManageForm.scss";

function ViewBooks() {
  const books = useSelector(selectProducts);

  const [products, setProducts] = useState(books);
  const dispatch = useDispatch();

  // const isUpdate = useSelector(selectUpdateCarts);

  //Nhận số lượng thay đổi của cart => reset carts
  const quantity = useSelector(selectQuantity);
  useEffect(() => {
    getAllProducts();
  }, [quantity]);
  useEffect(() => {
    setProducts(books);
  }, [books]);

  // const checkQuantity = (quantityBooks) => {
  //   return quantityBooks;
  // };
  const imgShow = (img) => {
    return <img src={img} alt="img" />;
  };

  const getAllProducts = async () => {
    try {
      const response = await productsApi.getBooks();

      // console.log(response);
      dispatch(getAllProduct(response.results));
      // setProducts(response.results);
    } catch (error) {
      console.log("err ", error);
    }
  };
  // console.log("đây là trang admin Products", products);
  const showBody = products.map((bookDetails, index) => {
    return (
      <tr className="viewMenu_table_body_row" key={index}>
        <td>{index + 1}</td>
        {/* <td>{bookDetails.id}</td> */}
        <td>{imgShow(bookDetails.cover)}</td>
        <td>{bookDetails.title}</td>
        <td>{bookDetails.availableCopies}</td>
        {/* <td>{checkQuantity(bookDetails.availableCopies)}</td> */}
        <td>{bookDetails.loanPeriodDays}</td>
        {/* custom td */}
        <td>
          <UpdateBooksById bookDetails={bookDetails} />
        </td>
        <td>
          {/* <Button variant="danger">Xoá sách</Button> */}
          <DeleteBooks bookId={bookDetails.id} bookName={bookDetails.title} />
        </td>
      </tr>
    );
  });

  return (
    <div className="viewMenu">
      <div className="viewMenu_header">
        <div className="viewMenu_header_label">
          <span>Thông tin sách</span>
        </div>
        <div className="viewMenu_header_search">
          <SearchForm />
        </div>
      </div>
      <Table className="viewMenu_table" striped bordered hover>
        <thead className="viewMenu_table_header">
          <tr className="viewMenu_table_header_row">
            <th>#</th>
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

export default ViewBooks;
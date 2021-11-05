import productsApi from "apis/productsApi";
import "components/Admin/Manage/ManageForm.scss";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, selectQuantity } from "reducers/bookSlice";
import DeleteBooks from "../DeleteBooks/DeleteBooks";

function GetBooks() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  // const selectBooks = useSelector(selectProducts);

  //Nhận số lượng thay đổi của cart => reset carts
  const quantity = useSelector(selectQuantity);
  useEffect(() => {
    getAllProducts();
  }, [quantity]);

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
      setProducts(response.results);
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
          <Button variant="success">Chỉnh sửa sách</Button>
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
      <Table className="viewMenu_table" striped bordered hover>
        <thead className="viewMenu_table_header">
          <tr className="viewMenu_table_header_row">
            <th>#</th>
            {/* <th>ID</th> */}
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

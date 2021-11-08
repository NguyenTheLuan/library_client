import productsApi from "apis/productsApi";
import SearchFormAdmin from "components/customComponents/InputForms/SearchForm/SearchFormAdmin";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooks,
  getTotalBooks,
  selectBooks,
  selectTotalBooks,
} from "reducers/bookSlice";
import DeleteBooks from "../DeleteBooks/DeleteBooks";
import UpdateBooksById from "../UpdateBooksById/UpdateBooksById";
import Pagination from "components/customComponents/PaginationItems/PaginationItems";
import "components/Admin/Manage/ManageForm.scss";

function ViewBooks() {
  const books = useSelector(selectBooks);

  const [products, setProducts] = useState(books);

  const dispatch = useDispatch();

  // const isUpdate = useSelector(selectUpdateCarts);

  //Pagination
  const [totalBooks, setTotalBooks] = useState();
  const [limitPage, setLimitPage] = useState(4);
  const [newPage, setNewPage] = useState(1);

  const handleChangePage = (newPage) => {
    setNewPage(newPage);
  };

  //Nhận số lượng thay đổi của cart => reset carts
  const totalCarts = useSelector(selectTotalBooks);

  //Lần 1 get all products
  useEffect(() => {
    getAllProducts();
  }, [totalCarts, newPage]);
  //Lần 2 reset sau khi search
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
    const params = { page: newPage, limit: limitPage };
    try {
      const response = await productsApi.getBooks(params);

      console.log("dữ liệu trả về", response);
      dispatch(getBooks(response.results));
      // dispatch(getTotalBooks(response.totalResults));
      //Để Phân trang
      setTotalBooks(response.totalResults);
      // setProducts(response.results);
    } catch (error) {
      console.log("err ", error);
    }
  };
  // console.log("đây là trang admin Products", products);
  const showBody = products?.map((bookDetails, index) => {
    return (
      <tr className="viewMenu_table_body_row" key={index}>
        <td>{index + 1}</td>
        {/* <td>{bookDetails.id}</td> */}
        <td>{imgShow(bookDetails.cover)}</td>
        <td>{bookDetails.title}</td>
        <td>{bookDetails.authors}</td>
        <td>{bookDetails.categories}</td>
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
        <div className="viewMenu_header_search">
          <legend>Thông tin sách</legend>
          <SearchFormAdmin />
        </div>
      </div>
      <Table className="viewMenu_table" striped bordered hover>
        <thead className="viewMenu_table_header">
          <tr className="viewMenu_table_header_row">
            <th>#</th>
            <th>Ảnh</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Số lượng</th>
            <th>Thời gian mượn(ngày)</th>
            <th>Chỉnh sửa</th>
            <th>Xoá sách</th>
          </tr>
        </thead>
        <tbody className="viewMenu_table_body">{showBody}</tbody>
        <tfoot className="viewMenu_table_foot">
          <Pagination
            totalRows={totalBooks}
            limit={limitPage}
            onChangePage={handleChangePage}
          />
        </tfoot>
      </Table>
    </div>
  );
}

export default ViewBooks;

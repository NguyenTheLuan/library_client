import productsApi from "apis/productsApi";
// import "components/Admin/Manage/AddForm.scss";
import "components/Admin/Manage/ViewForm.scss";
import SearchFormAdmin from "components/customComponents/InputForms/SearchForm/SearchFormAdmin";
import Pagination from "components/customComponents/PaginationItems/PaginationItems";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectBooks, selectTotalBooks } from "reducers/bookSlice";
import DeleteBooks from "../DeleteBooks/DeleteBooks";
import UpdateBooksById from "../UpdateBooksById/UpdateBooksById";

function ViewBooks() {
  const books = useSelector(selectBooks);

  const [products, setProducts] = useState(books);

  const dispatch = useDispatch();

  // const isUpdate = useSelector(selectUpdateCarts);

  //Pagination
  const [totalBooks, setTotalBooks] = useState();
  const [limitPage, setLimitPage] = useState(5);
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
      <tr className="tableItems" key={index}>
        <td>{index + 1}</td>
        {/* <td>{bookDetails.id}</td> */}
        <td>{imgShow(bookDetails.cover)}</td>
        <td>{bookDetails.title}</td>
        <td>{bookDetails.authors}</td>
        <td>{bookDetails.categories}</td>
        <td>{bookDetails.availableCopies}</td>
        <td>{bookDetails.loanPeriodDays} ngày</td>

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
      <div className="viewMenu_search">
        {/* Search form */}
        <div className="search">
          <legend>Thông tin sách</legend>
          <SearchFormAdmin />
        </div>
      </div>
      <div className="viewMenu_table">
        <Table striped bordered hover className="tableForm">
          {/* Title Name */}
          <thead className="tableForm_header">
            <tr className="tableItems">
              <th>STT</th>
              <th>Ảnh</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>Số lượng</th>
              {/* <th>Tăng số lượng</th> */}
              <th>Thời gian mượn</th>
              <th>Chỉnh sửa</th>
              <th>Xoá sách</th>
            </tr>
          </thead>
          <tbody className="tableForm_body">{showBody}</tbody>
        </Table>
      </div>
      <div className="viewMenu_pagination">
        <Pagination
          totalRows={totalBooks}
          limit={limitPage}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ViewBooks;

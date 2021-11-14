import productsApi from "apis/productsApi";
// import "components/Admin/Manage/AddForm.scss";
import SearchFormAdmin from "components/customComponents/InputForms/SearchForm/SearchBooksAdmin";

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectBooks, selectTotalBooks } from "reducers/bookSlice";
import DeleteBooks from "../DeleteBooks/DeleteBooks";
import UpdateBooksById from "../UpdateBooksById/UpdateBooksById";

import PaginationItems from "components/customComponents/PaginationItems/PaginationItems";

import IncreaseBooks from "../IncreaseBooks/IncreaseBooks";
import ViewDetailsBook from "../ViewDetailsBook/ViewDetailsBook";
import "components/Admin/Manage/ViewForm.scss";

function ViewBooks() {
  const books = useSelector(selectBooks);
  //Để search
  const [searchInfo, setSearchInfo] = useState();
  //Để render
  const [products, setProducts] = useState();
  //Để update
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();

  //Pagination
  const [totalBooks, setTotalBooks] = useState();
  const [limitPage, setLimitPage] = useState(5);
  const [newPage, setNewPage] = useState(1);

  //Chuyển trang mới
  const handleChangePage = (newPage) => {
    setNewPage(newPage);
  };
  //Set row
  const handleTotalRows = (newRows) => {
    // console.log("cha đã nhận được số sản phẩm mới", newRows);
    setTotalBooks(newRows);
  };
  //Search Info
  const handleInfo = (info) => {
    // console.log("search info này", info);
    setSearchInfo(info);
  };

  //Nhận số lượng thay đổi của cart => reset carts
  const totalCarts = useSelector(selectTotalBooks);

  //Lần 1 get all products
  useEffect(() => {
    getAllProducts();
    console.log("load lại khi update nè");
  }, [newPage, searchInfo, update]);
  //Lần 2 reset sau khi search
  useEffect(() => {
    setProducts(books);
  }, [books]);

  //render components
  const imgShow = (img) => {
    return <img src={img} alt="img" />;
  };

  //Nhập giá trị update sau khi thay đổi
  const handleUpdate = (status) => {
    // console.log("lấy được trạng thái", status);
    setUpdate(status);
  };

  const getAllProducts = async () => {
    const params = { page: newPage, limit: limitPage, ...searchInfo };
    try {
      const response = await productsApi.getBooks(params);

      console.log("dữ liệu trả về", response);
      //set về rỗng trước
      setProducts();
      setProducts(response.results);
      //Nhận thông tin sách
      dispatch(getBooks(response.results));
      //Để Phân trang
      setTotalBooks(response.totalResults);
    } catch (error) {
      console.log("err ", error);
    }
  };

  // console.log("đây là trang admin Products", products);
  const showBody = products?.map((bookDetails, index) => {
    return (
      <tr className="tableItems" key={index}>
        {/* <td>{bookDetails.id}</td> */}

        <td>{imgShow(bookDetails.cover)}</td>
        <td>{bookDetails.title}</td>
        {/* <td>{bookDetails.authors}</td> */}
        {/* <td>{bookDetails.categories}</td> */}
        <td>{bookDetails.availableCopies}</td>
        {/* <td>{bookDetails.loanPeriodDays} ngày</td> */}

        {/* custom td */}
        <td>
          <IncreaseBooks
            bookId={bookDetails.id}
            bookName={bookDetails.title}
            // Cập nhật lại
            onUpdate={handleUpdate}
            update={update}
          />
        </td>

        <td>
          <UpdateBooksById
            onUpdate={handleUpdate}
            update={update}
            bookDetails={bookDetails}
          />
        </td>
        <td>
          <DeleteBooks bookId={bookDetails.id} bookName={bookDetails.title} />
        </td>
        <td>
          <ViewDetailsBook bookDetails={bookDetails} />
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
          <SearchFormAdmin onChangeInfo={handleInfo} />
        </div>
      </div>
      <div className="viewMenu_table">
        <Table striped bordered hover className="tableForm">
          {/* Title Name */}
          <thead className="tableForm_header">
            <tr className="tableItems">
              {/* <th>ID</th> */}
              <th>Ảnh</th>
              <th>Tên sách</th>
              {/* <th>Tác giả</th> */}
              {/* <th>Thể loại</th> */}
              <th>Số lượng</th>
              <th>Nhập sách</th>
              {/* <th>Tăng số lượng</th> */}
              {/* <th>Thời gian mượn</th> */}
              <th>Chỉnh sửa</th>
              <th>Xoá sách</th>
              <td>Xem chi tiết</td>
            </tr>
          </thead>
          <tbody className="tableForm_body">{showBody}</tbody>
        </Table>
      </div>
      <div className="viewMenu_pagination">
        <PaginationItems
          totalRows={totalBooks}
          limit={limitPage}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ViewBooks;

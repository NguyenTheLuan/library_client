import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Table } from "react-bootstrap";
import ModalCheckBooks from "./ConfirmReservation/ModalCheckBooks/ModalCheckBooks";
import { useDispatch } from "react-redux";
import { addCarts } from "reducers/librarianSlice";

import "./CheckoutBooks.scss";

function CheckoutBooks() {
  const [userId, setUserId] = useState();
  const [hide, setHide] = useState(false);
  const [booksReserved, setBooksReserved] = useState();
  const [copies, setCopies] = useState([]);

  const dispatch = useDispatch();

  //Modals
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const onShow = (isShow) => {
    // console.log("cha nhận được từ con", isShow);
    setShow(isShow);
  };

  const getBookReservation = async () => {
    try {
      const response = await userApi.getBookReserved(userId);
      // console.log("sách nhận được", response);
      setHide(true);
      setBooksReserved(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleBookId = () => {
    if (copies.length > 0) {
      dispatch(addCarts(copies));
    } else {
      alert("Không có sản phẩm nào");
    }
  };

  //render component
  const setImg = (img) => {
    return <img style={{ width: "40px" }} src={img} alt="img" />;
  };

  const renderCarts = booksReserved?.map((books, index) => {
    return (
      <>
        <tr key={index}>
          {/* <td>{cart.id}</td> */}
          <td>{index + 1}</td>
          <td>{setImg(books.cover)}</td>
          <td>{books.copy}</td>
          <td>{books.title}</td>
          <td>{books.categories}</td>
          <td>{books.authors}</td>
          <td>{books.loanPeriodDays}</td>

          <td>
            <input
              name={index}
              type="checkbox"
              onClick={(e) => setCopies([...copies, books.copy])}
            />
          </td>
        </tr>
      </>
    );
  });

  const renderReservation = () => {
    if (hide) {
      return (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>Id</th> */}
                <th>STT</th>
                <th>Ảnh bìa</th>
                <th>Mã sách</th>
                <th>Tên sách</th>
                <th>Thể loại</th>
                <th>Tên tác giả</th>
                <th>Thời gian mượn</th>
                <th>Chọn sách</th>
                {/* <th>Miêu tả</th> */}
              </tr>
            </thead>
            <tbody>{renderCarts}</tbody>
            <Button onClick={handleBookId}>Chọn sách</Button>
          </Table>
          <Button variant="primary" onClick={handleShow}>
            Đặt thêm sách khác?
          </Button>
          <Button variant="success">Tiến hành mượn sách</Button>
        </>
      );
    } else {
      return <>Không có gì để hiện</>;
    }
  };

  return (
    <div className="checkoutForm">
      {/* Search thông tin user */}
      <div className="checkoutForm_input">
        <FloatingLabel label="Nhập id của người dùng">
          <Form.Control
            placeholder="abcxyz"
            onChange={(e) => setUserId(e.target.value)}
          />
        </FloatingLabel>
        <Button onClick={getBookReservation}>Tìm kiếm</Button>
      </div>

      {/* Hiện thị nội dung */}
      <div className="checkoutForm_contents">{renderReservation()}</div>

      <ModalCheckBooks userId={userId} onShow={onShow} isShow={show} />
    </div>
  );
}

export default CheckoutBooks;

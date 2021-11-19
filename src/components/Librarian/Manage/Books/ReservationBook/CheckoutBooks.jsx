import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Table, FormCheck } from "react-bootstrap";
import ModalCheckBooks from "./ConfirmReservation/ModalCheckBooks/ModalCheckBooks";
import { useDispatch } from "react-redux";
import { addCarts, createCarts } from "reducers/librarianSlice";

import "./CheckoutBooks.scss";
import ModalCheckout from "./ConfirmReservation/ModalCheckout/ModalCheckout";

function CheckoutBooks() {
  document.title = "Mượn sách";

  const [userId, setUserId] = useState();
  const [hide, setHide] = useState(false);
  const [booksReserved, setBooksReserved] = useState();
  const [copies, setCopies] = useState([]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("mã copies là", copies);
  // }, [copies]);

  //Modals
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //Cho phần đặt sách
  const onShow = (isShow) => {
    setShow(isShow);
  };
  //Cho phần checkout
  const [checkout, setCheckout] = useState(false);
  const handleCheckout = () => setCheckout(true);

  const onCheckout = (isCheckout) => {
    setCheckout(isCheckout);
  };

  const getBookReservation = async () => {
    try {
      const response = await userApi.getBookReserved(userId);
      // console.log("sách nhận được", response);
      setHide(true);
      setBooksReserved(response.results);
    } catch (error) {
      alert("Hãy nhập đúng ID người dùng");
      console.log("lỗi rồi", { error });
    }
  };

  const handleBookId = () => {
    if (copies.length > 0) {
      dispatch(createCarts(copies));
      alert("Thêm thành công");
    } else {
      alert("Không có sản phẩm nào");
    }
  };

  const handleClick = (details) => {
    if (copies.length === 0) {
      setCopies([details]);
    } else {
      checkCarts(details);
    }
  };

  const checkCarts = (details) => {
    const findBookSId = copies.findIndex((bookItems) => bookItems === details);
    //Khi có vị trí => xoá
    if (findBookSId > -1) {
      const newCarts = [...copies];
      // Tiến hành xoá
      newCarts.splice(findBookSId, 1);
      //Set lại state
      setCopies(newCarts);
    }
    //Khi có không vị trí => add
    else if (findBookSId === -1) {
      setCopies([...copies, details]);
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
              onChange={() => handleClick(books.copy)}
              // onClick={(e) => setCopies([...copies, books.copy])}
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
          <Table className="tableForm" striped bordered hover>
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
            <tbody>
              {renderCarts}

              <tr>
                <td colSpan="7" style={{ visibility: "hidden" }}></td>
                <th>
                  <Button onClick={handleBookId}>Chọn sách</Button>
                </th>
              </tr>
            </tbody>
          </Table>

          <Button variant="primary" onClick={handleShow}>
            Đặt thêm sách khác?
          </Button>
          <Button variant="success" onClick={handleCheckout}>
            Tiến hành mượn sách
          </Button>
        </>
      );
    } else {
      return <h3>Không có gì để hiện, hãy nhập ID người dùng</h3>;
    }
  };

  return (
    <div className="checkoutForm">
      {/* Search thông tin user */}
      <div className="checkoutForm_input">
        <FloatingLabel label="Nhập ID của người dùng">
          <Form.Control
            placeholder="abcxyz"
            onChange={(e) => setUserId(e.target.value)}
          />
        </FloatingLabel>
        <Button onClick={getBookReservation}>Tìm kiếm</Button>
      </div>

      {/* Hiện thị nội dung */}
      {renderReservation()}

      <ModalCheckBooks userId={userId} onShow={onShow} isShow={show} />
      <ModalCheckout userId={userId} onShow={onCheckout} isShow={checkout} />
    </div>
  );
}

export default CheckoutBooks;

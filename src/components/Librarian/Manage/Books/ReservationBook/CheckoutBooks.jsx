import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createCarts,
  deleteCarts,
  selectCartCheckout,
  selectCartUserId,
} from "reducers/librarianSlice";
import ModalCheckBooks from "./ConfirmReservation/ModalCheckBooks/ModalCheckBooks";
import ModalCheckout from "./ConfirmReservation/ModalCheckout/ModalCheckout";

import "./CheckoutBooks.scss";
import { renderBarCode } from "constants/RenderDate";

function CheckoutBooks() {
  document.title = "Mượn sách";

  const booksCart = useSelector(selectCartCheckout);

  const [userId, setUserId] = useState();
  const [hide, setHide] = useState(false);
  const [booksReserved, setBooksReserved] = useState();
  const [copies, setCopies] = useState([]);

  const [cartsCheckout, setCartsCheckout] = useState();

  useEffect(() => {
    booksCart && setCartsCheckout(booksCart);
  }, [booksCart]);

  //Để update
  const [update, setUpdate] = useState(false);

  const handleUpdate = (status) => {
    setUpdate(status);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    userId && getBookReservation();
  }, [update]);

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
      // console.log("cho mượn sách", response);
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

  const handleDelete = (bookId) => {
    dispatch(deleteCarts(bookId));
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
          <td>{renderBarCode(books.barcode, books.copy)}</td>
          <td>{books.title}</td>
          <td>{books.categories}</td>
          <td>{books.authors}</td>
          <td>{books.loanPeriodDays}</td>

          <td>
            <input
              name={index}
              type="checkbox"
              // onChange={() => handleClick(books.copy)}
              onChange={() => handleClick(books.barcode)}
            // onClick={(e) => setCopies([...copies, books.copy])}
            />
          </td>
        </tr>
      </>
    );
  });

  //render form
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
        </>
      );
    } else {
      return <h3>Không có gì để hiện, hãy nhập ID người dùng</h3>;
    }
  };

  const renderCartsCheckout = cartsCheckout?.map((bookId, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{bookId}</td>
        <td>
          <Button onClick={() => handleDelete(bookId)}>Xoá</Button>
        </td>
      </tr>
    );
  });

  const renderCartsCheckoutUser = () => {
    if (booksCart?.length > 0) {
      return (
        <>
          <legend className="form_name">Giỏ sách đã chọn</legend>
          <Table striped hover bordered>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã sách</th>
              </tr>
            </thead>
            <tbody>{renderCartsCheckout}</tbody>
          </Table>
          <Button variant="success" onClick={handleCheckout}>
            Tiến hành mượn sách
          </Button>
        </>
      );
    }
  };
  return (
    <div className="checkoutForm">
      <legend className="form_name">Quản lý mượn sách người dùng</legend>
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

      {/* Hiện thị sách đã chọn */}
      {renderCartsCheckoutUser()}

      <ModalCheckBooks userId={userId} onShow={onShow} isShow={show} />
      <ModalCheckout
        userId={userId}
        onShow={onCheckout}
        isShow={checkout}
        update={update}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default CheckoutBooks;

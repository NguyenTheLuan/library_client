import productsApi from "apis/productsApi";
import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCarts } from "reducers/librarianSlice";

function CheckBooks({ userId, onHandleShow }) {
  const [bookId, setBookId] = useState("");
  //Set thông tin copies sách
  const [copies, setCopies] = useState();
  //Set thông tin id sách
  const [bookIdInfo, setBookIdInfo] = useState();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(bookId);
  // }, [bookId]);

  // useEffect(() => {
  //   // console.log("đã search được thông tin bookInfoId", bookIdInfo);
  //   console.log("đã search được thông tin copies", copies[0].title);
  // }, [bookIdInfo, copies]);

  //Kiếm thông tin sách
  //Kiểm tra mã Copies
  const getInfoCopies = async () => {
    try {
      const response = await productsApi.getCheckCopies(bookId);
      console.log("đã lấy ra thông tin sách", response);
      setCopies([response]);
    } catch (error) {
      console.log("lỗi rồi", { error });
      alert("Hãy nhập đúng mã sách");
    }
  };
  //Kiểm tra mã Id sách
  const getInfoId = async (bookId) => {
    try {
      const response = await productsApi.getBooksById(bookId);
      // console.log("đã lấy ra thông tin sách", response);
      setBookIdInfo(response.copies);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  //btn handle
  const handleAddCarts = (copiesId) => {
    dispatch(addCarts(copiesId));
    onHandleShow(false);
  };

  //render components
  // const renderDate = (time) => {
  //   const date = new Date(time);
  //   return date.toLocaleString();
  // };
  const checkBookById = (bookId) => {
    // console.log("Bắt đầu tìm book có id", bookId);
    getInfoId(bookId);
  };

  const renderBtnCopies = (status, copiesId, bookId, usersId) => {
    const checkUser = usersId.every((user) => user.id !== userId);
    if (checkUser) {
      if (status === "borrowed" || status === "reserved") {
        return (
          <>
            <Button disabled>Đã có người đặt</Button>
            <Button variant="secondary" onClick={() => checkBookById(bookId)}>
              Tìm kiếm bằng ID
            </Button>
            {checkBookById(bookId)}
          </>
        );
      } else {
        return (
          <Button
            variant="success"
            type="checkbox"
            onClick={() => handleAddCarts(copiesId)}
          >
            Chọn sách
          </Button>
        );
      }
    } else {
      return (
        <Button disabled variant="secondary">
          Bạn đã đặt rồi
        </Button>
      );
    }
  };
  const renderBtnBookId = (status, bookId) => {
    // console.log("bookid là", bookId);
    if (status === "borrowed" || status === "reserved") {
      return (
        <>
          <Button disabled>Không đặt được</Button>
        </>
      );
    } else {
      return (
        <Button
          variant="success"
          type="checkbox"
          onClick={() => dispatch(addCarts(bookId))}
        >
          Chọn sách
        </Button>
      );
    }
  };
  const renderUser = (user) => {
    // console.log("user sdsad", user);
    //Nếu không có user
    if (!user) {
      return <>Đang trống</>;
    }
    //Nếu đã có => checkId
    else {
      if (user._id === userId) {
        return <>Bạn</>;
      } else if (!user._id) {
        return <></>;
      } else {
        return <> Đã có</>;
      }
    }
  };
  const renderStatus = (status) => {
    switch (status) {
      case "available":
        return <>Đang trống</>;
      case "reserved":
        return <>Đã đặt lịch</>;

      default:
        return <>Đã huỷ </>;
    }
  };

  // render copies books
  const renderCopies = copies?.map((copy, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{renderStatus(copy.status)}</td>
        <td>{copy.title}</td>
        {/* <td>{copy.id}</td> */}
        {/* <td>{copy.book}</td> */}
        <td>{renderUser(copy.user)}</td>
        <td>{renderBtnCopies(copy.status, copy.id, copy.book, copy.users)}</td>
      </tr>
    );
  });

  //render book by id
  const renderBookIdInfo = bookIdInfo?.map((copy, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{renderStatus(copy.status)}</td>
        <td>{copies[0].title}</td>
        <td>{renderUser(copy.user)}</td>
        <td>{renderBtnBookId(copy.status, copy._id)}</td>
      </tr>
    );
  });

  return (
    <div>
      <FloatingLabel label="Nhập mã Copies của sách">
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={(e) => setBookId(e.target.value)}
        />
      </FloatingLabel>
      <Button onClick={getInfoCopies}>Kiểm tra sách</Button>
      <div className="checkoutReservation_search_show">
        {copies && (
          <>
            <legend>Kiểm tra bằng copies </legend>

            <Table striped hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Trạng thái</th>
                  <th>Tên sách</th>

                  <th>Người mượn</th>
                  {/* <th>Chọn sách</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>{renderCopies}</tbody>
            </Table>
          </>
        )}
        {bookIdInfo && (
          <>
            <legend>Kiểm tra bằng ID </legend>
            <Table hover striped>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Trạng thái</th>
                  <th>Tên sách</th>

                  <th>Người mượn</th>
                  <th>Chọn sách</th>
                </tr>
              </thead>
              <tbody>{renderBookIdInfo}</tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckBooks;

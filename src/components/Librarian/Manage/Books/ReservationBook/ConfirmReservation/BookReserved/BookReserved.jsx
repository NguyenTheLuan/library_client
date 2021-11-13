import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createCarts, selectCartUserId } from "reducers/librarianSlice";

function BookReserved() {
  const selectUserId = useSelector(selectCartUserId);
  const [userId, setUserId] = useState();
  const [carts, setCarts] = useState();
  const [status, setStatus] = useState(false);

  const [copies, setCopies] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("select id", selectUserId);
    setUserId(selectUserId);
  }, [selectUserId]);

  useEffect(() => {
    // console.log("select userId", userId);
    getScheduleUser();
  }, [userId]);

  const getScheduleUser = async () => {
    const id = userId;
    console.log("id là", id);
    try {
      const response = await userApi.getBookReserved(id);
      console.log("danh sách lịch đã đặt là", response);
      setCarts(response.results);
      // checkStatus(response.totalResults);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  // const checkStatus = (quantity) => {
  //   if (quantity > 0) {
  //     setStatus(true);
  //   } else {
  //     setStatus(false);
  //   }
  // };

  const setImg = (img) => {
    return <img style={{ width: "40px" }} src={img} alt="img" />;
  };

  const renderCarts = carts?.map((cart, index) => {
    return (
      <>
        <tr>
          {/* <td>{cart.id}</td> */}
          <td>{index + 1}</td>
          <td>{setImg(cart.cover)}</td>
          <td>{cart.copy}</td>
          <td>{cart.title}</td>
          <td>{cart.categories}</td>
          <td>{cart.authors}</td>
          <td>{cart.loanPeriodDays}</td>
          {/* <td>{cart.description}</td> */}
          <td>
            <input
              name={index}
              type="checkbox"
              onClick={(e) => setCopies([...copies, cart.copy])}
            />
          </td>
        </tr>
      </>
    );
  });

  //Chọn sách
  const chooseBook = () => {
    console.log("tiến hành đặt coppies", copies);
    dispatch(createCarts(copies));
  };

  return (
    <div>
      <legend>Danh sách sách đã hẹn</legend>
      {/* {status ? ( */}
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
        <Button onClick={() => chooseBook()}>Chọn sách</Button>
      </Table>
      {/* ) : (
        <h2>Không có sản phẩm nào</h2>
      )} */}
    </div>
  );
}

export default BookReserved;

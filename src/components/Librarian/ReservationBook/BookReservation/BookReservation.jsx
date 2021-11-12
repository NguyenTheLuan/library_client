import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { createCarts } from "reducers/librarianSlice";

function BookReservation() {
  const { path } = useRouteMatch();
  const [carts, setCarts] = useState();
  const [status, setStatus] = useState(false);

  const [copies, setCopies] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getScheduleUser();
  }, [status]);

  const getScheduleUser = async () => {
    const userId = path.split("/")[4];
    try {
      const response = await userApi.getViewSchedule(userId);
      // console.log("danh sách lịch đã đặt là", response);
      setCarts(response.results);
      checkStatus(response.totalResults);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const checkStatus = (quantity) => {
    if (quantity > 0) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

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
      {status ? (
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
      ) : (
        <h2>Không có sản phẩm nào</h2>
      )}
    </div>
  );
}

export default BookReservation;

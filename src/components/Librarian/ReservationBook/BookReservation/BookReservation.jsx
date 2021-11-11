import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useRouteMatch } from "react-router";

function BookReservation() {
  const { path } = useRouteMatch();
  const [carts, setCarts] = useState();
  const [status, setStatus] = useState(false);

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

  const renderCarts = carts?.map((cart) => {
    return (
      <>
        <tr>
          {/* <td>{cart.id}</td> */}
          <td>{cart.copy}</td>
          <td>{cart.title}</td>
          <td>{cart.categories}</td>
          <td>{cart.authors}</td>
          <td>{setImg(cart.cover)}</td>
          <td>{cart.loanPeriodDays}</td>
          <td>{cart.description}</td>
        </tr>
      </>
    );
  });

  return (
    <div>
      <legend>Danh sách sách đã hẹn</legend>
      {status ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Mã sách</th>
              <th>Tên sách</th>
              <th>Thể loại</th>
              <th>Tên tác giả</th>
              <th>Ảnh minh hoạ</th>
              <th>Thời gian mượn</th>
              <th>Miêu tả</th>
            </tr>
          </thead>
          <tbody>{renderCarts}</tbody>
        </Table>
      ) : (
        <h2>Không có sản phẩm nào</h2>
      )}
    </div>
  );
}

export default BookReservation;

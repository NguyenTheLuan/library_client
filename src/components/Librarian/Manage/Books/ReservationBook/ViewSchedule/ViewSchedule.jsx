import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Table, Button, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, selectCartUserId } from "reducers/librarianSlice";

function ViewSchedule() {
  const [reservation, setReservation] = useState();
  const [userId, setUserId] = useState();

  const selectUserId = useSelector(selectCartUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("selectUserId", selectUserId);
    setUserId(selectUserId);
  }, [selectUserId]);

  useEffect(() => {
    // console.log("userId", userId);
    getInfoReservation();
  }, [userId]);

  const getInfoReservation = async () => {
    const id = userId;
    // console.log("get info với id=", id);
    try {
      const response = await userApi.getSchedule(id);
      console.log("thành công", response);
      setReservation(response.results);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const renderBook = (books) => {
    // console.log(books);
    return books?.map((info) => {
      return <h6>{info.title}</h6>;
    });
  };
  const renderQuantityBook = (books) => {
    return books.length;
  };

  const rederReservation = reservation?.map((info, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{renderBook(info.books)}</td>
        <td>{renderQuantityBook(info.books)}</td>
        <td>{renderTime(info.createdDate)}</td>
        <td>{renderTime(info.dueDate)}</td>
        <td>{info.status}</td>
      </tr>
    );
  });

  const handleUserId = () => {
    // console.log(userId);
    dispatch(getUserId(userId));
  };

  return (
    <div>
      <div>
        <FloatingLabel label="Nhập id của người dùng">
          <Form.Control
            placeholder="abcxyz"
            onChange={(e) => setUserId(e.target.value)}
          />
        </FloatingLabel>
        <Button onClick={handleUserId}>Tìm kiếm</Button>
      </div>
      <div>
        <legend>
          Danh sách lịch đã hẹn
          {selectUserId ? <span> của người dùng {selectUserId}</span> : ""}
        </legend>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Sách mượn bao gồm</th>
              <th>Tổng cộng</th>
              <th>Ngày bắt đầu nhận</th>
              <th>Hạn chót</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>{rederReservation}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default ViewSchedule;

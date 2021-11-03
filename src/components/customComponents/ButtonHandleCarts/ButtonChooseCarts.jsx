import userApi from "apis/userApi";
import React from "react";
import { Button } from "react-bootstrap";

import { MdEventNote } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "reducers/userSlice";

import "./ButtonStyleCarts.scss";

function ButtonChooseCarts({ selectBooks }) {
  const isUser = useSelector(selectUser);
  const bookCarts = { books: selectBooks };
  // console.log("booksCarts", bookCarts);
  const makeReservation = async () => {
    try {
      const response = await userApi.postSchedule(isUser.id, bookCarts);
      // console.log("thành công", { response });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleClick = () => {
    console.log("đã chọn", selectBooks);
    makeReservation();
  };
  return (
    <>
      <Button variant="success" onClick={() => handleClick()}>
        <MdEventNote className="btnClick_icon" />
        <span className="btnClick_name">Đặt lịch hẹn</span>
      </Button>
    </>
  );
}

export default ButtonChooseCarts;

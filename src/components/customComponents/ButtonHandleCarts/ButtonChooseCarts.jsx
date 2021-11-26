import userApi from "apis/userApi";
import React from "react";
import { Button } from "react-bootstrap";
import { MdEventNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "reducers/authSlice";
import { deleteCartsId } from "reducers/userSlice";

//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ButtonStyleCarts.scss";

function ButtonChooseCarts({ selectBooks }) {
  const isUser = useSelector(selectUser);

  //Custom alert
  const notify = (status, info) =>
    toast[status](info, { position: toast.POSITION.BOTTOM_LEFT });

  const dispatch = useDispatch();

  const bookCarts = { books: selectBooks };

  // console.log("booksCarts", bookCarts);
  const makeReservation = async () => {
    try {
      // const response = await userApi.postSchedule(isUser.id, bookCarts);
      await userApi.postSchedule(isUser.id, bookCarts);
      // console.log("thành công", { response });
      // dispatch(isUpdateCarts(true));
      //Reset carts
      resetMyCarts(selectBooks);
      // alert("Đặt thành công, hãy kiểm tra lịch hẹn");
      notify("success", "Đặt lịch hẹn thành công, hãy kiểm tra lịch hẹn");
    } catch (error) {
      console.log({ error });
      // alert(error.response.data.message);
      notify("warn", ` Thất bại, ${error.response.data.message}`);
    }
  };

  const resetMyCarts = (books) => {
    books.map((bookId) => dispatch(deleteCartsId(bookId)));
  };

  const handleClick = () => {
    // console.log("đã chọn", selectBooks);
    if (selectBooks.length === 0) {
      notify("error", "Bạn chưa chọn cuốn nào");
    }
    selectBooks.length > 0 && makeReservation();

    //reset lại carts
  };
  return (
    <>
      <Button variant="success" onClick={() => handleClick()}>
        <MdEventNote className="btnClick_icon" />
        <span className="btnClick_name">Đặt lịch hẹn</span>
      </Button>

      <ToastContainer />
    </>
  );
}

export default ButtonChooseCarts;

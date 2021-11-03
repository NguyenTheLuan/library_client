import userApi from "apis/userApi";
import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addBookById } from "reducers/bookSlice";
import { selectUser } from "reducers/userSlice";
import "./ButtonStyleCarts.scss";

function ButtonAddCarts({ product }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const addCarts = async () => {
    const userId = user.id;
    const bookId = product.id;
    try {
      await userApi.postAddToCart(userId, bookId);
      // console.log("thêm vào thành công");

      //truyền vô redux
      dispatch(addBookById(bookId));
      alert("Add sản phẩm thành công");
    } catch (error) {
      // console.log("lỗi tại buttonAddCarts", error.response.data.message);
      alert(`Thất bại ${error.response.data.message}`);
    }
  };

  const handleAdd = () => {
    if (!user) {
      history.push("/login");
    } else {
      addCarts();
    }
  };

  return (
    <>
      <Button className="btnClick" onClick={() => handleAdd()}>
        <AiOutlineShoppingCart className="btnClick_icon" />
        <span className="btnClick_name">Thêm vào giỏ sách</span>
      </Button>
    </>
  );
}

export default ButtonAddCarts;

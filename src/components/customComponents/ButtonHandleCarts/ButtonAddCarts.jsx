import userApi from "apis/userApi";
import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "reducers/userSlice";
import "./ButtonStyleCarts.scss";

function ButtonAddCarts({ product }) {
  const user = useSelector(selectUser);
  const history = useHistory();
  // useEffect(() => {}, []);

  const addCarts = async () => {
    const userId = user.id;
    const bookId = product.id;
    try {
      await userApi.postAddToCart(userId, bookId);
      alert("Add sản phẩm thành công");
    } catch (error) {
      console.log("lỗi", { error });
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

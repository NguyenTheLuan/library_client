import userApi from "apis/userApi";
import React from "react";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "reducers/authSlice";
import { deleteCartsId } from "reducers/userSlice";
import "./ButtonStyleCarts.scss";

function ButtonDeleteCarts({ product }) {
  // console.log("delete products", { product });
  const user = useSelector(selectUser);
  const history = useHistory();

  const dispatch = useDispatch();

  const deleteCarts = async () => {
    //Truyền vào userId và bookId để tiến thành xoá
    const userId = user.id;
    const bookId = product.id;
    try {
      await userApi.deleteBooksOfCart(userId, bookId);

      //xoá bookById và resetup cho redux
      dispatch(deleteCartsId(bookId));
      //Thông báo xoá thành công
      alert("Xoá sản phẩm thành công");
    } catch (error) {
      console.log("lỗi tại delecarts", { error });
    }
  };

  const handleClick = () => {
    if (!user) {
      history.push("/login");
    } else {
      deleteCarts();
    }
  };

  return (
    <>
      <Button
        variant="danger"
        className="btnClick"
        onClick={() => handleClick()}
      >
        <MdDeleteForever className="btnClick_icon" />
        <span className="btnClick_name">Xoá sách</span>
      </Button>
    </>
  );
}

export default ButtonDeleteCarts;

import userApi from "apis/userApi";
import React from "react";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "reducers/userSlice";
import "./ButtonStyleCarts.scss";

function ButtonDeleteCarts({ product }) {
  console.log("delete products", { product });
  const user = useSelector(selectUser);
  const history = useHistory();
  // useEffect(() => {}, []);

  const deleteCarts = async () => {
    const userId = user.id;
    const bookId = product.id;
    try {
      await userApi.deleteBooksOfCart(userId, bookId);
      alert("Xoá sản phẩm thành công");
    } catch (error) {
      console.log("lỗi", { error });
    }
  };

  const handleAdd = () => {
    if (!user) {
      history.push("/login");
    } else {
      deleteCarts();
    }
  };

  return (
    <>
      <Button variant="danger" className="btnClick" onClick={() => handleAdd()}>
        <MdDeleteForever className="btnClick_icon" />
        <span className="btnClick_name">Xoá sách</span>
      </Button>
    </>
  );
}

export default ButtonDeleteCarts;

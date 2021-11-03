import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Badge, OverlayTrigger } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllProduct, getQuantity, selectQuantity } from "reducers/bookSlice";
import { selectUser } from "reducers/userSlice";
import { TooltipItems } from "../TooltipItems/TooltipItems";
import "./Carts.scss";

function Carts() {
  console.log("chạy lại cart");

  const history = useHistory();
  const isUser = useSelector(selectUser);
  const dispatch = useDispatch();

  //Nhận số lượng sách từ redux
  const setQuantity = useSelector(selectQuantity);
  // console.log(setQuantity);

  const [cartCounts, setCartCounts] = useState(0);

  // const [error, setError] = useState("");

  useEffect(() => {
    isUser && getCarts();
  }, [cartCounts, setQuantity]);

  const getCarts = async () => {
    const idUSer = isUser.id;
    try {
      const response = await userApi.getCarts(idUSer);

      //truyền vô redux

      //truyền books
      dispatch(getAllProduct(response.results));

      //truyền số lượng
      dispatch(getQuantity(response.totalResults));

      //Hiện thị thông số lên carts

      setCartCounts(response.totalResults);
      // setCartCounts(setQuantity);

      //Lưu để f5 vẫn còn giữ giá trị
      sessionStorage.setItem("carts", JSON.stringify(response));
      // console.log(
      //   "lấy từ session carts",
      //   JSON.parse(sessionStorage.getItem("carts")).results
      // );
    } catch (error) {
      // setError(error.response.data.message);
      console.log("lỗi từ cart", { error });
    }
  };

  const cartIcon = () => {
    return (
      <div className="carts" onClick={() => history.push("/user/carts")}>
        <AiOutlineShoppingCart className="carts_icon" />
        <Badge bg="secondary" className="carts_quantity">
          {cartCounts}
        </Badge>
      </div>
    );
  };

  return (
    <>
      <OverlayTrigger
        key="bottom"
        placement="bottom"
        // overlay={<Tooltip>Đến giỏ hàng</Tooltip>}
        overlay={TooltipItems("Giỏ hàng")}
      >
        {cartIcon()}
      </OverlayTrigger>
    </>
  );
}

export default Carts;

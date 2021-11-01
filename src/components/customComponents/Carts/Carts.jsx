import userApi from "apis/userApi";
import React, { useEffect, useState } from "react";
import { Badge, OverlayTrigger } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllProduct } from "reducers/productSlice";
import { selectUser } from "reducers/userSlice";
import { TooltipItems } from "../TooltipItems/TooltipItems";
import "./Carts.scss";

function Carts() {
  const history = useHistory();
  const [cartCounts, setCartCounts] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    isUser && getCarts();
  }, []);

  const isUser = useSelector(selectUser);

  const dispatch = useDispatch();

  const getCarts = async () => {
    const idUSer = isUser.id;
    try {
      const response = await userApi.getCarts(idUSer);
      dispatch(getAllProduct(response));
      setCartCounts(response.totalResults);
      sessionStorage.setItem("carts", JSON.stringify(response));
    } catch (error) {
      // setError(error.response.data.message);
      setError("Thất bại");
    }
  };

  const cartIcon = () => {
    return (
      <div className="carts" onClick={() => history.push("/user/carts")}>
        {error && <h2>{error}</h2>}
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

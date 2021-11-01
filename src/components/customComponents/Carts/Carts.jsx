import React, { useState } from "react";
import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory } from "react-router";
import "./Carts.scss";

function Carts() {
  const history = useHistory();
  const [cartCounts, setCartCounts] = useState(0);

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
    // <div className="carts" onClick={() => history.push("/user/carts")}>
    //    <AiOutlineShoppingCart className="carts_icon" />
    //     <Badge bg="secondary" className="carts_quantity">
    //       {cartCounts}
    //     </Badge>
    //   </div>
    <>
      <OverlayTrigger
        key="bottom"
        placement="bottom"
        overlay={<Tooltip>Đến giỏ hàng</Tooltip>}
      >
        {cartIcon()}
      </OverlayTrigger>
    </>
  );
}

export default Carts;

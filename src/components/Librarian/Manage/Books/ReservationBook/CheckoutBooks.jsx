import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import "./CheckoutBooks.scss";

function CheckoutBooks() {
  const [userId, setUserId] = useState();

  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   console.log("Đã nhận được userId", userId);
  // }, [userId]);

  const handleUserId = () => {
    setShow(!show);
  };

  const renderReservation = () => {
    if (show) {
      return (
        <>
          Hiển thị ra thông tin mượn sách của user có Id: {userId}
          <Button variant="primary">Đặt thêm sách khác?</Button>
          <Button variant="success">Tiến hành mượn sách</Button>
        </>
      );
    } else {
      return <>Không có gì để hiện</>;
    }
  };

  return (
    <div className="checkoutForm">
      {/* Search thông tin user */}
      <div className="checkoutForm_input">
        <FloatingLabel label="Nhập id của người dùng">
          <Form.Control
            placeholder="abcxyz"
            onChange={(e) => setUserId(e.target.value)}
          />
        </FloatingLabel>
        <Button onClick={handleUserId}>Tìm kiếm</Button>
      </div>

      {/* Hiện thị nội dung */}
      <div className="checkoutForm_contents">{renderReservation()}</div>
    </div>
  );
}

export default CheckoutBooks;

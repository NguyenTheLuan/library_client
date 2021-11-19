import ButtonChooseCarts from "components/customComponents/ButtonHandleCarts/ButtonChooseCarts";
import ButtonDeleteCarts from "components/customComponents/ButtonHandleCarts/ButtonDeleteCarts";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectMyCarts, selectMyTotalCarts } from "reducers/userSlice";
import "./MyCarts.scss";

function MyCarts() {
  document.title = "Giỏ hàng cá nhân";

  //Lấy carts từ user
  const getMyCarts = useSelector(selectMyCarts);
  const getMyTotalCarts = useSelector(selectMyTotalCarts);

  // Danh sách carts
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getMyCarts && setCarts(getMyCarts);
    // console.log("đã nhận được thông tin cập nhật", getMyCarts);
  }, [getMyCarts, getMyTotalCarts]);

  const [selectBooks, setSelectBooks] = useState([]);

  const handleClick = (details) => {
    if (selectBooks.length === 0) {
      setSelectBooks([details]);
    } else {
      checkCarts(details);
    }
  };

  const checkCarts = (details) => {
    // console.log("checkCarts", details);
    const findBookSId = selectBooks.findIndex(
      (bookItems) => bookItems === details
    );
    // console.log("vị trí cần xoá", findBookSId);
    //Khi có vị trí => xoá
    if (findBookSId > -1) {
      const newCarts = [...selectBooks];
      // Tiến hành xoá
      newCarts.splice(findBookSId, 1);
      //Set lại state
      setSelectBooks(newCarts);
    }
    //Khi có không vị trí => add
    else if (findBookSId === -1) {
      setSelectBooks([...selectBooks, details]);
    }
  };

  const imgCarts = (img) => {
    return <img src={img} alt="img-book" />;
  };

  const showMyCarts = carts.map((details, index) => {
    // console.log("có chạy lại", details);
    return (
      <tr key={index}>
        <th>
          <input type="checkbox" onChange={() => handleClick(details.id)} />
        </th>
        <th>{index + 1}</th>
        <th>{imgCarts(details.cover)}</th>
        <th>{details.title}</th>
        <th>{details.copies}</th>
        <th>
          <ButtonDeleteCarts product={details} />
        </th>
      </tr>
    );
  });

  // console.log("all carts từ my carts", carts);

  return (
    <>
      <Table className="cartTable" striped bordered hover>
        <thead className="cartTable_header">
          <tr>
            <th>Chọn</th>
            <th>STT</th>
            <th>Ảnh minh hoạ</th>
            <th>Tên sách</th>
            <th>Còn trong kho</th>
            <th>Xoá sản phẩm</th>
          </tr>
        </thead>
        <tbody className="cartTable_contents">{showMyCarts}</tbody>
      </Table>
      <ButtonChooseCarts selectBooks={selectBooks} />
    </>
  );
}

export default MyCarts;

import ButtonDeleteCarts from "components/customComponents/ButtonHandleCarts/ButtonDeleteCarts";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "reducers/bookSlice";
import { selectUser } from "reducers/userSlice";
import "./MyCarts.scss";

function MyCarts() {
  //Lấy Books từ redux
  const getCarts = useSelector(selectProducts);

  // console.log("get carts from redux", getCarts);

  // Danh sách carts
  const [carts, setCarts] = useState([]);

  // const [deleteById, setDeleteById] = useState();

  useEffect(() => {
    getCarts && setCarts(getCarts);
  }, [getCarts]);

  const imgCarts = (img) => {
    return <img src={img} alt="img-book" />;
  };

  const showMyCarts = carts.map((details, index) => {
    console.log("có chạy lại", details);
    return (
      <tr key={index}>
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
    <Table className="cartTable" striped bordered hover>
      <thead className="cartTable_header">
        <tr>
          <th>STT</th>
          <th>Ảnh minh hoạ</th>
          <th>Tên sách</th>
          <th>Còn trong kho</th>
          <th>Xoá sản phẩm</th>
        </tr>
      </thead>
      <tbody className="cartTable_contents">{showMyCarts}</tbody>
    </Table>
  );
}

export default MyCarts;

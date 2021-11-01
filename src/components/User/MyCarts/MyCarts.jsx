import ButtonDeleteCarts from "components/customComponents/ButtonHandleCarts/ButtonDeleteCarts";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectProducts } from "reducers/productSlice";
import "./MyCarts.scss";

function MyCarts() {
  const getCarts = useSelector(selectProducts);
  const [carts, setCarts] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setCarts(getCarts.results);
  }, []);

  const imgCarts = (img) => {
    return <img src={img} alt="img-book" />;
  };

  // console.log(carts);
  const showMyCarts = carts.map((details, index) => {
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

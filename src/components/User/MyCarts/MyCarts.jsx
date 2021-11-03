import userApi from "apis/userApi";
import ButtonDeleteCarts from "components/customComponents/ButtonHandleCarts/ButtonDeleteCarts";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookById, selectProducts } from "reducers/bookSlice";
import { selectUser } from "reducers/userSlice";

import "./MyCarts.scss";

function MyCarts() {
  //Lấy Books từ redux
  const getCarts = useSelector(selectProducts);
  const getUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [deleteBookId, setDeleteBookId] = useState(null);

  // console.log("get carts from redux", getCarts);

  // Danh sách carts
  const [carts, setCarts] = useState([]);

  // const [deleteById, setDeleteById] = useState();

  useEffect(() => {
    getCarts && setCarts(getCarts);
  }, [getCarts]);

  //Nhập props từ con để reset
  const onUpdateCart = (bookId) => {
    // const userId = getUser.id;
    console.log("đã xoá bookId: ", bookId);
    // setDeleteBookId(bookId);
    // deleteCarts(getUser.id, bookId);
  };

  const imgCarts = (img) => {
    return <img src={img} alt="img-book" />;
  };

  //xoá items
  // const deleteCarts = async (userId, bookId) => {
  //   //Truyền vào userId và bookId để tiến thành xoá
  //   try {
  //     await userApi.deleteBooksOfCart(userId, bookId);
  //     console.log("xoá thành công");

  //     //xoá bookById và resetup cho redux
  //     dispatch(deleteBookById(bookId));
  //     //Thông báo xoá thành công
  //     // alert("Xoá sản phẩm thành công");
  //   } catch (error) {
  //     console.log("lỗi tại delecarts", { error });
  //   }
  // };

  const showMyCarts = carts.map((details, index) => {
    console.log("có chạy lại", details);
    return (
      <tr key={index}>
        <th>{index + 1}</th>
        <th>{imgCarts(details.cover)}</th>
        <th>{details.title}</th>
        <th>{details.copies}</th>
        <th>
          <ButtonDeleteCarts product={details} onUpdateCart={onUpdateCart} />
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

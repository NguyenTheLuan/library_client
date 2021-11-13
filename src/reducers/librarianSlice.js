import { createSlice } from "@reduxjs/toolkit";

const librarianSlice = createSlice({
  name: "carts",
  initialState: {
    carts: JSON.parse(localStorage.getItem("cartsCheckout"))
      ? JSON.parse(localStorage.getItem("cartsCheckout"))
      : [],
  },
  reducers: {
    //tạo carts để đặt cho user
    createCarts(state, action) {
      state.carts = action.payload;
      localStorage.setItem("cartsCheckout", JSON.stringify(state.carts));
    },
    //thêm vô carts
    addCarts(state, action) {
      var newCarts = [];
      const checkCart = state.carts.some((bookId) => bookId === action.payload);
      //Nếu như không tìm ra => thêm
      // console.log(checkCart);

      if (!checkCart) {
        newCarts = [...state.carts, action.payload];
        alert("Thêm thành công");
        state.carts = newCarts;
        localStorage.setItem("cartsCheckout", JSON.stringify(state.carts));
      } else {
        alert("Không thêm được");
      }
    },
    //xoá đi nếu user không muốn nữa
    deleteCarts(state, action) {
      const newItemsFromCarts = state.carts.filter(
        (book) => book !== action.payload
      );

      state.carts = newItemsFromCarts;
      localStorage.setItem("cartsCheckout", JSON.stringify(state.carts));
    },
  },
});

export const { createCarts, addCarts, deleteCarts } = librarianSlice.actions;
export const selectCartCheckout = (state) => state.librarian.carts;

export default librarianSlice.reducer;

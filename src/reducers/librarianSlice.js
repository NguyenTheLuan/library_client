import { createSlice } from "@reduxjs/toolkit";

const librarianSlice = createSlice({
  name: "carts",
  initialState: {
    carts: JSON.parse(sessionStorage.getItem("cartsCheckout"))
      ? JSON.parse(sessionStorage.getItem("cartsCheckout"))
      : [],
  },
  reducers: {
    //tạo carts để đặt cho user
    addCreateCarts(state, action) {
      state.carts = action.payload;
      sessionStorage.setItem("cartsCheckout", JSON.stringify(state.carts));
    },
    //xoá đi nếu user không muốn nữa
    delete(state) {
      // state.carts = state.carts - 1;
    },
  },
});

export const { addCreateCarts, deleteCarts } = librarianSlice.actions;
export const selectCartCheckout = (state) => state.librarian.carts;

export default librarianSlice.reducer;

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
    createCarts(state, action) {
      state.carts = action.payload;
      sessionStorage.setItem("cartsCheckout", JSON.stringify(state.carts));
    },
    //thêm vô carts
    addCarts(state, action) {
      var newCarts = [];
      const checkCart = state.carts.some((bookId) => bookId === action.payload);
      //Nếu như không tìm ra => thêm
      console.log(checkCart);
      if (!checkCart) {
        newCarts = [...state.carts, action.payload];
      }
      state.carts = newCarts;
      sessionStorage.setItem("cartsCheckout", JSON.stringify(state.carts));
    },
    //xoá đi nếu user không muốn nữa
    deleteCarts(state, action) {
      const newItemsFromCarts = state.carts.filter(
        (book) => book !== action.payload
      );

      state.carts = newItemsFromCarts;
      sessionStorage.setItem("books", JSON.stringify(state.carts));
    },
  },
});

export const { createCarts, addCarts, deleteCarts } = librarianSlice.actions;
export const selectCartCheckout = (state) => state.librarian.carts;

export default librarianSlice.reducer;

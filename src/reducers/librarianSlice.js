import { createSlice } from "@reduxjs/toolkit";

const librarianSlice = createSlice({
  name: "carts",
  initialState: {
    carts: JSON.parse(localStorage.getItem("cartsCheckout"))
      ? JSON.parse(localStorage.getItem("cartsCheckout"))
      : [],
    userId: JSON.parse(localStorage.getItem("userId"))
      ? JSON.parse(localStorage.getItem("userId"))
      : [],
  },
  reducers: {
    //get id user
    getUserId(state, action) {
      state.userId = action.payload;
      localStorage.setItem("userId", JSON.stringify(state.userId));
    },

    //tạo carts để đặt cho user
    createCarts(state, action) {
      state.carts = action.payload;
      localStorage.setItem("cartsCheckout", JSON.stringify(state.carts));
    },
    //thêm vô carts
    addCarts(state, action) {
      var newCarts = [];
      const checkCart = state.carts.some((bookId) => bookId === action.payload);

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
      // console.log(action.payload);
      // console.log("còn đây là carts", state.carts);
      const newItemsFromCarts = state.carts.filter(
        (book) => book !== action.payload
      );

      state.carts = newItemsFromCarts;
      localStorage.setItem("cartsCheckout", JSON.stringify(state.carts));
      alert("xoá thành công");
    },
  },
});

export const { createCarts, addCarts, deleteCarts, getUserId } =
  librarianSlice.actions;
export const selectCartCheckout = (state) => state.librarian.carts;
export const selectCartUserId = (state) => state.librarian.userId;

export default librarianSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "cartItems",
  initialState: {
    //book from carts
    carts: JSON.parse(sessionStorage.getItem("myCarts"))
      ? JSON.parse(sessionStorage.getItem("myCarts")).results
      : null,
    //quantity of books from carts
    totalCarts: JSON.parse(sessionStorage.getItem("myCarts"))
      ? JSON.parse(sessionStorage.getItem("myCarts")).totalResults
      : null,
    // isUpdate: false,
  },
  reducers: {
    //Nhận books khi load lại Cart từ api
    getMyCarts(state, action) {
      state.carts = action.payload;
    },
    //Nhận số lượng of books khi load lại Cart từ api
    getTotalCarts(state, action) {
      state.totalCarts = action.payload;
    },
    //Xoá books
    deleteCartsId(state, action) {
      const newItemsFromCarts = state.carts.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      // console.log("đây là từ delete redux", newItemsFromCarts);
      state.totalCarts = state.totalCarts - 1;
      state.carts = newItemsFromCarts;
      sessionStorage.setItem("myCarts", JSON.stringify(state.carts));
    },
    //Add books
    addCartsId(state, action) {
      const newBookId = action.payload;
      const newItemsFromCarts = { ...state.carts, newBookId };

      state.totalCarts = state.totalCarts + 1;
      state.carts = newItemsFromCarts;
      sessionStorage.setItem("myCarts", JSON.stringify(state.carts));
    },
    // isUpdateCart(state) {
    //   state.isUpdate = true;
    // },
  },
});

export const {
  getMyCarts,
  getTotalCarts,
  deleteCartsId,
  addCartsId,
  isUpdateCarts,
} = userSlice.actions;

export const selectMyCarts = (state) => state.user.carts;
export const selectMyTotalCarts = (state) => state.user.totalCarts;
// export const selectUpdateCarts = (state) => state.books.isUpdate;

export default userSlice.reducer;

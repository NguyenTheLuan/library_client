import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "cartItems",
  initialState: {
    //book from carts
    books: JSON.parse(sessionStorage.getItem("carts"))
      ? JSON.parse(sessionStorage.getItem("carts")).results
      : null,
    //quantity of books from carts
    quantityBooks: JSON.parse(sessionStorage.getItem("carts"))
      ? JSON.parse(sessionStorage.getItem("carts")).totalResults
      : null,
    // isUpdate: false,
  },
  reducers: {
    //Nhận books khi load lại Cart từ api
    getAllProduct(state, action) {
      state.books = action.payload;
    },
    //Nhận số lượng of books khi load lại Cart từ api
    getQuantity(state, action) {
      state.quantityBooks = action.payload;
    },
    //Xoá books
    deleteBookById(state, action) {
      const newItemsFromCarts = state.books.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      // console.log("đây là từ delete redux", newItemsFromCarts);
      state.quantityBooks = state.quantityBooks - 1;
      state.books = newItemsFromCarts;
      sessionStorage.setItem("carts", JSON.stringify(state.books));
    },
    //Add books
    addBookById(state, action) {
      const newBookId = action.payload;
      const newItemsFromCarts = { ...state.books, newBookId };

      state.quantityBooks = state.quantityBooks + 1;
      state.books = newItemsFromCarts;
      sessionStorage.setItem("carts", JSON.stringify(state.books));
    },
    // isUpdateCart(state) {
    //   state.isUpdate = true;
    // },
  },
});

export const {
  getAllProduct,
  getQuantity,
  deleteBookById,
  addBookById,
  isUpdateCarts,
} = productSlice.actions;

export const selectProducts = (state) => state.books.books;
export const selectQuantity = (state) => state.books.quantityBooks;
// export const selectUpdateCarts = (state) => state.books.isUpdate;

export default productSlice.reducer;

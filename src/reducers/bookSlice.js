import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "cartItems",
  initialState: {
    //book from carts
    books: JSON.parse(sessionStorage.getItem("books"))
      ? JSON.parse(sessionStorage.getItem("books")).results
      : null,
    //quantity of books from carts
    totalBooks: JSON.parse(sessionStorage.getItem("books"))
      ? JSON.parse(sessionStorage.getItem("books")).totalResults
      : null,
    // isUpdate: false,
  },
  reducers: {
    //Nhận books khi load lại Cart từ api
    getBooks(state, action) {
      state.books = action.payload;
    },
    //Nhận số lượng of books khi load lại Cart từ api
    getTotalBooks(state, action) {
      state.totalBooks = action.payload;
    },
    //Xoá books
    deleteBookById(state, action) {
      const newItemsFromCarts = state.books.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      // console.log("đây là từ delete redux", newItemsFromCarts);
      state.totalBooks = state.totalBooks - 1;
      state.books = newItemsFromCarts;
      sessionStorage.setItem("books", JSON.stringify(state.books));
    },
    //Add books
    addBookById(state, action) {
      var newCarts = [];
      const checkCart = state.books.some(
        (bookId) => bookId.id === action.payload
      );
      //Nếu như không tìm ra => thêm
      // console.log(checkCart);

      if (!checkCart) {
        newCarts = [...state.carts, action.payload];
        alert("Thêm thành công");
        state.books = newCarts;
        sessionStorage.setItem("books", JSON.stringify(state.books));
      } else {
        alert("Không thêm được");
      }
    },

    //   const newBookId = action.payload;
    //   const newItemsFromCarts = [...state.books, newBookId];

    //   state.totalBooks = state.totalBooks + 1;
    //   state.books = newItemsFromCarts;
    //   sessionStorage.setItem("books", JSON.stringify(state.books));
    // },
  },
});

export const {
  getBooks,
  getTotalBooks,
  deleteBookById,
  addBookById,
  isUpdateCarts,
} = productSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectTotalBooks = (state) => state.books.totalBooks;

export default productSlice.reducer;

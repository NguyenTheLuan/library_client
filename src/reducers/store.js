import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import booksReducer from "./bookSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
  },
});

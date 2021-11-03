import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import booksReducer from "./bookSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    books: booksReducer,
  },
});

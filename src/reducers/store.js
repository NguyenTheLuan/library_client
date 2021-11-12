import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import booksReducer from "./bookSlice";
import adminReducer from "./adminSlice";
import librarianReducer from "./librarianSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    admin: adminReducer,
    librarian: librarianReducer,
    user: userReducer,
  },
});

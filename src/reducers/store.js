import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import booksReducer from "./bookSlice";
import usersReducer from "./userSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    users: usersReducer,
  },
});

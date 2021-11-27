import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    //login
    loginIn(state, action) {
      state.auth = action.payload;
    },
    //logout
    logOut(state) {
      state.auth = null;
    },
  },
});

export const { loginIn, logOut } = authSlice.actions;

export const selectUser = (state) => state.auth.auth;

export default authSlice.reducer;

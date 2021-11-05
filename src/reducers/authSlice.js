import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    //auth
    loginIn(state, action) {
      state.auth = action.payload;
    },
    logOut(state) {
      state.auth = null;
    },

    //handle Click
    // chooseItems(state, action) {
    //   state.clickItems = action.payload;
    // },
  },
});

export const { loginIn, logOut } = authSlice.actions;

export const selectUser = (state) => state.auth.auth;

export default authSlice.reducer;

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
    //refresh token
    refreshTokenAuth(state, action) {
      const { access, refresh } = action.payload;

      localStorage.setItem("access", JSON.stringify(access));
      //Thiết lập lại refresh token
      localStorage.setItem("refresh", JSON.stringify(refresh));

      alert("Refresh token thành công");
    },
  },
});

export const { loginIn, logOut, refreshTokenAuth } = authSlice.actions;

export const selectUser = (state) => state.auth.auth;

export default authSlice.reducer;

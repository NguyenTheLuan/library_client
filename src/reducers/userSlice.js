import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    // clickItems: null,
  },
  reducers: {
    //auth
    loginIn(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
    },

    //handle Click
    // chooseItems(state, action) {
    //   state.clickItems = action.payload;
    // },
  },
});

export const { loginIn, logOut } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectClickItems = (state) => state.user.clickItems;

export default userSlice.reducer;

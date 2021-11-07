import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "user",
  initialState: {
    totalUsers: JSON.parse(sessionStorage.getItem("totalUsers"))
      ? JSON.parse(sessionStorage.getItem("totalUsers"))
      : null,
  },
  reducers: {
    //get user
    getUsers(state, action) {
      state.totalUsers = action.payload;
    },
    //delete user
    deleteUserById(state) {
      state.totalUsers = state.totalUsers - 1;
    },
    //add user
    addUserById(state) {
      state.totalUsers = state.totalUsers + 1;
    },
  },
});

export const { getUsers, deleteUserById, addUserById } = adminSlice.actions;

export const selectTotalUsers = (state) => state.admin.totalUsers;

export default adminSlice.reducer;

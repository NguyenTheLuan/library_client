import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: JSON.parse(sessionStorage.getItem("carts"))
      ? JSON.parse(sessionStorage.getItem("carts"))
      : null,
  },
  reducers: {
    getAllProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { getAllProduct } = productSlice.actions;

export const selectProducts = (state) => state.product.product;

export default productSlice.reducer;

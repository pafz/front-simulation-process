import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsService from './productsService';

export const getProducts = createAsyncThunk(
  'products/getPtoducts',
  async () => {
    try {
      return await productsService.getProducts();
    } catch (error) {
      console.error(error);
    }
  }
);

export const reducer = builder => {
  builder.addCase(getProducts.fulfilled, (state, action) => {
    state.products = action.payload;
  });
};

export const products = createSlice({
  name: 'products',
  initialState: { products: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

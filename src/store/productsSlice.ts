import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ScenePack } from "@/types/womens-fashion";
import { getFashionProducts } from "@/services/produceApi";

interface ProductsState {
  items: ScenePack[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const data = await getFashionProducts();
    return data.data || [];
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export default productsSlice.reducer;

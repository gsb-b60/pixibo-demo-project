import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProductDetailState {
  isZoomed: boolean;
  selectedImageIndex: number;
}

const initialState: ProductDetailState = {
  isZoomed: false,
  selectedImageIndex: 0,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setZoomed(state, action: PayloadAction<boolean>) {
      state.isZoomed = action.payload;
    },
    setSelectedImageIndex(state, action: PayloadAction<number>) {
      state.selectedImageIndex = action.payload;
    },
    navigateImage(state, action: PayloadAction<{ direction: number; total: number }>) {
      const { direction, total } = action.payload;
      if (total <= 0) return;
      state.selectedImageIndex = (state.selectedImageIndex + direction + total) % total;
    },
    resetDetail() {
      return initialState;
    },
  },
});

export const { setZoomed, setSelectedImageIndex, navigateImage, resetDetail } =
  productDetailSlice.actions;
export default productDetailSlice.reducer;

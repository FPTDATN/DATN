import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IDiscount } from '@/types/discount';
import axios from "axios";

interface SaleState {
  saleItems: IDiscount[];
  loading: boolean;
  error: string | undefined;
  addedDiscounts: string;
  // Các trạng thái khác nếu cần
}
const initialState: SaleState = {
  saleItems: [],
  loading: false,
  error: "",
  addedDiscounts: '',
  // Các giá trị khởi tạo khác
};
const saleSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addSaleItem: (state, action: PayloadAction<IDiscount>) => {
      const { _id } = action.payload;
      const existingItem = state.saleItems.find(item => item._id === _id);
      if (!existingItem) {
        state.saleItems.push(action.payload);
      }
    },
    removeSaleItem: (state, action: PayloadAction<string>) => {
      state.saleItems = state.saleItems.filter(item => item._id !== action.payload);
    },
    updateSaleItem: (state, action: PayloadAction<IDiscount>) => {
      const index = state.saleItems.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.saleItems[index] = action.payload;
      }
    },
    clearSaleItems: state => {
      state.saleItems = [];
    },
    toggleAddedDiscount: (state, action: PayloadAction<string>) => {
      const discountId = action.payload;
      if (state.addedDiscounts) {
        const index = state.addedDiscounts.indexOf(discountId);
        if (index === -1) {
          state.addedDiscounts.push(discountId);
        } else {
          state.addedDiscounts.splice(index, 1);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
  
    // Nếu bạn có các thao tác khác, bạn có thể tiếp tục thêm ở đây
  },
});

export const { addSaleItem, removeSaleItem, updateSaleItem, clearSaleItems, toggleAddedDiscount } = saleSlice.actions;

export const saleReducer = saleSlice.reducer;

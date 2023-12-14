import { createSlice, PayloadAction ,createAsyncThunk} from '@reduxjs/toolkit';
import { IDiscount } from '@/types/discount';
import axios from "axios";

interface SaleState {
      saleItems: IDiscount[];
      loading: boolean;
      error: string | undefined;
      // Các trạng thái khác nếu cần
}
const initialState: SaleState = {
      saleItems: [],
      loading: false,
      error: "",
      // Các giá trị khởi tạo khác
};
// Lấy danh sách mã giảm giá từ backend
export const fetchDiscounts = createAsyncThunk('sales/fetchDiscounts', async () => {
      try {
        const response = await axios.get('/api/discounts');
        return response.data;
      } catch (error) {
        throw Error('Error fetching discounts');
      }
    });
    
    // Xóa mã giảm giá dựa trên ID từ backend
    export const deleteDiscount = createAsyncThunk('sales/deleteDiscount', async (discountId: string) => {
      try {
        await axios.delete(`/api/discounts/${discountId}`);
        return discountId;
      } catch (error) {
        throw Error('Error deleting discount');
      }
    });
    
    // Thêm mã giảm giá mới thông qua backend
    export const addDiscount = createAsyncThunk('sales/addDiscount', async (discountData: any) => {
      try {
        const response = await axios.post('/api/discounts', discountData);
        return response.data;
      } catch (error) {
        throw Error('Error adding discount');
      }
    });
    
    // Cập nhật thông tin mã giảm giá thông qua backend
    export const updateDiscount = createAsyncThunk('sales/updateDiscount', async (updatedData: any) => {
      try {
        const response = await axios.put(`/api/discounts/${updatedData.id}`, updatedData);
        return response.data;
      } catch (error) {
        throw Error('Error updating discount');
      }
    });
    
    // Áp dụng mã giảm giá từ backend
    export const applyDiscount = createAsyncThunk('sales/applyDiscount', async (discountId: string) => {
      try {
        const response = await axios.post(`/api/discounts/count/${discountId}`);
        return response.data;
      } catch (error) {
        throw Error('Error applying discount');
      }
    });
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
            // Các reducers khác bạn muốn thêm vào đây
      },
      extraReducers: (builder) => {
            builder
              // Xử lý trạng thái khi lấy danh sách mã giảm giá từ backend thành công
              .addCase(fetchDiscounts.pending, (state) => {
                state.loading = true;
                state.error = '';
              })
              .addCase(fetchDiscounts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.saleItems = action.payload; // Cập nhật danh sách mã giảm giá
              })
              .addCase(fetchDiscounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error fetching discounts';
              })
              // Xử lý trạng thái khi xóa mã giảm giá thành công
              .addCase(deleteDiscount.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.saleItems = state.saleItems.filter(item => item._id !== action.payload);
              })
              // Xử lý trạng thái khi xảy ra lỗi khi xóa mã giảm giá
              .addCase(deleteDiscount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error deleting discount';
              })
              // Tương tự cho các createAsyncThunk còn lại
              .addCase(applyDiscount.pending, (state) => {
                  state.loading = true;
                  state.error = '';
                })
                .addCase(applyDiscount.fulfilled, (state) => {
                  state.loading = false;
                  state.error = '';
                  // Handle any state changes upon successful application of the discount if needed
                })
                .addCase(applyDiscount.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.error.message ?? 'Error applying discount';
                  // Handle any state changes upon failure to apply the discount if needed
                });
        
            // Nếu bạn có các thao tác khác, bạn có thể tiếp tục thêm ở đây
          },
});

export const { addSaleItem, removeSaleItem, updateSaleItem, clearSaleItems } = saleSlice.actions;

export const saleReducer = saleSlice.reducer;

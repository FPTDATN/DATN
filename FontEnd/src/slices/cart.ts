import { ProductType } from "@/types/Product"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify'

type CartProps = {
    cartItems: any[]
}

const initialState: CartProps = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductType>) => {
            const newProduct = action.payload;

            const existingProduct = state.cartItems.findIndex((item) => item._id === newProduct._id);

            if (existingProduct === -1) {
                state.cartItems.push(newProduct);
            } else {
                state.cartItems[existingProduct].quantity++;

                toast.success(`Đã thêm ${newProduct.name} vào giỏ hàng`, {
                    position: 'bottom-right'
                });
            }
        },
        increase: (state, action: PayloadAction<ProductType>) => {
            const currentProduct = state.cartItems.find((item) => item._id === action.payload);
            currentProduct.quantity++;
        },
        decrease: (state, action: PayloadAction<ProductType>) => {
            const currentProduct = state.cartItems.find((item) => item._id === action.payload);
            currentProduct.quantity--;

            if (currentProduct.quantity < 1) {
                state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
                currentProduct.quantity = 1;

                toast.info(`Đã xóa khỏi giỏ hàng`, {
                    position: 'bottom-right'
                })
            }
        },
        clear: (state, _action: PayloadAction<ProductType>) => {
            state.cartItems = []
        }
    }
})

export const {
    addToCart, increase, decrease, clear
} = cartSlice.actions

export const cartReducer = cartSlice.reducer;
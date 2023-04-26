import { createSlice } from "@reduxjs/toolkit";
import { IProductItem } from "../../ts/interfaces/products";

interface IProductsState {
    products: IProductItem[]
}

const initialState: IProductsState = {
    products: []
};

const products = createSlice({
    name: "products",
    initialState,
    reducers: {
        SET_PRODUCTS: (state, action:{payload: IProductItem[]}) => {
            state.products = action.payload;
        }
    },
});

export const { SET_PRODUCTS } = products.actions;
export default products.reducer;
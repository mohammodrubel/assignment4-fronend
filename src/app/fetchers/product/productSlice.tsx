import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { product } from "../../../types/globalTypes";

const initialState: { cartItem: product[] } = {
    cartItem:
        typeof window !== "undefined" && localStorage.getItem("cartItem")
            ? JSON.parse(localStorage.getItem("cartItem") as string)
            : [],
};

export const ProductSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.cartItem.find(
                (item: product) => item._id === action.payload._id
            );

            if (existingProduct) {
                if (action.payload.inStock === false || existingProduct.orderQuantity >= action.payload.quantity) {
                    toast.error("Sorry, the item is out of stock.");
                } else {
                    existingProduct.orderQuantity += 1;
                    localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
                    toast.success("Added to cart");
                }
            } else {
                if (action.payload.inStock === false || action.payload.quantity === 0) {
                    toast.error("Sorry, the item is out of stock.");
                } else {
                    const newProduct = { ...action.payload, orderQuantity: 1 };
                    state.cartItem.push(newProduct);
                    localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
                    toast.success("Added to cart");
                }
            }
        },
    },
});

export const { addToCart } = ProductSlice.actions;
export default ProductSlice.reducer;

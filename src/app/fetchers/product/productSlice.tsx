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
                (item) => item._id === action.payload._id
            );
            if (existingProduct) {
                if (existingProduct.quantity === 0) {
                    toast.error("Sorry, the item is out of stock.");
                } else if (existingProduct.quantity <= existingProduct.orderQuantity) {
                    toast.error("Sorry, the item is out of stock.");
                } else {
                    existingProduct.orderQuantity += 1;
                    localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
                    toast.success("Added to cart");
                }
            } else {
                if (action.payload.quantity === 0) {
                    toast.error("Sorry, the item is out of stock.");
                } else {
                    const newProduct = { ...action.payload, orderQuantity: 1 };
                    state.cartItem.push(newProduct);
                    localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
                    toast.success("Added to cart");
                }
            }
        },

        incrementQuantity: (state, action) => {
            const existingProduct = state.cartItem.find(item => item._id === action.payload);
            if (existingProduct) {
                existingProduct.orderQuantity += 1; 
                toast.success("Increased quantity");
                localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
            }
        },
        decrementQuantity: (state, action) => {
            const existingProduct = state.cartItem.find(item => item._id === action.payload);
            if (existingProduct) {
                if (existingProduct.orderQuantity > 1) {
                    existingProduct.orderQuantity -= 1;
                    toast.warning("Decrementing quantity");
                } else {
                    state.cartItem = state.cartItem.filter(item => item._id !== action.payload);
                    toast.error("Removed from cart");
                }
                localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
            }
        },

        removeProduct:(state,action)=>{
            const existingProduct = state.cartItem.find((item)=> item._id === action.payload)
            if(existingProduct){
                state.cartItem = state.cartItem.filter(item => item._id !== action.payload); 
                localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
                toast.warning(`${existingProduct.name} has been removed from your cart`);
            }
        }

    },
});

export const { addToCart ,removeProduct,incrementQuantity,decrementQuantity} = ProductSlice.actions;
export default ProductSlice.reducer;

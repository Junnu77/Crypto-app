import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartItems:[],
    },
    reducers:{
        add: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
              existingItem.qty += 1;
            } else {
              state.cartItems.push({ ...action.payload, qty: 1 });
            }
          },
          remove: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload);
            if (existingItem) {
              if (existingItem.qty > 1) {
                existingItem.qty -= 1;
              } else {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
              }
            }
          },
    },
})


export const {add,remove} = cartSlice.actions;
export default cartSlice.reducer
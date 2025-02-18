import { configureStore } from "@reduxjs/toolkit";
import coins from './coins/coinSlice'
import auth from './auth/authSlice'
import cart from './cart/cartSlice'
import theme from './theme/themeSlice'

const store = configureStore({
    reducer:{coins,auth, cart, theme},
})

export default store;
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  authReducer from '../features/auth/authSlice'
import  adminReducer from '../features/adminAnalytics/AdminSlice'
import  productReducer from '../features/products/productSlice'
import  ordersReducer from '../features/orders/orderSlice'
import  sellerReducer from '../features/seller/sellerSlice'
import  cartReducer from '../features/cart/cartSlice'
const reducers = combineReducers({
    auth :authReducer,
    admin :adminReducer,
    product : productReducer,
    order : ordersReducer , 
    seller : sellerReducer,
    cart :cartReducer
})

export const store = configureStore({
    reducer :reducers
})

export default store
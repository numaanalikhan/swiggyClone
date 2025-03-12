import { configureStore } from "@reduxjs/toolkit";
import toogleSlice from "../utils/toogleSlice";
import cartSlice from "./cartSlice";
import filterSlice  from "./filterSlice";
import signInSlice from "./signInSlice"

const store = configureStore({
    reducer:{
        toogleSlice : toogleSlice,
        cartSlice:cartSlice,
        filterSlice:filterSlice,
        signInSlice:signInSlice
    }
})

export default store;

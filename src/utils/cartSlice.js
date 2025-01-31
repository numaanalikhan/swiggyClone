import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"CartSlice",
    initialState:{
        cartData:JSON.parse(localStorage.getItem("cart")) || [],
        restInfo:JSON.parse(localStorage.getItem("restInfo")) || []
    },
    reducers:{
        addToCart:(state,actions)=>{
            console.log(state.cartData)
            let {info} = actions.payload
            console.log(actions.payload)
            state.cartData = [...state.cartData , info]

             localStorage.setItem("cart",JSON.stringify(state.cartData));
            //   localStorage.setItem("restInfo",JSON.stringify(restInfo));
            // console.log(JSON.stringify(state.cartData))
        },
        clearCart:(state,actions)=>{
            
        },
        remFromCart:(state,actions)=>{

        }
    }
})

export const {addToCart,clearCart,remFromCart} = cartSlice.actions
export default cartSlice.reducer
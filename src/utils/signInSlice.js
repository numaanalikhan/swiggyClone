import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({

    name:"signInSlice",

    initialState:{
        userData: JSON.parse(localStorage.getItem("userData"))
        
    },

    reducers:{
         addUser : (state,actions)=>{
            state.userData = actions.payload
            localStorage.setItem("userData",JSON.stringify(state.userData))
        },

        removeUser: (state)=>{
            localStorage.removeItem("userData"),
            state.userData=""
        }

    }
})

export const {addUser,removeUser} = signInSlice.actions
export default signInSlice.reducer

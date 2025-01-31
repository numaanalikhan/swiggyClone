import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name:"toogleSlice",
    initialState:{
      searchBarToogle:false,
    },
    reducers:{
      toggleSearchBarAction:(state,actions)=>{
        state.searchBarToogle = !state.searchBarToogle
      }
    }
})

export const {toggleSearchBarAction} = toogleSlice.actions;
export default toogleSlice.reducer;
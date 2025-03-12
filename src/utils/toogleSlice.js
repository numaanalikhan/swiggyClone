import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name:"toogleSlice",
    initialState:{
      searchBarToogle:false,
      loginToogle:false,
      isDiffRestToogle:false,
    },
    reducers:{
      toggleSearchBarAction:(state)=>{
        state.searchBarToogle = !state.searchBarToogle
      },
      loginToogleAction:(state)=>{
        state.loginToogle = !state.loginToogle
      },
      setIsDiffRestAction:(state)=>{
        state.isDiffRestToogle = !state.isDiffRestToogle
      }
    }
})

export const {toggleSearchBarAction,loginToogleAction,setIsDiffRestAction} = toogleSlice.actions;
export default toogleSlice.reducer;
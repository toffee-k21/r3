import { createSlice } from '@reduxjs/toolkit'

export const itemSlice = createSlice({
    name: 'items',
    initialState: {
        itemList:[],
    },
    reducers:{
addItem : (state,action)=>{
    state.itemList = action.payload;
}
    }
})

export const {addItem} = itemSlice.actions;

export default itemSlice.reducer;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface commonDataProps{
    searchByGenre:number|null;
    searchByName:boolean;
    borrow:number|null;
}

const initialState : commonDataProps={
    searchByGenre:null,
    searchByName:false,
    borrow:null
}

const commonDataSlice=createSlice({
    name:'commonData',
    initialState,
    reducers:{
        setNewGenre:(state,action:PayloadAction<number>)=>{
            if(action.payload){
                state.searchByGenre=action.payload;
            }
        },
        setNewMovieName:(state,action:PayloadAction<boolean>)=>{
            if(action.payload){
                state.searchByName=action.payload;
            }
        },
        setBorrow:(state,action:PayloadAction<number>)=>{
            console.log(action.payload)
            if(action.payload){
                state.borrow=action.payload
            }
        }

    }
})

export default commonDataSlice.reducer;
export const {setNewGenre,setNewMovieName,setBorrow}=commonDataSlice.actions;
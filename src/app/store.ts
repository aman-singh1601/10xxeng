import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '@/features/MovieList'
import commonDataReducer from "@/features/commonData";

const store=configureStore({
    reducer:{
        movie:movieReducer,
        commonData:commonDataReducer
    }
})
export default store;

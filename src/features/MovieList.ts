import {PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Root {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

export interface Result {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface initialStateProps {
  movies: Root | null
}

export const initialState: initialStateProps = {
  movies: null
}

const MovieSlice=createSlice({
    name:"movieList",
    initialState,
    reducers:{
        setNewMovies:(state,action:PayloadAction<Root>)=>{
            if(action.payload)
              state.movies=action?.payload
        }
    }
})

export default MovieSlice.reducer;
export const {setNewMovies}=MovieSlice.actions;
import { initialStateProps } from "@/Reducer";
import React, { ReactNode, createContext, useContext, useReducer } from "react";

//this is the data layer
export const StateContext = createContext<initialStateProps|null>(null);

//build a provider
export const StateProvider = ({ reducer, initialState, children }:{
    reducer:any,
    initialState:initialStateProps,
    children:ReactNode
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);

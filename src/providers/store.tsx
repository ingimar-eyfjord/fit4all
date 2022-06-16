import React, { createContext, useReducer } from "react";

const initialState:any = {};
export const GlobalState = createContext(initialState);
export const StoreProvider = ({ children }:any) => {
  const Reducer = (state:any, action:any) => {
    const name:any = Object.keys(action);
    const values:any = Object.values(action);
    return { ...state, [name]: values[0] };
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <GlobalState.Provider value={{state, dispatch}}>{children}</GlobalState.Provider>;
};

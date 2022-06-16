import { createContext, useReducer } from "react";

let GlobalState:any;
const StoreProvider = ({ children }:any) => {
  let { Provider } = (GlobalState = createContext(GlobalState));  
  const Reducer = (state:any, action:any) => {
    const name:any = Object.keys(action);
    const values:any = Object.values(action);
    return { ...state, [name]: values[0] };
  };
  const [state, dispatch] = useReducer(Reducer, Provider);
  return <GlobalState.Provider value={[state, dispatch]}>{children}</GlobalState.Provider>;
};
export { GlobalState, StoreProvider } 
import { createContext, useReducer } from "react";

let initialState:any;
let GlobalState = createContext(initialState);
const StoreProvider = ({ children }:any) => {
  let { Provider } = GlobalState;  
  const Reducer = (state:any, action:any) => {
    const name:any = Object.keys(action);
    const values:any = Object.values(action);
    return { ...state, [name]: values[0] };
  };
  const [state, dispatch] = useReducer(Reducer, Provider);
  return <Provider value={[state, dispatch]}>{children}</Provider>;
};
export { GlobalState, StoreProvider } 
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { Action } from "../types/appTypes";
import { Type } from "../enum/enum";

interface InitialStateProp {
  profiles: any;
  appointments: any;
  patients: any;
}

const initialState = {
  profiles: [],
  appointments: [],
  patients: [],
};

interface AppContext {
  state: InitialStateProp;
  dispatch: Dispatch<Action>;
}
const appContext = createContext<AppContext | undefined>(undefined);

const appReducer = (
  state: InitialStateProp,
  action: Action
): InitialStateProp => {
  switch (action.type) {
    case Type.FETCH_PROFILE: {
      return {
        ...state,
        profiles: action.payload,
      };
    }
    case Type.FETCH_APPOINTMENTS: {
      return {
        ...state,
        appointments: action.payload,
      };
    }
    case Type.SET_PATIENT:
      return {
        ...state,
        patients: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <appContext.Provider value={{ state, dispatch }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};

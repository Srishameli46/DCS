import { createContext, useReducer } from "react";
import { ReactNode } from "react";
import { Action } from "../types/appTypes";
import { Type } from "../enum/enum";


interface initialLoginStateProp {
  token: string;
  isAutheticated: boolean;
}

const initialLoginState = {
  token: "",
  isAutheticated: false
};

interface AuthContextType {
  loginState: initialLoginStateProp;
  loginDispatch: React.Dispatch<Action>;
}

const AuthContextData: AuthContextType = {
  loginState: initialLoginState,
  loginDispatch: () => null
};

const loginReducer = (
  state: initialLoginStateProp,
  action: Action
): initialLoginStateProp => {
  switch (action.type) {
    case Type.LOGIN: {
      
      return {
        ...state,
        token: action.payload.token,
        isAutheticated: true,
      };
    }

    case Type.LOGOUT: {
      return {
        ...state,
        token:"",
        isAutheticated: false,
      };
    }

    default:
      return state;
  }
};

export const AuthContext = createContext(AuthContextData);

export const Authprovider = ({ children }: { children: ReactNode }) => {
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  return (
    <AuthContext.Provider value={{ loginState, loginDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

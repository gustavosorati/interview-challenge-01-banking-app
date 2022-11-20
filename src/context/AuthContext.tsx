import { createContext, ReactNode, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../api/api";

interface AuthContextProps {
  login: (data: {username: string, password: string}) => Promise<void>;
  isLogged: boolean;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate()

  async function login(data: {username: string, password: string}) {
    try {
      setIsLoading(true);
      const tokenAuthorization = await api.post('/users/login', {
        ...data
      }); 

      api.defaults.headers.common['Authorization'] = `Bearer ${tokenAuthorization.data}`;
      window.localStorage.setItem('token', JSON.stringify(tokenAuthorization.data));
      
      setIsLogged(true);
    } catch(error) {
      console.log(error);
    }
  } 

  
  
  return (
    <AuthContext.Provider value={{ login, isLogged }}>
      {children}
    </AuthContext.Provider>
  )
}
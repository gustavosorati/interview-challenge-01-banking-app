import { createContext, ReactNode, useState } from "react";
import { api } from "../api/api";

interface IUser {
  username: string;
  id_account: string;
  balance: number;
  token: string
}
interface AuthContextProps {
  login: (data: {username: string, password: string}) => Promise<void>;
  isLogged: boolean;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [user, setUser] = useState<IUser | null>();
  const [isLogged, setIsLogged] = useState(false);

  async function login(data: {username: string, password: string}) {
    const response = await api.post('/users/login', {
      ...data
    }); 

    if(!response.data.token) throw new Error('Password or xxx')
    
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    window.localStorage.setItem('token', JSON.stringify(response.data.token));
  } 
  

  
  
  return (
    <AuthContext.Provider value={{ login, isLogged }}>
      {children}
    </AuthContext.Provider>
  )
}
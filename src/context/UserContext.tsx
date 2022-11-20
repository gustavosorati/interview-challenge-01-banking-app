import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

interface User {
  username: string;
  id_account: string;
  balance: number;
  token: string
}

export interface ITransactions {
  created_at: string;
  id: string;
  id_credited_account: string;
  id_debited_account: string;
  value: number;
}

interface IRequestTransactions {
  credit: ITransactions[]
  debit: ITransactions[]
}

interface UserContextProps {
  user: User; 
  transactions: ITransactions[];
  logout: () => void;
  getUser: () => void;
  getTransactions: () => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function getUser() {
    const tokenExist = window.localStorage.getItem('token');
    if(!tokenExist) throw new Error("token not exists")
    const token: string = JSON.parse(tokenExist);

    if(token) {
      const userResponse = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUser({
        username: userResponse.data.user.username,
        id_account: userResponse.data.user.id_account,
        balance: userResponse.data.user.account.balance,
        token: token
      });

    } else {
      navigate('/signin')
    }
  } 

  async function getTransactions() {
    const tokenExist = window.localStorage.getItem('token');
    if(!tokenExist) throw new Error("Token not exists")
    const token: string = JSON.parse(tokenExist);


    const response = await api.get<IRequestTransactions>("/users/transactions", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setTransactions(response.data.credit.concat(response.data.debit));
  }   
  

  async function logout(){
    window.localStorage.setItem('token', '');
    setUser({} as User);
    navigate('/signin')
  }

  return (
    <UserContext.Provider value={{ getUser, getTransactions, logout, user, transactions }}>
      {children}
    </UserContext.Provider>
  )
}
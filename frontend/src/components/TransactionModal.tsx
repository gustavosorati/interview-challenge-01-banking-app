import { CurrencyDollar, User, X } from "phosphor-react";
import { api } from "../api/api";
import { Button } from "./Button";
import { Input } from "./Input";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import { HtmlHTMLAttributes, ReactElement, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import 'react-toastify/dist/ReactToastify.css';

interface TransactionModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  stateModal: (state:boolean) => void;
}

type FormData = {
  userRef: string;
  amount: number;
}

const schema = yup.object({
  userRef: yup.string().required(),
  amount: yup.number().required()
});

export function TransactionModal({stateModal, className }: TransactionModalProps) {
  const {getTransactions, getUser,} = useContext(UserContext);
  const { register, handleSubmit, formState: {errors}, watch } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  async function createTransaction({userRef, amount}: FormData) {
    try {
      await api.post('/users/transactions', {
        username_payment: userRef,
        amount
      });

      toast.success("Transação efetuada com sucesso", {
        position: toast.POSITION.TOP_RIGHT,
      });
      
      getTransactions();
      getUser();

      
    } catch(error) {
      console.log(error)
      if(error instanceof AxiosError){
        toast.error(error.response?.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        return
      }      
    }
  }

  async function closeModal() {
    stateModal(false);
  }

  return (
    <div className={`
      fixed top-0 left-0 flex flex-col justify-center items-center w-full h-screen mt-[-80px] bg-gray-900/80
      ${className}
    `}>

      <form onSubmit={handleSubmit(createTransaction)} className="w-[488px] rounded-md bg-white flex flex-col items-center p-8" >
        <button type="button" onClick={closeModal} className="self-end mb-3">
          <X 
            size={24} 
            weight="bold"
            color="#d82020"  
          />
        </button>
        
        <h1 className="font-bold text-lg uppercase mb-11">Informe os dados para Transferência</h1>

        <Input 
          text="Usuário"
          placeholder="usuário"
          icon={<User size={24} color={"#7c7c8a"}  />}
          variant="SECONDARY"
          {...register("userRef")}
          error={errors.userRef?.message}
        />
        <Input 
          text="Valor"
          type="number" 
          placeholder="valor" 
          icon={<CurrencyDollar size={24} color={"#7c7c8a"} />} 
          variant="SECONDARY"
          {...register("amount", {valueAsNumber: false})}
          error={errors.amount?.message}
        />

        <Button 
          type="submit"
          text="Confirmar" 
          className="w-full bg-green-500 z-50"
        />
      </form>
      
      <ToastContainer autoClose={3000} />
    </div>
  )

}

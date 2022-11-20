import { Lock, User } from "phosphor-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AxiosError } from "axios";

type FormData = {
  username: string;
  password: string;
}

// schema validation with yup
const schema = yup.object({
  username: yup.string().min(3, "O usuário deve ter no mínimo 3 caracteres").required(),
  password: yup.string().required('A senha é obrigatória').matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Sua senha não atende aos padrões pré-acordados"
  )
})

export function SignIn() {
  const { register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  
  const { login } = useContext(AuthContext);

  async function handleLogin({username, password}: FormData) {
    try {
      await login({username, password});

      toast.success("Você foi logado com sucesso", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        navigate('/')
      }, 3000);
    } catch(error) {
      if(error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      
    }
  }

  return (
    <div className="flex flex-col max-w-[400px] w-full justify-center items-center h-full mt-[-84px]">
      
      <h1 className="text-purple-500 text-2xl font-bold mb-12">
        <span className="text-purple-600">Logue-se e</span> comece a usar!
      </h1>

      <form className="flex flex-col justify-center w-full"  onSubmit={handleSubmit(handleLogin)}>
        <Input 
          type="text"
          text="Usuário" 
          placeholder="usuário"
          icon={<User size={24} className="text-gray-400" weight="bold" />}
          {...register("username")}
          error={errors.username?.message}
        />

          <Input 
            type="password"
            text="Senha" 
            placeholder="Senha"
            icon={<Lock size={24} className="text-gray-400" weight="bold" />}
            {...register("password")}
            error={errors.password?.message}
          />

          <Button 
            type="submit"
            text="Confirmar"
            className="mt-4 mb-4"
          />

          <p className="self-center text-gray-200">Não possui conta? <a href="/signup" className="text-cyan-500 underline">Cadastre-se</a></p>
        </form>

      <ToastContainer autoClose={3000} />
    </div>
  )
}
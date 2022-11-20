import { Lock, User } from "phosphor-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { api } from "../api/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
}

// schema validation with yup
const schema = yup.object({
  username: yup.string().min(3, "Informe um nome de usuário com no mínimo 3 caracteres").required(),
  password: yup.string().required().matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "A senha precisa ter no mínimo 8 caracteres, uma letra maiúscula, um número e um carácter especial"
  ),
  confirmPassword: yup.string().required("Porfavor confirme o sua senha").oneOf([yup.ref("password"), null], "As senhas não são iguais.")
})

export function SignUp() {
  const { register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  async function handleCreate({username, password}: FormData) {
    try {
      await api.post("/users/create", { username, password });

      toast.success("Cadastro concluído com sucesso !", {
        position: toast.POSITION.TOP_RIGHT
      });

      setTimeout(() => {
        navigate('/signin');
      }, 6000);
    } catch(error) {
      if(error instanceof ErrorEvent) {
        toast.error(error?.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
    // try {
    //   await api.post("/users/create", { username, password });

    //   toast.success("Cadastro concluído com sucesso !", {
    //     position: toast.POSITION.TOP_RIGHT
    //   });

    //   setTimeout(() => {
    //     navigate('/signin');
    //   }, 6000);
    // } catch(error) {
    //   if(error instanceof ErrorEvent) {
    //     toast.error(error?.message, {
    //       position: toast.POSITION.TOP_RIGHT
    //     });
    //   }
    // }
  }


  return (
    <div className="flex flex-col max-w-[400px] w-full justify-center items-center h-full">
      
        <h1 className="text-purple-500 text-2xl font-bold mb-12">
          <span className="text-purple-600">Crie sua conta</span> <br/>rapido e fácil
        </h1>

        <form className="flex flex-col justify-center w-full"  onSubmit={handleSubmit(handleCreate)}>
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

          <Input 
            type="password"
            text="Confirme a Senha" 
            placeholder="Confirme a Senha"
            icon={<Lock size={24} className="text-gray-400" weight="bold" />}
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button 
            type="submit"
            text="Confirmar"
            className="mt-4 mb-4"
          />

          <p className="self-center text-gray-200">Já possui conta? <a href="/signup" className="text-cyan-500 underline">Logue-se</a></p>
        </form>

      <ToastContainer />
    </div>
  )
}
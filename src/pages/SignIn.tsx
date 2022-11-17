import { Lock, User } from "phosphor-react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function SignIn() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header />
      
      <main className="flex flex-col justify-center items-center h-full">
        <div>
          <h1 className="text-purple-500 text-2xl font-bold mb-12">
            <span className="text-purple-600">Logue-se e </span>
            comece a usar
          </h1>

        <form className="flex flex-col justify-center">
          <Input 
            type="text"
            text="Usuário" 
            placeholder="usuário"
            icon={<User size={24} className="text-gray-400" weight="bold" />}
            />

          <Input 
            type="password"
            text="Senha" 
            placeholder="Senha"
            icon={<Lock size={24} className="text-gray-400" weight="bold" />}
          />

          <Button 
            text="Confirmar"
          />

          <p className="self-center text-gray-200">Não possui conta? <a href="/signup" className="text-cyan-500 underline">Cadastre-se</a></p>
        </form>

        </div>
      </main>
    </div>
  )
}
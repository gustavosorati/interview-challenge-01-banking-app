import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { Button } from "./Button";

interface BalanceProps {
  newTransaction: () => void;
  value: number;
}

export function Balance({newTransaction, value} : BalanceProps) {
  const [isVisible, setIsVisible] = useState(false)

  function handleClick() {
    newTransaction();
  }


  return (
    <div className="
      flex items-center gap-4 justify-between bg-gray-800 max-w-[400px] w-full py-2 px-4 rounded-md mt-8 mb-16
    ">
      <div className="flex gap-2  text-gray-100">
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <Eye size={24} weight={"bold"}  /> : <EyeSlash size={24} weight={"bold"}  />}
        </button>
          {isVisible ? (
            <p>
              <span className="font-bold">Saldo:</span> {' '} 
              <span>
                {Intl.NumberFormat('pt-BR', {
                  style: "currency",
                  currency: "BRL"
                }).format(value)}
              </span>
            </p>
          ) : ( 
            <p>
              <span className="font-bold">Saldo:</span> {' '}  
              <span className="blur-md">
                {Intl.NumberFormat('pt-BR', {
                  style: "currency",
                  currency: "BRL"
                }).format(0)}
                {' '} 
              </span>
            </p>
          )}
      </div>

      <span />

      <Button text="Nova Transferência" onClick={handleClick} className="mb-0 mt-0 font-normal" />
    </div>
  )
}
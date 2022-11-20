import { Eye } from "phosphor-react";
import { Button } from "./Button";

interface BalanceProps {
  newTransaction: () => void;
  value: number;
}

export function Balance({newTransaction, value} : BalanceProps) {

  function handleClick() {
    // event?.preventDefault();
    console.log('1')
    newTransaction();
  }


  return (
    <div className="
      flex items-center justify-center gap-4 bg-gray-800 max-w-[400px] w-full py-2 px-4 rounded-md mt-8 mb-16
    ">
      <div className="flex gap-2 text-gray-100">
        <Eye size={24} weight={"bold"} />
        <p>Saldo: 
          <span>
            {Intl.NumberFormat('pt-BR', {
              style: "currency",
              currency: "BRL"
            }).format(value)}
          </span>
        </p>
      </div>

      <span />

      <Button text="Nova Transferência" onClick={handleClick} className="mb-0 mt-0 font-normal" />
    </div>
  )
}
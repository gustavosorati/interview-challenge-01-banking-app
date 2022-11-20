import { MagnifyingGlass } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { Balance } from "../components/Balance";
import { TransactionModal } from "../components/TransactionModal";
import { ITransactions, UserContext } from "../context/UserContext";

type options = 'all' | "cash_in" | "cash_out";


export function Dashboard() {
  const {user, getUser, getTransactions, transactions} = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [option, setOption] = useState<options>("all")
  const [filteredTransactions, setFilteredTransactions] = useState<ITransactions[]>([]);


  function handleChangeTransactions(type: options) {
    setOption(type)
    
    if(type === "all") {
      console.log('entrou cash_out')
      setFilteredTransactions(transactions.map(transaction => transaction))
    }

    if(type === "cash_out") {
      console.log('entrou cash_out')
      setFilteredTransactions(transactions.filter(transaction => {
        if(transaction.id_credited_account === user.id_account) {
          return transaction
        }
      }))
    }

    if(type === "cash_in") {
      console.log('entrou cash_in')
      setFilteredTransactions(transactions.filter(transaction => {
        if(transaction.id_debited_account === user.id_account) {
          return transaction
        }
      }))
    }
  }

  function newTransaction() {
    setModal(!modal)
  }
  
  useEffect(() => {
    getUser()
    getTransactions()
  }, []);
  

  if(!user.username) {
    return (
      <p className="text-gray-100 font-bold text-2xl ">Logue-se para ter acesso <br />a todas funções do sistema</p>
    )
  }

  return (
    <>
      <Balance value={user.balance} newTransaction={newTransaction} />

      <div className="flex justify-end w-full mb-4">
        {/* Filter */}
        {/* <div className="self-start flex items-center px-2 bg-gray-800 max-w-[250px] w-full focus-within:ring-2 focus-within:ring-purple-500 rounded ">
          <MagnifyingGlass size={24} className="text-gray-500" weight="bold"/>
          <input type="text" className="text-gray-400 py-2 p-4 bg-transparent  text-sm  w-full outline-none" />
        </div> */}

        {/* Options */}
        <fieldset className="flex gap-5 text-gray-500">
          <div className="flex gap-4 items-center text-gray-500">

            <div className="flex gap-1 items-center justify-center">
              <input id="all" className="peer/all" type="radio" name="status" checked={option === "all"} onChange={(e) => handleChangeTransactions("all")}  />
              <label htmlFor="all" className="peer-checked/all:text-sky-500">Todos</label>
            </div>

            <div className="flex gap-1 items-center justify-center">
              <input id="cash_in" className="peer/cash_in" type="radio" name="status" checked={option === "cash_in"} onChange={(e) => handleChangeTransactions("cash_in")} />
              <label htmlFor="cash_in" className="peer-checked/cash_in:text-sky-500">Entrada</label>
            </div>
            
            <div className="flex gap-1 items-center justify-center">
              <input id="cash_out" className="peer/cash_out" type="radio" name="status" checked={option === "cash_out"} onChange={(e) => handleChangeTransactions("cash_out")} />
              <label htmlFor="cash_out" className="peer-checked/cash_out:text-sky-500" >Saída</label>
            </div>
            
          </div>
        </fieldset>
      </div>


      {/* Table */}
      <div className="overflow-x-auto relative shadow-md sm:rounded-md w-full flex gap-4">
        {user ? 
          (
            // Table
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate border-spacing-x-0 border-spacing-y-2">
              <thead className="bg-purple-600/80 text-white text-center">
                <tr>
                  <th scope="col" className="py-3 px-6">Data</th>
                  <th scope="col" className="py-3 px-6">Id do usuário</th>
                  <th scope="col" className="py-3 px-6">Operação</th>
                  <th scope="col" className="py-3 px-6">Valor</th>
                </tr>
              </thead>

              <tbody className=" border-spacing-2 border">
                {option === "all" && (
                  <>
                    {transactions.map(transaction => (
                      <tr 
                        key={transaction.created_at + transaction.id}
                        className="text-center bg-gray-800 cursor-pointer hover:bg-gray-900">
                        
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(transaction.created_at).toLocaleDateString("pt-BR")}</th>
                        <td className="py-4 px-6">{transaction.id}</td>
                        <td className="py-4 px-6">{transaction.id_credited_account === user.id_account ? "Saida" : "Entrada"}</td>
                        <td className="py-4 px-6">{Intl.NumberFormat('pt-BR', {
                          style: "currency",
                          currency: "BRL"
                        }).format(transaction.value)}</td>
                      </tr>
                    ))}
                  </>
                )}

                {option !== "all" && (
                  <>
                    {filteredTransactions.map(transaction => (
                      <tr 
                        key={transaction.created_at + transaction.id}
                        className="text-center bg-gray-800 cursor-pointer hover:bg-gray-900">
                        
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(transaction.created_at).toLocaleDateString("pt-BR")}</th>
                        <td className="py-4 px-6">{transaction.id}</td>
                        <td className="py-4 px-6">{transaction.id_credited_account === user.id_account ? "Saida" : "Entrada"}</td>
                        <td className="py-4 px-6">{Intl.NumberFormat('pt-BR', {
                          style: "currency",
                          currency: "BRL"
                        }).format(transaction.value)}</td>
                      </tr>
                    ))}
                  </>
                )}

              </tbody>
            </table>
          ) : <p>teste</p>
        }
      </div>

    {modal && <TransactionModal stateModal={setModal} />}
  </>
  )
}

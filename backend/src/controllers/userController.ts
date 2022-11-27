import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export class UserController {
  async getUser(request: Request, response: Response) {
    const id = request.id_user;
  
    try {
      const user = await prisma.users.findUnique({
        where: {
          id,
        },
    
        select: {
          username: true,
          id_account: true,
          password: false,
          
          account: {
            select: {
              balance: true
            }
          }
        }   
      });
  
      if(!user) throw new Error("User not found");
  
      return response.status(200).json({user});
    } catch (error) {
      console.log(error);
      if(error instanceof Error){
        return response.status(400).json({message: error.message});
      }
    }  
  }

  async getTransactions(request: Request, response: Response) {
    const id = request.id_user;
    
    try {
      const user = await prisma.users.findUnique({
        where: {
          id,
        },
    
        select: {
          id_account: true,
          username: false,
          password: false,
        }   
      });
      if(!user) throw new Error("User don't exists");

      const cash_in = await prisma.transactions.findMany({
        where: {
          id_debited_account: user.id_account
        }
      });

      const cash_out = await prisma.transactions.findMany({
        where: {
          id_credited_account: user.id_account
        }
      });
 
      return response.status(200).json({
        credit: cash_out,
        debit: cash_in
      });
    } catch (error) {
      console.log(error);
      if(error instanceof Error){
        return response.status(400).json({message: error.message});
      }
    }
    
  }

  async createTransaction(request: Request, response: Response) {
    const {username_payment, amount} = request.body;

    const id = request.id_user;
    
    try {
      const user = await prisma.users.findUnique({
        where: {
          id,
        },
    
        select: {
          username: true,
          password: false,
    
          account: {
            select: {
              id: true,
              balance: true
            }
          }
        }   
      });

      if(!user) throw new Error("User not found");

      if(user.account.balance < amount) throw new Error("Payment is not possible, you don't have enough balance");
    
      const userReferExist = await prisma.users.findUnique({
        where: {
          username: username_payment
        },
        select: {
          username: true,
          password: false,
    
          account: {
            select: {
              id: true,
              balance: true
            }
          }
        }   
      });
      
      if(!userReferExist) throw new Error("Payment is not possible, user not found ");
    
      if(user.username === username_payment) throw new Error("You cannot pay yourself");
        
      await prisma.transactions.create({
        data: {
          id_credited_account: user.account.id,
          id_debited_account: userReferExist.account.id,
          value: amount,
        },
      });
    
      await prisma.accounts.update({
        where: {
          id: user.account.id
        },
        data: {
          balance: user.account.balance - amount
        }
      });
    
      await prisma.accounts.update({
        where: {
          id: userReferExist.account.id,
        },
        data: {
           balance: userReferExist.account.balance + amount
        }
      });
    
      return response.status(200).json("Transaction created")
    } catch(error) {
        console.log(error);
        if(error instanceof Error){
          return response.status(400).json({message: error.message});
        }
    }
  }
}
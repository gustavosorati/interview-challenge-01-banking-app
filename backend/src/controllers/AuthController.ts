import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import jwt from 'jsonwebtoken';

interface IRequest {
  username: string;
  password: string;
}

// schema regex validation
const validation = {
  username: new RegExp("^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z]+(?<![_.])$"), 
  password: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
}

export class AuthController {
  async login(request: Request, response: Response) {
    const {username, password} = request.body as IRequest;
    
    try {
      const user = await prisma.users.findUnique({
        where: {
          username
        }
      });
    
      if(!user) throw new Error("User don't exist");
    
      const matchedPassword = await compare(password, user.password);
    
      if(!matchedPassword) throw new Error("Username or Password Invalid");
    
      const token = jwt.sign(
        { username: user.username, id_account: user.id_account }, 
        process.env.TOKEN_HASH_VALIDATION!, 
        {
          subject: user.id,
          expiresIn: '1d', // 24 hours
        }
      );
    
      return response.status(200).json({token});
    } catch (error) {
      console.log(error)

      if(error instanceof Error){
        return response.status(400).json({message: error.message})
      }

      return response.status(400).json({message: error})
    }
  }
  
  async create(request: Request, response: Response) {
    const {username, password} = request.body as IRequest;
  
    const usernameIsValid = validation.username.test(username);
    const passwordIsValid = validation.password.test(password);

    if(!usernameIsValid && !passwordIsValid) throw new Error('Username or password is not valid');

    try {
      const userExist = await prisma.users.findFirst({
        where: {
          username: {
            equals: username,
            mode: 'insensitive'
          }
        }
      });

      if(userExist) throw new Error("User already exists on database");

      const hashPassword = await hash(password, 10);

      await prisma.users.create({
        data: {
          username,
          password: hashPassword,
          account: {
            create: {
              balance: 100
            }
          }
        }
      });

      return response.status(200).json("User created with success");
    } catch (error) {
      console.log(error);
      if(error instanceof Error){
        return response.status(400).json({message: error.message});
      }
    }
  }
}
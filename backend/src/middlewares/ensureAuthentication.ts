import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) throw new Error("Token missing");

  const [, token] = authHeader.split(" ");
  
  try {
    const decoded = verify(token, "beac5f8171fcde5e2ec734cc5d25d03e7362e8de")
    
    if(!decoded) throw new Error("Token is not valid!");

    request.id_user = decoded.sub as string;

    return next();
  } catch (error) {
    console.log(error);
    if(error instanceof Error){
      return response.status(400).json({message: error.message});
    }
  }
}
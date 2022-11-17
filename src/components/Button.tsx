import { ButtonHTMLAttributes, Component, InputHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'PRIMARY' | 'SECONDARY';
}

export function Button({text, variant = "PRIMARY", ...rest}: ButtonProps) {
  return (
    <button 
      className="flex flex-col items-center w-[400px] py-3 px-4 rounded-md bg-purple-500 text-white font-semibold my-8"
    >
      {text}
    </button>
  )
}
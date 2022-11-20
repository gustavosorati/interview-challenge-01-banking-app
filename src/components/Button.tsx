import { ButtonHTMLAttributes, Component, InputHTMLAttributes, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'PRIMARY' | 'SECONDARY';
}

export function Button({text, variant = "PRIMARY", className, ...props}: ButtonProps) {
  return (
    <button 
      className={`
        flex flex-col items-center py-3 px-4 rounded-md  text-white font-semibold bg-purple-500 hover:bg-purple-600
        ${variant === "SECONDARY" && 'bg-green-500 hover:bg-green-600'}
        ${className} 
      `}
      {...props}
    >
      {text}
    </button>
  )
}
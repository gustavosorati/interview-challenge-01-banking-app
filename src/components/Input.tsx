import { Component, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  variant?: 'PRIMARY' | 'SECONDARY';
  icon?: ReactNode | string;
}

export function Input({text, variant = "PRIMARY", icon, placeholder, ...rest}: InputProps) {
  return (
    <label className="flex flex-col mb-4">
      
      <span className="block text-gray-100 mb-3 font-bold">{text}</span>
      
      <div className="flex gap-4 items-center w-[400px] py-3 px-4 rounded-md bg-gray-800 border-gray-800 border-2 focus-within:border-purple-400">
        {icon}
        <input 
          className="bg-transparent placeholder:text-gray-400 outline-none text-gray-400"
          placeholder={placeholder} 
        />
      </div>
    </label>
  )
}
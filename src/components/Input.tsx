import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  variant?: 'PRIMARY' | 'SECONDARY';
  icon?: ReactNode | string;
  error?: string;
}

export const  Input = forwardRef<HTMLInputElement, InputProps>((
  {text, variant = "PRIMARY", icon, error, placeholder, type, ...props },
  ref
) => {

  return (
    <label className="flex flex-col mb-2 w-full">
      <span 
        className={`
          block text-gray-100 mb-4 font-bold
          ${variant === "SECONDARY" && "text-gray-900"}
      `}>{text}</span>
      
      <div className={`
        flex gap-4 items-center w-full py-3 px-4 rounded-md bg-gray-800 border-gray-800 border-2 focus-within:border-purple-400
        ${variant === "SECONDARY" && "bg-transparent"}
        ${error && "border-red-500"}
      `}>
        
        {icon}
        
        <input 
          type={type}
          className={`
            bg-transparent placeholder:text-gray-400 outline-none text-gray-400 w-full
            ${variant === "SECONDARY" && "text-gray-900"}
          `}
          placeholder={placeholder} 
          ref={ref}
          {...props}
        />
      </div>
      {error 
        ? <p className="text-red-500 text-xs my-1">{error && <span>{error}</span>}</p> 
        : <span className="text-white/0 text-xs my-1">error will be appear here</span>
      }
    </label>
  )
})
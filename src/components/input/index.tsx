import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps{
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({name, placeholder, type, register, rules, error}: InputProps){
    return(
        <div>
            <input 
                className="w-full border-2 border-zinc-400 rounded-md h-11 px-2 outline-0 bg-white"
                type={type} 
                placeholder={placeholder}
                {...register(name, rules)}
                id={name}
            />
            {error && <p className="text-red-600">{error}</p> }
        </div>
    )
}
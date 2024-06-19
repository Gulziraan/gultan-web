import React, {FC} from "react";
import cl from './Input.module.scss'

interface InputProps {
    id?: string,
    name: string
    value: string | number,
    type?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input:FC<InputProps> = (
    {
        id,
        name,
        value,
        type,
        onChange
    }) => {
    return (
        <div className={cl.inputContainer}>
            <label htmlFor={id}>{name}</label>
            <input className={cl.input} type={type} id={id} value={value} onChange={onChange}/>
        </div>
    );
};

export default Input;
import React, {FC} from "react";
import cl from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    type?: "submit" | "reset" | "button";
}

const Button:FC<ButtonProps> = (
    {children,
        onClick,
        disabled,
        style,
        type
    }) => {
    return (
        <button style={style} type={type} disabled={disabled} className={disabled ? cl.disabled : cl.button} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
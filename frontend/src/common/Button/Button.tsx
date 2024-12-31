import { ReactNode } from "react";
import "./styles.css";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({children, onClick, type, disabled}) => {
    return (
    <button onClick={onClick} type={type ? type : "button"} disabled={disabled}>
        <span>
        {children}
        </span>
    </button>);
}

export default Button;
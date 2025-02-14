import { ButtonProps } from "@/types/Button";
import "./Button.css";

export default function Button({ text, classname, onClick }: ButtonProps) {
    return (
        <button className={`${classname}`} onClick={onClick}>{text} </button>
    )
}
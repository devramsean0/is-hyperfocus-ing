import TextInputCSS from "@/styles/textInput.module.css";
import { FormEvent } from "react";

export function TextInput(props: {label?: string, placeholder?: string, nextButton?: boolean, id: string, onNext?: (ctx: FormEvent<HTMLButtonElement>) => void, type?: string, required?: boolean, onChange?: (ctx: FormEvent<HTMLInputElement>) => void, value?: string}) {
    return (
        <div className={TextInputCSS.container}>
            {props.label ? (
                <label htmlFor={props.id}>{props.label}</label>
            ) : <></>}
            <div className={TextInputCSS.inputContainer}>
                <input className={props.nextButton ? TextInputCSS.inputWithNextButton : TextInputCSS.input} placeholder={props.placeholder ? props.placeholder : ""} id={props.id} type={props.type} required={props.required} onChange={props.onChange} value={props.value}/>
                <button className={TextInputCSS.nextButton} onClick={props.onNext} hidden={props.nextButton ? false : true}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="2.5rem" viewBox="0 -960 960 960" width="2.5rem">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}
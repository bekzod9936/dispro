import React from "react"
import { IContainerProps, ILabelProps, ITextAreaProps, Label, MTextArea, Wrapper,Message } from "./style"

interface IProps {
    textarea?: ITextAreaProps,
    label?: ILabelProps,
    container?: IContainerProps,
    onChange?: any,
    value?: string | number
    title: string,
    field?: any,
    resize?:string,
    required?:boolean,
    maxLength?:number,
    message?:any,
    error?:any,
}


export const TextArea = ({textarea,error, label,message,required,maxLength,resize, value, onChange, title, container, field}: IProps) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | any>(null)
    const handleFocus = () => {
        textareaRef.current.focus()
        
    }
    return (
        <Wrapper {...container}>
            <Label {...label}   onClick={handleFocus}>{title}</Label>
            <MTextArea {...field}  maxLength={maxLength} required={required} resize={resize} value={value} onChange={onChange} ref={textareaRef} {...textarea}>
            </MTextArea>
            <Message  >
        {error ? message : null}
      </Message>
        </Wrapper>
            
    )
}

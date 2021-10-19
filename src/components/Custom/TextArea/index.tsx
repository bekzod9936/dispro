import React from "react"
import { IContainerProps, ILabelProps, ITextAreaProps, Label, MTextArea, Wrapper } from "./style"

interface IProps {
    textarea?: ITextAreaProps,
    label?: ILabelProps,
    container?: IContainerProps,
    onChange?: any,
    value?: string | number
    title: string,
    
}


export const TextArea = ({textarea, label, value, onChange, title, container}: IProps) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | any>(null)
    const handleFocus = () => {
        textareaRef.current.focus()
        
    }
    return (
        <Wrapper {...container}>
            <Label {...label} onClick={handleFocus}>{title}</Label>
            <MTextArea value={value} onChange={onChange} ref={textareaRef} {...textarea}>
                
            </MTextArea>
        </Wrapper>
            
    )
}

import { Wrapper } from "./style"

export interface IProps {
    maxWidth?: string,
    width?: string,
    margin?: string,
    disabled?: boolean,
    labelText?: string
}

export const MyDatePicker = ({labelText, ...props}: IProps) => {
    return (
        <Wrapper {...props}>
            <label>{labelText}</label>
            <input type="date"/>
        </Wrapper>
    )
}


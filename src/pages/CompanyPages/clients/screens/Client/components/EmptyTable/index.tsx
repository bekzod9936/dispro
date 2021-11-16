import React from 'react'
import { Wrapper } from './style'
interface IProps {
    image: string;
    text: string
}
export const EmptyTable = ({ image, text }: IProps) => {
    return (
        <Wrapper>
            <img src={image} alt="emptyPageImage" />
            <p>{text}</p>
        </Wrapper>
    )
}

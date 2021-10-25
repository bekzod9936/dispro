import React from 'react'
import { Wrapper } from './style'

interface IProps {
    children: React.ReactChild,
    isOpen: boolean,
    maxWidth?: string
}


export const SideBar = ({children, isOpen, ...props}: IProps) => {
    return (
        <Wrapper {...props} isOpen={isOpen}>
            {children}
        </Wrapper>
    )
}

import React from 'react'
import { Wrapper } from './style'

interface IProps {
    children: React.ReactChild,
    isOpen: boolean
}


export const SideBar = ({children, isOpen}: IProps) => {
    return (
        <Wrapper isOpen={isOpen}>
            {children}
        </Wrapper>
    )
}

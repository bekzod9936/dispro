import React from 'react'
import { Wrapper } from './style'

export const SideBar = ({children, isOpen}: any) => {
    return (
        <Wrapper isOpen={isOpen}>
            {children}
        </Wrapper>
    )
}

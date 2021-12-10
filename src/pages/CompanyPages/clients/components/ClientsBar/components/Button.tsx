import React from 'react'
import styled from 'styled-components'
import { device } from 'styles/device'

export const MButton = ({ children, ...props }: any) => {
    return (
        <Wrapper {...props}>
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.button`
    outline: none;
    border: none;
    font-size: 18px;
    color: #606EEA;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    line-height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    background-color: transparent;
    border-radius: 14px;
    padding: 14px 0;
    cursor: pointer;
    transition: background-color 200ms;
    margin-bottom: 15px;
    &:hover {
        background-color: rgba(96, 110, 234, 0.1);

    }

    @media (max-width: ${device.planshet}) {
        background-color: rgba(96, 110, 234, 0.1);
    }
`

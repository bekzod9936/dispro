import { MiniCloseIcon } from 'assets/icons/ClientsPageIcons/ClientIcons'
import React from 'react'
import styled from 'styled-components'

export const RemoveFilterBtn = (props: any) => {
    return (
        <Wrapper {...props}>
            <MiniCloseIcon />
        </Wrapper>
    )
}

const Wrapper = styled.button`
    position: absolute;
    outline: 0;
    border: 0;
    background: transparent;
    right: 5px;
    top: 9px;
    cursor: pointer;
`
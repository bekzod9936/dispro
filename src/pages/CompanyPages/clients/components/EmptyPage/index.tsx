import React from 'react'
import { ReactComponent as EmptyPageImg } from 'assets/images/clientsStar.svg'
import styled from 'styled-components'
export const EmptyPage = () => {
    return (
        <Wrapper>
            <EmptyPageImg />
            <TextContent>
                <h4>Клиенты не найдены</h4>
                <p>
                    Приглашайте к себе в компанию новых клиентов и проводите операции с помощью кассира
                </p>
            </TextContent>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`
const TextContent = styled.div`
    margin-top: 25px;
    h4 {
        font-size: 18px;
        font-weight: 500;
        line-height: 21px;
        color: #223367;
        text-align: center;
        margin-bottom: 15px;
    }
    p {
        text-align: center;
        max-width: 485px;
        width: 100%;
        color: #223367;
        font-size: 16px;
        font-weight: 400;
        
    }
`
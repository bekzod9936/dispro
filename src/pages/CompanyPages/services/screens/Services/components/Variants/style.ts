import styled from 'styled-components'

interface Props {
    isLastElem: boolean
}

export const Wrapper = styled.div`
    margin-bottom: 20px;
`

export const Item = styled.div`
    margin-bottom: ${({isLastElem}: Props) => isLastElem ? '' : '40px'};
`

export const Buttons = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`
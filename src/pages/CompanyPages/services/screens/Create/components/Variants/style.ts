import styled from 'styled-components'

interface Props {
    isLastElem: boolean
}

export const Wrapper = styled.div`
    margin-bottom: 20px;
`

export const Item = styled.div`
    margin-bottom: ${({isLastElem}: Props) => isLastElem ? '' : '35px'}
`
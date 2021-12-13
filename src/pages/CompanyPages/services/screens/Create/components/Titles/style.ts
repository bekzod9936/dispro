import styled from "styled-components";
import { ReactComponent as RemoveInputSvg } from "assets/icons/removeInput.svg"

interface Props {
    isMultiple: boolean
}

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${({isMultiple}: Props) => isMultiple ? 3 : 1}, 1fr);
    width: 100%;
    margin-bottom: 25px;
    gap: 15px;
`

//icons
export const RemoveInputIcon = styled(RemoveInputSvg)``
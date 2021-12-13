import styled from "styled-components";
import { ReactComponent as RemoveInputSvg } from "assets/icons/removeInput.svg"
import { IconButton } from "@material-ui/core";


//icons
export const RemoveInputIcon = styled(RemoveInputSvg)``

export const ButtonIcon = styled(IconButton)`
    padding: 8px;
    transform: translateY(-1px);
    margin-left: 5px;
`
export const MockIcon = styled.div`
    height: 23px;
    width: 23px;
    pointer-events: none;`
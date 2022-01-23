import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import { ReactComponent as RemoveInputSvg } from "assets/icons/removeInput.svg"

export const Field = styled.div`
    &:not(:last-child) {
        margin-bottom: 30px;
    }
    button.add {
        outline: none;
        border: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        background-color: transparent;
        color: #3492FF;
        margin-top: 12px;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        line-height: 16.41px;

    }
`

//icons
export const ButtonIcon = styled(IconButton)`
    margin-right: 5px;
`

export const RemoveInputIcon = styled(RemoveInputSvg)``

import { IconButton } from "@material-ui/core";
import styled from "styled-components";

interface Props {
    deleteButton?: boolean
}


export const Wrapper = styled.div`
    padding: 30px 0 0 35px;
`

export const Flex = styled.div`
    display: flex;
    align-items: center;
`

export const SubButton = styled.button`
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
    color: ${({deleteButton}: Props) => deleteButton ? '#FF5E68' : '#3492FF'};
    margin-top: 12px;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 16.41px;
`

export const ButtonIcon = styled(IconButton)`
    margin-right: 5px;
`


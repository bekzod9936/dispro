import styled from "styled-components";
import {ReactComponent as TrashSvg} from 'assets/icons/trash_white.svg'

interface ImageProps {
    isLoading: boolean
}


export const Wrapper = styled.div`
    width: 200px;
    height: 200px;
    cursor: pointer;
    border-radius: 14px;
    display: block;
    overflow: hidden;
    position: relative;

    img {
        display: block;
        border-radius: 14px;
        width: 200px;
        height: 200px;
    }


    &::before {
        position: absolute;
        opacity: ${({isLoading}: ImageProps) => isLoading ? '.7' : '0'};
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background: linear-gradient(0deg, rgba(34, 51, 103, 0.75), rgba(34, 51, 103, 0.75));
        transition: 200ms all;
    }

    &:hover {
        &::before {
            opacity: .7;
        }
    }`


export const TrashIconWrapper = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 200ms all;
    z-index: 10;

    &:hover {
        opacity: 1;
    }
`


export const SpinnerWrapper = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
`


//icons
export const TrashIcon = styled(TrashSvg)`
    height: 30px;
    width: 30px;
`
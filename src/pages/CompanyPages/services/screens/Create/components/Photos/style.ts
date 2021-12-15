import styled from 'styled-components'
import {ReactComponent as TrashSvg} from 'assets/icons/trash_white.svg'
interface ImageProps {
    isLoading: boolean
}

export const Header = styled.div`
    h5 {
        font-size: 16px;
        line-height: 18.75px;
        font-weight: 500;
        color: #223367;
        margin-bottom: 5px;
    }

    p {
        color: #C4C4C4;
        font-size: 14px;
        line-height: 16.41px;
        margin-bottom: 25px;
    }

    margin-bottom: 20px;
`

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: auto;
    gap: 20px;
    margin-bottom: 35px;
`

export const GridItem = styled.div`
    width: 200px;
    cursor: pointer;
    border-radius: 14px;
    display: block;
    overflow: hidden;
    position: relative;

    img {
        display: block;
        border-radius: 14px;
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
    }

    


`

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


export const Image = styled.img`
    cursor: pointer;
    display: block;
    border-radius: 14px;
    object-fit: cover;
    width: 200px;
`


//icons 
export const TrashIconBack = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.25;
    /* display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1; */

`

export const TrashIcon = styled(TrashSvg)``
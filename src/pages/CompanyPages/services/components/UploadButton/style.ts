import styled from 'styled-components' 
import {ReactComponent as PhotoSvg} from 'assets/icons/IconsInfo/photo.svg'

interface IProps {
    isLoading: boolean
}


export const Button = styled.label`
    background-color: ${({isLoading}: IProps) => isLoading ? 'rgba(199, 199, 199, 0.7)' : 'rgba(96, 110, 234, 0.1)'};
    border-radius: 14px;
    height: 50px;
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    span {
        font-size: 18px;
        font-weight: 500;
        line-height: 21.09px;
        margin-right: 10px;
        color: #606EEA
    }
`




//icons

export const PhotoIcon = styled(PhotoSvg)``
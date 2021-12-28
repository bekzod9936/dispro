import styled from "styled-components";
import { ReactComponent as MenuSvg } from 'assets/icons/FeedBack/dots.svg'
import { device } from "styles/device";

interface IProps {
    isDeleteButton?: boolean
    disabled?: boolean
}


export const MenuList = styled.div`
    padding: 15px 0;
    border-radius: 14px;
    width: 300px;
    box-shadow: 0px 1px 28px rgba(0, 0, 0, 0.12);

    @media (max-width: ${device.laptop}) {
        padding: 10px 0;
    }

`

export const MenuItem = styled.div`
    padding: 15px 0 15px 20px;
    font-size: 16px;
    line-height: 18.75px;
    color: ${({isDeleteButton}: IProps) => isDeleteButton ? "#FF5E68" : "#223367"};
    transition: 200ms all;
    cursor: ${({disabled}: IProps) => disabled ? 'not-allowed' : 'pointer'};
    background-color: ${({disabled}: IProps) => disabled ? '#c7c7c7' : ''};
  
    &:hover {
        background-color: ${({disabled}: IProps) => disabled ? '#c7c7c7' : 'rgba(96, 110, 234, 0.1)'};
    }

    @media (max-width: ${device.laptop}) {
        padding: 10px 0 10px 15px;
    }

`



//icons
export const MenuIcon = styled(MenuSvg)``

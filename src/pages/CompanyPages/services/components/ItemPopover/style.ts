import styled from "styled-components";
import { ReactComponent as DotsSvg } from 'assets/icons/FeedBack/dots.svg';

interface IProps {
    isDeleteButton?: boolean
}

export const MenuList = styled.div`
    padding: 15px 0;
    border-radius: 14px;
    width: 300px;
    box-shadow: 0px 1px 28px rgba(0, 0, 0, 0.12);

`

export const paperStyle = {
    style: {
        marginTop: 20 
    }
}

export const MenuItem = styled.div`
    padding: 15px 0 15px 20px;
    font-size: 16px;
    line-height: 18.75px;
    color: ${({isDeleteButton}: IProps) => isDeleteButton ? "#FF5E68" : "#223367"};
    transition: 200ms all;
    cursor: pointer;
  
    &:hover {
        background-color: rgba(96, 110, 234, 0.1);

    }

`

//icons
export const MenuIcon = styled(DotsSvg)`
    circle {
        fill: #fff;
    }

`
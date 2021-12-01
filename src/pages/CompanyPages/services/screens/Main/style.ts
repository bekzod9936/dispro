import styled from "styled-components";
import { ReactComponent as CreateSvg } from 'assets/icons/services/create.svg';
import { ReactComponent as ArrowDownSvg } from 'assets/icons/services/createArrowDown.svg';
import { ReactComponent as SearchSvg } from 'assets/icons/searchblue.svg';

export const Wrapper = styled.div`
    padding: 30px 0 0 35px;
`
export const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 35px;

    p {
        font-size: 14px;
        line-height: 16.41px;
        color: #8F8F8F;
        margin-left: 20px;
        display: flex;
        align-items: center;
        font-weight: 500;

        b {
            margin-right: 20px;
            font-size: 22px;
        }
    }
`

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`

export const PopoverList = styled.div`
    border-radius: 14px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    width: 233px;
    padding: 15px 0;
`
export const PopoverItem = styled.div`
    cursor: pointer;
    transition: 200ms all;
    padding: 15px 25px;
    font-size: 16px;
    line-height: 18.75px;
    color: #223367;

    &:hover {
        background-color: rgba(96, 110, 234, 0.1);
    }
`



//icons
export const CreateIcon = styled(CreateSvg)``

export const ArrowDownIcon = styled(ArrowDownSvg)`
    margin-left: 50px;
`

export const SearchIcon = styled(SearchSvg)`
    margin-left: 34px;
`
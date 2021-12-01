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




//icons
export const CreateIcon = styled(CreateSvg)``

export const ArrowDownIcon = styled(ArrowDownSvg)`
    margin-left: 50px;
`

export const SearchIcon = styled(SearchSvg)`
    margin-left: 34px;
`
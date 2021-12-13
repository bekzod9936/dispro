import styled from "styled-components";

import { ReactComponent as SearchSvg } from 'assets/icons/searchblue.svg';


export const Wrapper = styled.div`
    
`

export const Nav = styled.div`
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


//icons


export const SearchIcon = styled(SearchSvg)`
    margin-left: 34px;
`
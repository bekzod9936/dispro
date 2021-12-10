import styled from "styled-components";

import { ReactComponent as SearchSvg } from 'assets/icons/searchblue.svg';

export const Wrapper = styled.div`
    padding: 30px 0 0 35px;
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


export const SearchIcon = styled(SearchSvg)`
    margin-left: 34px;
`
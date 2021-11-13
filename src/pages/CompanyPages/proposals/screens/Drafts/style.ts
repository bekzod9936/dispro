import styled from "styled-components"
import { device } from "styles/device"

export const Nav = styled.div`
    display: flex;
    margin-bottom: 115px;
    align-self: flex-start;
    width: 100%;
    padding-right: 15px;
    input {
        max-width: 500px;
        width: 100%;
    };
    @media (max-width: ${device.planshet}) {
        flex-direction: column;
    }
`

export const Wrapper = styled.div`
    margin-left: 35px;
    height: 100%;
    
    @media (max-width: ${device.planshet}) {
        margin-left: 0;
    }
    /* overflow: auto;
    ::-webkit-scrollbar {
    width: 7px;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #606eea;
        border-radius: 14px 0px 0px 14px;
    } */
`

export const Container = styled.div`
    height: 100%;
    overflow: auto;
    padding-bottom: 80px;
    ::-webkit-scrollbar {
    width: 7px;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #606eea;
        border-radius: 14px 0px 0px 14px;
    }
`

export const SearchIconWrapper = styled.div`
    margin: 0 15px 0 30px;
    @media (max-width: ${device.mobile}) {
        margin-left: 15px;
        margin-right: 0;
        height: 16px;
        width: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            height: 100%;
            width: 100%;
        }
    }
`

export const SearchBar = styled.div`
    display: flex;
    margin-bottom: 20px;
    @media (max-width: ${device.mobile}) {
        margin-bottom: 13px;
        input {
            padding: 0 8px 0 0 !important;
        }
    }
`
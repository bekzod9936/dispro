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
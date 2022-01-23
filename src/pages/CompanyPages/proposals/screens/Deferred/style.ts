import styled from "styled-components";
import { device } from "styles/device";

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
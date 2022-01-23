import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    width: 100%;
    margin-left: 50px;
    overflow: auto;
    height: calc(100vh - 41%);
    padding-right: 30px;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #606eea;
        border-radius: 14px 0px 0px 14px;
    }

    @media (max-width: ${device.laptop}) {
        margin-left: 30px;
        padding-right: 20px;
    }

    @media (max-height: 820px) and (min-width: ${device.laptop}) {
        height: calc(100vh - 51%);
    }

    @media (max-width: ${device.laptop}) and (min-height: 700px) {
        height: calc(100vh - 35%);
    }
`

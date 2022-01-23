import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    margin-right: 100px;
    margin-bottom: 35px;
    display: flex;
    align-items: start;
    @media (max-width: ${device.planshet}) {
        margin-right: 15px;
        margin-bottom: 20px;
        max-width: 166px;
        width: 100%;
    }
`

export const Content = styled.div`
    margin-left: 15px;
    h4 {
        color: #223367;
        line-height: 18px;
        font-size: 18px;
        margin-bottom: 5px;
    }
    p {
        font-size: 28px;
        line-height: 32.81px;
        color: #606EEA;
        font-weight: 700;
    }
    @media (max-width: ${device.planshet}) {
        margin-left: 10px;
        h4 {
            font-size: 16px;
            line-height: 18.75px;
            font-weight: 500;
            margin-bottom: 3px;
        }
        p {
            font-size: 19px;
            line-height: 22.27px;
        }
    }
`
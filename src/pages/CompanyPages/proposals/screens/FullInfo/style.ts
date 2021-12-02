import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    padding-right: 45px;
    @media (max-width: ${device.planshet}) {
        padding-right: 0;
    }
`

export const Container = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    padding: 50px 0 50px 80px;
    overflow: auto;
    
    min-height: 70vh;
    @media (max-width: ${device.planshet}) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2500;
        padding: 25px 40px 0 40px;
    }
`

export const InlineContainer = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: ${device.planshet}) {
        align-items: center;
    }
`

export const Right = styled.div`
    width: 45%;
    .imageBlock {
        max-width: 345px; 
        width: 100%;
        height: 175px; 
        margin: 0 0 25px 0; 
        border-radius: 14px; 
        overflow: hidden;
        img {
            height: 100%;
            width: 100%;
        }
        @media (max-width: ${device.planshet}) {
            max-width: 270px;
            height: 154px;
        }
    }
    h5 {
        font-size: 16px;
        line-height: 18.75px;
        color: #223367;
        margin-bottom: 25px;

    }
    h6 {
        font-size: 16px;
        line-height: 18.75px;
        color: #C7C7C7;
        margin-bottom: 10px;
    }
    p {
        width: 100%;
        padding: 20px 30px;
        color: #223367;
        border-radius: 14px;
        background-color: #F5F5F5;
        margin-bottom: 25px;
    }
    @media (max-width: ${device.planshet}) {
        width: 48%;
    }

`
export const Left = styled.div`
    width: 45%;
    h6 {
        font-size: 16px;
        line-height: 18.75px;
        color: #C7C7C7;
        margin-bottom: 10px;
    }
    p {
        color: #223367;
        font-size: 14px;
        font-weight: 300;
        line-height: 16.5px;
        &:not(:last-child) {
            margin-bottom: 9px;
        }
    }
    @media (max-width: ${device.planshet}) {
        width: 48%;
    }
`

export const DownSideInfo = styled.div`
    h6 {
        font-size: 16px;
        line-height: 18.75px;
        color: #C7C7C7;
        margin-bottom: 10px;
    }
    p {
        width: 100%;
        padding: 20px 30px;
        color: #223367;
        border-radius: 14px;
        background-color: #F5F5F5;
        margin-bottom: 25px;
        font-weight: 500;
    }
`
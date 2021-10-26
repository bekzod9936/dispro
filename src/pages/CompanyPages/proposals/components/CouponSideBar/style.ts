import styled from "styled-components"
import { device } from "styles/device"

export const DeleteModal = styled.div`
    padding: 40px 55px 35px 55px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    h5 {
        font-size: 18px;
        line-height: 21px;
        font-weight: 500;
        color: #223367;
        margin-bottom: 20px;
    }
    p {
        font-size: 14px;
        line-height: 16.5px;
        color: #223367;
        font-weight: 300;
        margin-bottom: 30px;
    }
`
export const Wrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Header = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    h6 {
        font-size: 18px;
        color: #223367;
        line-height: 21px;
    }
`

export const Content = styled.div`
    margin: 20px 0;

    h5 {
        font-size: 16px;
        color: #C7C7C7;
        line-height: 19px;
        margin-bottom: 10px;
    }
    p {
        font-size: 14px;
        line-height: 16px;
        font-weight: 300;
        color: #223367;
        &:not(:last-child) {
            margin-bottom: 9px;
        }
    }
`

export const Preview = styled.div`
    position: relative;
    z-index: 12;
    height: 45%;
    overflow: hidden;
    /* @media (max-height: 900px) {
        display: none;
    } */
    img.couponImg {
        position: absolute;
        left: 10px;
        right: 10px;
        border-radius: 30px 30px 0 0;
        max-width: 275px;
        width: 100%;
        top: 10px;
        min-height: 185px;
    }
    img.iphoneImg {
        max-width: 300px;
        width: 100%;
        position: relative;
        /* z-index: 12; */
    }
`

export const PreviewContent = styled.div`
    position: absolute;
    bottom: 0;
    background-color: #eef0f2;
    height: 50%;
    left: 10px;
    right: 10px;
    border-radius: 30px 30px 0 0;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    span {
        font-weight: 500;
        font-size: 14px;
        color: #223367;
        margin-bottom: 15px;
    }
    p {
        font-weight: 700;
        color: #223367;
        font-size: 18px;
        margin-bottom: 15px;
    }
    h5 {
        font-size: 15px;
        color: #223367;
        display: flex;
        align-items: center;
        span {
            font-size: 20px !important;
            font-weight: 700;
            margin-right: 10px;
            margin-bottom: 0;
        }
    }
`
export const Img = styled.img`
    display: none;
    width: 200px;
    border-radius: 14px;
    @media (max-height: 900px) {
        display: block;
    }
    @media (max-width: ${device.laptop}) {
        display: block;
    }
`
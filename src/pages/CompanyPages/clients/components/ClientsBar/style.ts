import styled from "styled-components"
import { device } from "styles/device"

export const Text = styled.p`
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 25px;
    color: #223367;
`
export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`
export const Wrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 25px;

`
export const SelectButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        outline: none;
        border: none;
        color:#3492FF;
        font-size: 18px;
        font-family: "Roboto", sans-serif;
        line-height: 21px;
        margin-bottom: 21px;
        background-color: transparent;
        cursor: pointer;
    }
`
export const AddInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
        p {
            font-weight: 700;
            color:#C7C7C7;
            font-size: 18px;
            margin-bottom: 15px;
        }
        span {
            font-size: 18px;
            color: #223367;
            font-weight: 700;
            line-height: 21px;
        }
    }
`
export const Content = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: flex-start;
    width: 100%;
    img {
        width: 62px;
        height: 62px;
        border-radius: 14px;
        margin-right: 30px;
        
    }
    @media (max-width: ${device.planshet}) {
        img {
            width: 55px;
            height: 55px;
            margin-right: 15px;
        }
    }
`
export const DefaultImage = styled.div`
    background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
    height: 62px;
    width: 62px;
    border-radius: 14px;
    margin-right: 30px;
    display: block;
    @media (max-width: ${device.planshet}) {
        width: 55px;
        height: 55px;
        margin-right: 15px;

    }
`

export const ContentInfo = styled.div`
    p {
        font-size: 18px;
        font-weight: 700;
        color: #223367;
        line-height: 25px;
        margin-bottom: 10px;
    }
    span {
        color: #223367;
        font-size: 16px;
        font-weight: 300;
        line-height: 18px;

    }
    @media (max-width: ${device.planshet}) {
        p {
            margin-bottom: 5px;
        }
    }
`
export const SubContent = styled.div`
    p {
        font-size: 14px;
        color: #223367;
        font-weight: 300;
        line-height: 16px;
        margin-bottom: 20px;

    }
`

export const Buttons = styled.div`
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .blockedContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            color: #FF5E68;
            font-size: 14px;
            font-weight: 300;
            margin-bottom: 5px;


        }
        b {
            color: #223367;
            font-size: 14px;
            font-weight: 300;
            margin-bottom: 20px;
        }
    }
    button.updatePercent {
        font-size: 16px;
        line-height: 18.75px;
        color: #3492FF;
        background: transparent;
        margin-top: 15px;
        border: 0;
        outline: 0;
        cursor: pointer;
        font-family: "Roboto", sans-serif;
        font-weight: 300;
    }
    `



export const MToggle = styled.div`
    display: flex;
    align-items: center;
    p {
        margin-right: 15px;
        margin-bottom: 0 !important;
        font-size: 16px;
        line-height: 21px;
        color: #223367;
        font-weight: 300;
    }
`

export const SelectedClients = styled.div`
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid rgba(96, 110, 234, 0.3);
    &:hover {
    ::-webkit-scrollbar-thumb {
      background: #606eea;
        }
    }
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 14px 0 0 14px;
    }
    .client {
        border: 1px solid #C4C4C4;
        box-sizing: border-box;
        border-radius: 46px;
        margin-right: 9px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        padding: 9px 10px;
        span {
            font-size: 14px;
            color: #223367;
            margin-right: 8px;
            font-weight: 300;
            line-height: 16.41px;
        }
        svg {
            cursor: pointer;
            transform: translateY(-1px);
        }
    }
`
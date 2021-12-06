import styled from "styled-components";
import { device } from "styles/device";

export const BreakLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(96, 110, 234, 0.3);
    margin: 10px 0;
`

export const Wrapper = styled.div`
    width: 100%;
    height: max-content;
    background-color: #ffffff;
    padding: 0 15px 15px 15px;
    div.statistics {
        display: flex;
        flex-wrap: wrap;
    }

`

export const InfoItem = styled.div`
    span {
        font-size: 14px;
        line-height: 16.45px;
        color: #A5A5A5;
        margin-bottom: 5px;
        margin-left: 5px;
    }
    p {
        font-size: 16px;
        line-height: 18px;
        color: #223367;
        font-weight: 500;
        margin-left: 5px;
    }
`

export const AddInfo = styled.div`
    display: flex;
    align-items: stretch;
    padding: 15px;
    width: 100%;
    height: 100%;
    @media (max-width: ${device.mobile}) {
        flex-direction: column;
        height: max-content;
    }
`
export const Container = styled.div`
`

export const InfoBlock = styled.div`
    width: 100%;
    background: #FFFFFF;
    height: 100%;
    margin-right: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    h4 {
        font-size: 14px;
        line-height: 16px;
        color: #C7C7C7;
        margin-bottom: 20px;

    }
    div {
        p {
            color: #223367;
            font-size: 14px;
            line-height: 16.41px;
            font-weight: 300;
            margin-bottom: 13px;
            @media (max-width: ${device.planshet}) {
                text-align: center;
            }
            span {
                color: #3492FF;
            }
        }
    }
    @media (max-width: ${device.mobile}) {
        margin-bottom: 13px;
    }
`
export const InfoWrapper = styled.div`
    width: 100%;
    margin-right: 25px;
    /* height: 100%; */
    @media (max-width: ${device.mobile}) {
        margin-right: 0;
    }
`
export const RecommendationsBlock = styled.div`
`

export const NoteBlock = styled.div`
    padding: 15px;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100vw - 30px);
    margin: auto auto 13px auto;
    overflow: hidden;
    h4 {
        font-size: 14px;
        color: #C7C7C7;
        margin-bottom: 13px;
        line-height: 16.41px;
    }
    p {
        font-size: 14px;
        line-height: 16.41px;
        color: #223367;
        font-weight: 300;
        
    }
`
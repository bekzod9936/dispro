import styled from "styled-components"
import { device } from "styles/device"
interface IProps {
    isSelected?: boolean,
    stats?: any
}
export const Container = styled.div`
    transition: 200ms all;
    padding: 18px 20px;
    background: ${({ isSelected }: IProps) => isSelected ? "rgba(96, 110, 234, 0.1);" : "#ffffff"};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    /* display: flex;
    align-items: center; */
    display: grid;
    grid-template-columns: ${({ stats }: IProps) => stats ? "repeat(4, 1fr)" : "repeat(3, 1fr)"};
    grid-template-rows: 1fr;
    /* justify-content: space-between; */
    max-width: ${({ stats }: IProps) => stats ? "1150px" : "860px"};
    /* width: 100%; */
    margin-bottom: 15px;
    cursor: pointer;
    @media (max-width: 1340px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 1210px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media(max-width: ${device.laptop}) {
        max-width: none !important;
        
    }

`

export const ImageBlock = styled.div`
    /* width: ${({ stats }: IProps) => stats ? "25%" : "32%"}; */
    margin-right: 35px;
    @media (max-width: ${device.laptop}) {
        margin-right: 15px;
    }
    @media (max-width: 1340px) {
        margin-right: 25px;
    }
    img {
        border-radius: 14px;
        width: 200px;
        display: block;
        height: 120px;
    }
`

export const Main = styled.div`
    margin-right: 40px;
    /* width: ${({ stats }: IProps) => stats ? "25%" : "32%"}; */
    overflow-x: hidden;
    @media (max-width: ${device.laptop}) {
        margin-right: 15px;
    }
    @media (max-width: 1340px) {
        margin-right: 25px;
    }
    @media (max-width: 1210px) {
        margin-right: 0;
    }
    div {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        h6 {
            font-size : 14px;
            font-weight: 400;
            color: #223367;
            
        }
        p {
            color: #8F8F8F;
            font-size: 14px;
            line-height: 16px;
            font-weight: 500;
            margin-left: 30px;
        }
    }
    p {
        font-size: 14px;
        line-height: 16px;
        font-weight: 300;
        color: #223367;
    }
    h4 {
        font-size: 18px;
        line-height: 21px;
        color: #223367;
        margin-bottom: 10px;
    }
`

export const Submain = styled.div`
    margin-right: 45px;
    @media (max-width: ${device.laptop}) {
        margin-right: 15px;
    }
    @media (max-width: 1340px) {
        margin-right: 0;
    }
    @media (max-width: 1210px) {
        display: none;
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
`

export const Stats = styled.div`
    /* width: 20%; */
    @media (max-width: 1340px) {
        display: none;
    }
    @media (max-width: ${device.planshet}) {
        width: 100%;
        display: block;
    }
    @media (max-width: ${device.mobile}) {
        width: 100%;
    }
    p {
        font-size: 14px;
        line-height: 16.45px;
        font-weight: 300;
        display: flex;
        align-items: center;
        &:not(:last-child) {
            margin-bottom: 12px;
        }
    }
    p.first {
        color: #09D235;
        &::before {
            content: "";
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 8px;
            background-color: #09D235;
        }
    }
    p.second {
        color: #3492FF;
        &::before {
            content: "";
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 8px;
            background-color: #3492FF;
        }
    }
    p.third {
        color: #757EC6;
        &::before {
            content: "";
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 8px;
            background-color: #757EC6;
        }
    }
    p.fourth {
        color: #C7C7C7;
        &::before {
            content: "";
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 8px;
            background-color: #C7C7C7;
        }
    }
`
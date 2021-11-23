import { Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    padding: 15px 30px 20px 15px;
    max-width: 410px;
    width: 100%;
    height: 100%;
`

export const Icon = styled.div`
    cursor: pointer;
    padding: 9px 10px;
    border-radius: 8px;
    transition: 200ms all;
    &:hover {
        background: rgba(96, 110, 234, 0.1);
    }
`
export const UpSide = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .imageBlock {
        position: relative;
        width: 100px;
        height: 100px;
        img {
            width: 100px;
            height: 100px;
            border-radius: 14px;
            object-fit: cover;
        }
        
        .blocked {
            position: absolute;
            width: 30px;
            height: 30px;
            bottom: 0;
            right: -5px;
            bottom: -2px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            background: #F1F4F6;
            svg {
                width: 12px;
                height: 14px
            }
        }
    }
    
`
export const DefaultImage = styled.div`
    background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
    width: 100px;
    height: 100px;
    border-radius: 14px;
    position: relative;
    div.blocked {
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 8px;
            background-color: #F1F4F6;
            display: flex;
            justify-content: center;
            align-items: center;
            right: -5px;
            bottom: -2px;
            svg {
                width: 12px;
                height: 14px;
            }

        }
`

export const DownSide = styled.div`
    margin-left: 6px;
    h5 {
        font-size: 22px;
        line-height: 25px;
        margin-bottom: 10px;
        color: #223367;
    }
    p {
        span {
            font-size: 16px;
            color: #223367;
            line-height: 18.75px;
            font-weight: 300;
            &:not(:last-child) {
                margin-right: 35px;
            }
        }
    }
`

export const StyledToolTip = styled(Tooltip)`
    background-color: white !important;
`
import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    overflow: auto;
`
export const Header = styled.div`
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        svg {
            cursor: pointer;
        }
        p {
            font-size: 18px;
            line-height: 21px;
            color: #8F8F8F;
            font-weight: 300;
        }
    }
    button {
        outline: none;
        border: none;
        color: #3492FF;
        font-size: 18px;
        line-height: 21px;
        font-weight: 300;
        background: transparent;
        font-family: "Roboto", sans-serif;
    }
`

export const ListItem = styled.div`
    width: 100%;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    &:nth-child(even) {
        background: rgba(96, 110, 234, 0.1);
    }
    img {
        border-radius: 14px;
        width: 50px;
        height: 50px;
        margin-right: 25px;
    }
    p {
        font-size: 18px;
        line-height: 21px;
        color: #223367;
        margin-right: 50px;
    }
    span {
        font-size: 16px;
        font-weight: 300;
        color: #223367;
    }
    div.fakeImage {
        width: 50px;
        height: 50px;
        border-radius: 14px;
        margin-right: 25px;
        background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
    }
`


export const MCheckbox = styled.div`
    margin-right: 25px;
	span.MuiCheckbox-colorSecondary.Mui-checked {
        color: #3492ff !important ;
    }
    span.MuiCheckbox-colorSecondary {
        color: #a5a5a5 !important ;
    }
    span.MuiTypography-body1 {
        font-weight: 500 !important ;
        font-size: 16px !important ;
        color: #223367 !important ;
    }
    @media (min-width: ${device.laptop}) {
        span.MuiTypography-body1 {
        font-size: 18px !important ;
        }
    }
`


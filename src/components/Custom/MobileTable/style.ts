import styled from "styled-components";
import { device } from "styles/device";

export const Table = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
`
export const Thead = styled.div`
    padding: 13px 20px 13px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
        outline: 0;
        border: 0;
        background: transparent;
        color: #3492FF;
        font-size: 14px;
        line-height: 16.45px;
        font-weight: 300;
        font-family: "Roboto", sans-serif;
        cursor: pointer;
    }
    span {
        font-size: 14px;
        font-weight: 300;
        color: #8F8F8F;
        line-height: 16.45px;
    }
    svg {
        cursor: pointer;
        transition: 200ms all;
        &:hover{
            transform: scale(1.1, 1.1)
        }
    }
`
export const Tbody = styled.div`
     & > div:nth-child(odd) {
    background-color: rgba(96, 110, 234, 0.1);
  }

  & > div:nth-child(even) {
    background-color: white;
  }
`
export const MCheckbox = styled.div`
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
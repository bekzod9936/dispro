import styled from "styled-components";
import { device } from "styles/device";
interface IProps {
  selected?: boolean
}
export const Table = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    overflow: hidden;
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
export const Trow = styled.div`
    display: flex;
    align-items: center;
    padding: 9px 15px;
    transition: 100ms all;
    background-color: ${({ selected }: IProps) => selected && "rgba(96, 110, 234, 0.3) !important;"};
    img {
        margin-right: 15px;
        border-radius: 14px;
        width: 40px;
        height: 40px;
        display: block;
        object-fit: cover;
    }
    div.content {
      h5 {
        font-size: 16px;
        line-height: 18.75px;
        color: #223367;
        font-weight: 400;
        margin-bottom: 3px;
      }
      p {
        font-weight: 300;
        line-height: 16.4px;
        color: #223367;
        font-size: 14px;
      }
      span {
        font-weight: 300;
        line-height: 16.4px;
        color: #FF5E68;
        font-size: 14px;
      }
      b {
        font-weight: 300;
        line-height: 16.4px;
        color: #223367;
        font-size: 14px;
      }
    }
`
export const DefaultImg = styled.div`
    background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
    border-radius: 14px;
    width: 40px;
    height: 40px;
    margin-right: 15px;
`
export const MCheckbox = styled.div`
    margin-right: 15px;
    span {
        padding: 0 !important;
    }
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
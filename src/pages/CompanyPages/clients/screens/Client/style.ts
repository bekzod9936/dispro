import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    padding: 30px;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`

export const UpSide = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 205px;
    margin-bottom: 30px;
    
`

export const MiddleSide = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    max-width: 1250px;
    width: 100%;
    margin-bottom: 20px;
`

export const DownSide = styled.div`
    width: 100%;
`

export const MWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 1px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
  @media (max-width: ${device.mobile}) {
  padding-bottom: 100px;

  }
  `
export const MUpside = styled.div`
  padding-top: 20px;
  width: 100%;
  padding-left: 15px;
  height: max-content;
  background-color: #ffffff;
`

export const MNav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  svg {
    width: 13px !important;
    height: 20px !important;
  }
  @media (max-width: ${device.mobile}) {
    margin-bottom: 10px;
    svg {
      width: 10px !important;
      height: 15px !important;
    }
  }
`
export const MAddInfo = styled.div`
  margin-left: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 13px;
  p {
    font-size: 14px;
    font-weight: 300;
    line-height: 16.45px;
    color: #223367;
  }
  p.gender {
    margin-right: 25px;
  }
`
export const MButtons = styled.div`
  margin-bottom: 20px;
`
export const MDefaultImage = styled.div`
  width: 55px;
  height: 55px;
  background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
  border-radius: 14px;
  margin: 0 15px;
  position: relative;
  .block {
    display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background-color: #F1F4F6;
      bottom: -4px;
      right: -6px;
      padding: 4px 5px;
      position: absolute;
      svg {
        height: 14px;
        width: 12px;

      }
  }
  @media (max-width: ${device.mobile}) {
    width: 40px;
    height: 40px;
  }
`
export const SpinnerWrapper = styled.div`
  max-width: 410px;
  width: 100%;
`
export const MClientInfo = styled.div`
  display: flex;
  align-items: center;
  .image {
    width: 55px;
    height: 55px;
    margin: 0 20px;
    position: relative;
    .block {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background-color: #F1F4F6;
      bottom: -4px;
      right: -6px;
      padding: 4px 5px;
      position: absolute;
      svg {
        height: 14px;
        width: 12px;

      }
    }
    img {
    border-radius: 14px;
    width: 55px;
    height: 55px;
    display: block;
  }
  }
 
  .planshetHeader {
    h6 {
    font-size: 18px;
    font-weight: 500;
    line-height: 18.75px;
    color: #223367;
      margin-bottom: 5px;
  }
    span.clientInfo {
      font-size: 15px;
      color: #223367;
      font-weight: 300;
      b {
        margin-right: 5px;
      }
    }
    @media (max-width: ${device.planshet}) {
      display: flex;
      align-items: center;
      margin-right: 55px;
    }
    @media (max-width: ${device.mobile}) {
      margin-right: 0;
      width: 100%;
      justify-content: center;
      h6 {
        font-size: 16px;
        margin-bottom: 0;
      }
    }
  }
  @media (max-width: ${device.mobile}) {
      .image {
        width: 40px;
        height: 40px;
        margin: 0 15px;

        img {
          width: 40px;
          height: 40px;
        }
      }
    }
`
export const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const IconWrapper = styled.div`
  svg {
    width: 20px;
    height: 20px;
  }
`


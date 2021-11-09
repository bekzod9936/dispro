import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 30px;
    width: 100%;
    height: 100%;
    overflow: auto;
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
    height: 205px;
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
  margin-bottom: 10px;
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
  width: 40px;
  height: 40px;
  background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
  border-radius: 14px;
  margin: 0 15px;
`

export const MClientInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 14px;
    width: 40px;
    height: 40px;
    display: block;
    margin: 0 15px;
  }
  h6 {
    font-size: 16px;
    font-weight: 500;
    line-height: 18.75px;
    color: #223367;

  }
`

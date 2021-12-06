import styled from "styled-components";
import { device } from "styles/device";
export const Container = styled.div`
  overflow: hidden;
  /* height: 100%; */
  width: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
`;
export const WrapSpinner = styled.div`
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    appearance: none;
    display: none;
  }

  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
`;
export const Wrap = styled.div`
  overflow-y: auto;
  padding-right: 25px;
  padding-top: 20px;
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
  @media (max-width: ${device.mobile}) {
    padding: 0px 15px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    padding-top: 0px;
    padding-right: 25px;
    padding-left: 25px;
  }
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
  @media (max-width: ${device.mobile}) {
    margin-bottom: 15px;
    font-size: 16px;
    span {
      font-size: 16px;
    }
  }
`;

export const AgeData = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  h4 {
    position: absolute;
    margin-left: 80%;
    padding: 10px 20px;
    font-size: 14px;
    background: linear-gradient(215.2deg, #8bdd59 -12.1%, #dcf089 101.51%);
    border-radius: 14px;
  }
`;

export const TitleData = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  /* margin-left: 15px; */
  img {
    border-radius: 14px;
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
`;

export const DefaultImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: linear-gradient(215.2deg, #c7eeff -12.1%, #fca9ea 101.51%);
  margin-right: 15px;
`;

export const WrapMobile = styled.div`
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    appearance: none;
    display: none;
  }

  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
`;
export const LeftHeader = styled.div`
  overflow: hidden;
`;

export const WrapHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: ${device.mobile}) {
    padding: 5px 0 0 10px;
  }
`;

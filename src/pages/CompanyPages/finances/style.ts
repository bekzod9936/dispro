import styled from 'styled-components';
import { device } from 'styles/device';

export const MainWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  flex: 1;
  padding: 25px 0 0 25px;
  @media (max-width: ${device.mobile}) {
    padding: 15px 0 0 15px;
  }
`;

export const Wrap = styled.div`
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

export const WrapTotalSum = styled.div`
  @media (max-width: ${device.mobile}) {
    display: flex;
    align-items: center;
  }
`;

export const TotalSum = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  font-weight: bold;
  font-size: 22px;
  color: #606eea;
  width: fit-content;
  height: 45px;
  margin: 7px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 200px;
  padding-left: 20px;
  @media (min-width: ${device.laptop}) {
    height: 50px;
    font-size: 28px;
  }
  @media (max-width: ${device.mobile}) {
    background: transparent;
    box-shadow: none;
    margin: 0;
    padding-left: 0;
    height: fit-content;
    font-size: 16px;
  }
`;

export const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  @media (max-width: ${device.mobile}) {
    font-weight: 500;
    font-size: 13px;
    color: #223367;
  }
`;

export const WrapTotal = styled.div`
  @media (max-width: ${device.mobile}) {
    display: grid;
    margin-top: 15px;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 15px;
    align-items: center;
    justify-content: space-between;
  }
`;

export const WrapHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const RightHeader = styled.div`
  position: absolute;
  right: 25px;
  top: 0;
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const LeftHeader = styled.div`
  overflow: hidden;
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

export const WrapSum = styled.div`
  margin-left: 10px;
`;

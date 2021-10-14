import styled from 'styled-components';
import { device } from 'styles/device';

export const MainWrapper = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
`;

export const WrapTotalSum = styled.div``;
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
    margin: 10px 0;
    height: 50px;
    font-size: 28px;
  }
`;

export const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const WrapTotal = styled.div``;

export const WrapHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const RightHeader = styled.div`
  position: absolute;
  right: 30px;
  top: 25px;
`;
export const LeftHeader = styled.div``;

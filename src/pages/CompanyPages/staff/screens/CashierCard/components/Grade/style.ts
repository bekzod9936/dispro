import styled from 'styled-components';
import { device } from 'styles/device';

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  padding: 20px;
  width: 100%;
  margin-bottom: 60px;
`;

export const Title = styled.div`
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 15px;
  color: #c7c7c7;
  width: fit-content;
  user-select: none;
  text-align: center;
  width: 100%;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: 14px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: 15px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PercentDef = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #c4c4c4;
  margin-left: 10px;
`;

export const PercentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PercentNum = styled.div`
  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
  color: #606eea;
`;

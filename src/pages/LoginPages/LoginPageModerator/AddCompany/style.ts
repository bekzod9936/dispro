import styled from 'styled-components';
import { device } from '../../../../styles/device';
import { Step, StepLabel, Stepper } from '@material-ui/core';

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-x: auto;
  width: 100%;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }

  @media (max-width: ${device.mobile}) {
    box-shadow: none;
    width: 100%;
  }
  @media (min-width: ${device.laptop}) {
    margin-top: 50px;
  }
`;

export const MainWrap = styled.div`
  width: 60%;
  min-width: 290px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: ${device.mobile}) {
    box-shadow: none;
    width: 100%;
    height: 100%;
    margin-bottom: 0;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  color: #223367;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  @media (max-width: ${device.mobile}) {
    font-size: 18px;
  }
  @media (max-width: ${device.laptop}) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

export const Text = styled.div`
  font-weight: normal;
  font-size: 15px;
  text-align: center;
  color: #223367;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const Version = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #8f8f8f;
  text-align: right;
  width: 100%;
  margin: 15px 25px 15px 0;
`;

export const WrapGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 50px;
  flex: 1;
  @media (max-width: ${device.mobile}) {
    padding: 0 15px;
  }
  @media (min-width: ${device.laptop}) {
    padding: 0 50px;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${device.mobile}) {
    height: 100%;
  }
`;

export const CountryWrap = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  span {
    font-style: normal;
    font-size: 16px;
    color: #c7c7c7;
    margin: 20px 0 10px;
  }
  div {
    height: 60px;
    background: #f5f5f5;
    border-radius: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #223367;
    opacity: 0.6;
    padding-left: 25px;
  }
  margin-bottom: 50px;
  @media (max-width: ${device.mobile}) {
    margin-bottom: 30px;
    span {
      font-size: 14px;
    }
    div {
      height: 45px;
      font-size: 14px;
    }
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    margin-bottom: 40px;
    span {
      font-size: 15px;
    }
    div {
      height: 52px;
      font-size: 15px;
    }
  }
`;

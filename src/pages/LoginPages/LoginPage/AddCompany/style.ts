import styled from 'styled-components';
import { device } from '../../../../styles/device';

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
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
    width: 100%;
  }
  @media (min-width: ${device.laptop}) {
    margin-top: 50px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    align-items: center;
    overflow-y: hidden;
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

  @media (max-width: ${device.planshet}) {
    box-shadow: none;
    width: 100%;
    max-height: 100%;
    flex-shrink: 1;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: ${device.planshet}) {
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
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    padding-top: 40px;
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
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    display: none;
  }
`;

export const WrapGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 50px 20px;
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  @media (max-width: ${device.mobile}) {
    padding: 0 15px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    padding: 0 115px 30px;
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
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    flex: 1;
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

export const WrapImg = styled.div`
  @media (max-width: ${device.mobile}) {
    width: 35px;
    height: 20px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    width: 55px;
    height: 30px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    width: 65px;
    height: 35px;
  }
  width: 70px;
  height: 40px;
  margin-right: 20px;
`;

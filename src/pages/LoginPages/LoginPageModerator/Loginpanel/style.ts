import styled from 'styled-components';
import { device } from '../../../../styles/device';

interface TProps {
  weight?: string;
  fontSize?: number;
  marginB?: number;
}
interface TimeProp {
  time?: number;
}

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 35px 25px;
  width: 100%;
  @media (max-width: ${device.mobile}) {
    box-shadow: none;
    width: 100%;
    padding: 0 15px 30px;
  }
`;

export const MainWrap = styled.div`
  width: 60%;
  height: 95%;
  min-width: 290px;
  max-height: 550px;
  min-width: fit-content;
  min-height: 500px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${device.mobile}) {
    box-shadow: none;
    width: 100%;
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
  font-size: 20px;
  color: #223367;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Body = styled.div`
  margin: 50px;
  height: 100%;
  flex: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    margin: 30px 50px;
  }
  @media (max-width: ${device.mobile}) {
    margin: 50px 0 0;
  }
`;

export const Text = styled.div`
  font-weight: ${({ weight }: TProps) => weight || 'normal'};
  font-size: ${({ fontSize }: TProps) => `${fontSize}px` || '16px'};
  color: #223367;
  font-style: normal;
  margin-bottom: ${({ marginB }: TProps) => `${marginB}px` || null};
  @media (max-width: ${device.mobile}) {
    font-size: 18px;
    text-align: center;
  }
`;

export const Message = styled.div`
  color: #ff5e68;
  font-weight: 300;
  overflow-wrap: normal;
  display: flex;
  font-size: 16px;
  margin-top: 5px;
  @media (max-width: ${device.mobile}) {
    div {
      font-size: 14px;
    }
  }
  @media (max-width: ${device.desktop}) {
    flex-direction: column;
  }
`;

export const WrapTime = styled.div`
  margin-right: 8px;
  background: ${({ time }: TimeProp) =>
    time === 0 ? 'rgba(185, 185, 185, 0.5)' : ' rgba(96, 110, 234, 0.5)'};
  border-radius: 14px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${device.mobile}) {
    width: 34px;
    height: 34px;
  }
`;
export const Time = styled.div`
  background: ${({ time }: TimeProp) =>
    time === 0 ? 'rgba(185, 185, 185, 0.7)' : ' rgba(96, 110, 234, 0.5)'};
  border-radius: 8px;
  width: 30px;
  height: 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${device.mobile}) {
    font-size: 11px;
    width: 23px;
    height: 23px;
  }
`;

export const SmsNumber = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: #c2c2c2;
  margin-top: 5px;
  display: ${({ time }: TimeProp) => (time === 0 ? 'none' : 'block')};
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
`;

export const Content = styled.div`
  height: fit-content;
`;

export const WrapContent = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  flex: 100%;
  justify-content: space-between;
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const WrapButton = styled.div`
  margin-bottom: 20px;
  @media (max-width: ${device.mobile}) {
    margin-bottom: 10px;
  }
`;

export const LogInWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const LogInContentWrap = styled.div``;

import styled from 'styled-components';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import { ReactComponent as Tick } from 'assets/icons/tick.svg';
import { ReactComponent as Across } from 'assets/icons/SideBar/close.svg';
import { device } from 'styles/device';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 14px;
  padding: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  width: 100%;
  height: 100%;
  .highcharts-title {
    fill: #223367;
    font-weight: 500;
    font-size: 14px;
  }
  .highcharts-subtitle {
    fill: #3492ff;
    font-weight: 300;
    font-size: 14px;
    cursor: pointer;
  }
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #223367;
  width: fit-content;
`;

export const WrapHeader = styled.div``;
export const WrapModalH = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WrapTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: #223367;
`;

export const CloseIcon = styled(Close)`
  width: 15px;
  height: 15px;
`;

export const TickIcon = styled(Tick)`
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

export const AcrossIcon = styled(Across)``;

export const WrapButtons = styled.div`
  display: flex;
  align-items: flex-end;
`;

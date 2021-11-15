import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Filter } from 'assets/icons/StatistisPage/filter.svg';
import { ReactComponent as Reset } from 'assets/icons/StatistisPage/reset.svg';
import { ReactComponent as Tick } from 'assets/icons/tick.svg';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';

export const FilterIcon = styled(Filter)``;

export const ResetIcon = styled(Reset)`
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 16px;
  }
`;

export const TickIcon = styled(Tick)`
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

export const Content = styled.div`
  min-width: 400px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 18px;
  color: #223367;
  padding: 5px 20px;
  @media (max-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const Body = styled.div`
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
`;

export const Footer = styled.div`
  margin: 20px 0 20px 20px;
`;

export const Container = styled.div`
  width: fit-content;
`;

export const WrapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
`;

export const WrapTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
`;

export const CloseIcon = styled(Close)`
  width: 15px;
  height: 15px;
`;

export const BoxWrap = styled.div`
  & > div:nth-child(2n-1) {
    background-color: #eff0fd;
  }
  & > div:nth-child(2n) {
    background-color: white;
  }
`;

export const FooterModel = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;

export const WrapMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const WrapBody = styled.div``;

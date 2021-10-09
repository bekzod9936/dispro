import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Filter } from 'assets/icons/StatistisPage/filter.svg';
import { ReactComponent as Reset } from 'assets/icons/StatistisPage/reset.svg';
import { ReactComponent as Tick } from 'assets/icons/tick.svg';

export const FilterIcon = styled(Filter)``;

export const ResetIcon = styled(Reset)``;

export const TickIcon = styled(Tick)``;

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

export const Body = styled.div``;

export const Footer = styled.div`
  margin: 20px 0 20px 20px;
`;

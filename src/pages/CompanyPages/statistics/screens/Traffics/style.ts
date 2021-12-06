import styled, { css } from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as App } from 'assets/icons/StatistisPage/app.svg';
import { ReactComponent as Mobile } from 'assets/icons/StatistisPage/mobile.svg';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
`;

const iconstyle = css`
  margin-right: 20px;
  @media (max-width: ${device.mobile}) {
    margin-right: 0;
  }
`;

export const AppIcon = styled(App)`
  ${iconstyle}
`;

export const MobileIcon = styled(Mobile)`
  ${iconstyle}
`;

export const WrapIcon = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const Img = styled.img`
  ${iconstyle}
`;

export const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
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
  padding-right: 25px;
  padding-bottom: 30px;
  @media (max-width: ${device.mobile}) {
    padding-right: 15px;
    padding-bottom: 15px;
  }
`;



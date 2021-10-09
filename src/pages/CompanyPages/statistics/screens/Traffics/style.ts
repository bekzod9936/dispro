import styled, { css } from 'styled-components';
import { ReactComponent as App } from 'assets/icons/StatistisPage/app.svg';
import { ReactComponent as Mobile } from 'assets/icons/StatistisPage/mobile.svg';

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const iconstyle = css`
  margin-right: 20px;
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

import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Save } from 'assets/icons/IconsInfo/save.svg';
import { ReactComponent as LogWhite } from 'assets/icons/SideBar/logoutwhite.svg';
import { ReactComponent as Cancel } from 'assets/icons/SideBar/close.svg';

interface Props {
  color?: string;
}

export const SaveIcon = styled(Save)`
  width: 24px;
  height: 24px;
  @media (max-width: ${device.planshet}) {
    width: 18px;
    height: 18px;
  }
`;

export const CloseIcon = styled(LogWhite)`
  & > path {
    fill: ${({ color }: Props) => color};
  }
  margin-left: 10px;
  @media (min-width: ${device.planshet}) {
    margin-left: 15px;
    width: 20px;
    height: 20px;
  }
  @media (max-width: ${device.mobile}) {
    width: 18px;
    height: 18px;
  }
`;

export const CancelIcon = styled(Cancel)`
  margin-right: 15px;
  @media (max-width: ${device.planshet}) {
    width: 18px;
    height: 18px;
    margin-left: 10px;
    margin-right: 0;
    & > path {
      fill: #606eea;
    }
  }
`;

import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Save } from "assets/icons/IconsInfo/save.svg";
import { ReactComponent as LogWhite } from "assets/icons/SideBar/logoutwhite.svg";
import { ReactComponent as Cancel } from "assets/icons/SideBar/close.svg";
import { ReactComponent as DeleteIconWhite } from "assets/icons/delete_ic.svg";
import { ReactComponent as SettingIcon } from "assets/icons/setting_ic.svg";

interface IUsers {
  width?: number;
}

export const ArrowDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const TwoUserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const UsersRow = styled.div`
  width: ${({ width = 120 }: IUsers) => `${width}px`};
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const TextContainer = styled.div`
  width: max-content;
  text-align: center;
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export const DeleteIcon = styled(DeleteIconWhite)`
  width: 23px;
  height: 25px;
  @media (max-width: ${device.planshet}) {
    width: 15px;
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

export const SettingsIcon = styled(SettingIcon)`
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

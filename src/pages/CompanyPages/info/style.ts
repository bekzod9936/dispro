import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as LogWhite } from "assets/icons/SideBar/logoutwhite.svg";
import { ReactComponent as Close } from "assets/icons/SideBar/close.svg";

interface ButtonProps {
  mobile?: boolean;
}

interface TProps {
  weight?: string;
  color?: string;
  fontSize?: {
    mobile?: number;
    planshet?: number;
    laptop?: number;
    desktop?: number;
  };
}

interface CProps {
  bgcolor?: string;
  photosectionpadding?: boolean;
}

export const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #223367;
  margin-bottom: 7px;
  user-select: none;
  @media (max-width: ${device.mobile}) {
    font-size: ${({ fontSize }: TProps) =>
      fontSize?.mobile ? `${fontSize?.mobile}px` : "14px"};
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ fontSize }: TProps) =>
      fontSize?.planshet ? `${fontSize?.planshet}px` : "14px"};
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ fontSize }: TProps) =>
      fontSize?.laptop ? `${fontSize?.laptop}px` : "15px"};
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ fontSize }: TProps) =>
      fontSize?.desktop ? `${fontSize?.desktop}px` : "16px"};
  }
`;

export const Text = styled.div`
  font-style: normal;
  font-size: 14px;
  color: ${({ color }: TProps) => (color ? color : "#223367")};
  font-weight: ${({ weight }: TProps) => (weight ? weight : "300")};
  user-select: none;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: ${({ photosectionpadding }: CProps) =>
    photosectionpadding ? "0" : "0 50px 0 0"};
  position: relative;

  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    padding: ${({ photosectionpadding }: CProps) =>
      photosectionpadding ? "25px 0 0 30px" : "25px 40px 0 30px"};
  }
  @media (min-width: ${device.laptop}) {
    padding: ${({ photosectionpadding }: CProps) =>
      photosectionpadding ? "30px 0 0 35px" : "30px 50px 0 35px"};
  }
  @media (max-width: ${device.planshet}) {
    padding: 15px 0 0;
    background-color: ${({ bgcolor }: CProps) => bgcolor};
  }
`;

export const LogOutIcon = styled(LogWhite)`
  margin-left: 15px;
  & > path {
    fill: white;
  }
  width: 24px;
  height: 24px;
  @media (max-width: ${device.planshet}) {
    width: 18px;
    height: 18px;
  }
`;

export const CloseIcon = styled(Close)`
  margin-right: ${({ mobile }: ButtonProps) => (mobile ? null : "15px")};
  margin-left: ${({ mobile }: ButtonProps) => (mobile ? "15px" : null)};
  & > path {
    fill: ${({ mobile }: ButtonProps) => (mobile ? "#606EEA" : "#223367")};
  }
`;

export const ModelContent = styled.div`
  padding: 40px 60px 35px 50px;
  min-width: 400px;

  @media (max-width: ${device.planshet}) {
    padding: 15px;
    min-width: 290px;
    max-width: 290px;
  }

  @media (max-width: ${device.planshet}) {
    padding: 25px;
    min-width: 340px;
    max-width: 340px;
  }
`;
export const ModelTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  text-align: left;
  color: #223367;
  @media (max-width: ${device.planshet}) {
    font-size: 16px;
  }
`;
export const ModalWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const Warn = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  max-width: 320px;
  min-width: 50px;
  margin-top: 20px;
`;

export const WrapNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 20px 0;

  @media (max-width: ${device.mobile}) {
    padding: 15px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    padding: 20px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    padding: 10px 10px 10px 0;
  }
`;

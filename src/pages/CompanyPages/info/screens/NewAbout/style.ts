import styled, { css } from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Arrow } from "assets/icons/IconsInfo/arrowright.svg";
import { ReactComponent as Facebook } from "assets/icons/IconsInfo/facebook.svg";
import { ReactComponent as Instagram } from "assets/icons/IconsInfo/instagram.svg";
import { ReactComponent as Telegram } from "assets/icons/IconsInfo/telegram.svg";
import { ReactComponent as Twitter } from "assets/icons/IconsInfo/twitter.svg";
import { ReactComponent as VK } from "assets/icons/IconsInfo/vk.svg";
import { ReactComponent as WhatsApp } from "assets/icons/IconsInfo/whatsapp.svg";
import { ReactComponent as Viber } from "assets/icons/IconsInfo/viber.svg";
import { ReactComponent as Delete } from "assets/icons/IconsInfo/delete.svg";

interface Props {
  bgcolor?: any;
}

const iconcommon = css`
  width: 24px;
  height: 24px;
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

export const FIcon = styled(Facebook)`
  ${iconcommon}
`;
export const IIcon = styled(Instagram)`
  ${iconcommon}
`;
export const TIcon = styled(Telegram)`
  ${iconcommon}
`;
export const TWIcon = styled(Twitter)`
  ${iconcommon}
`;
export const VKIcon = styled(VK)`
  ${iconcommon}
`;
export const WTIcon = styled(WhatsApp)`
  ${iconcommon}
`;
export const VIcon = styled(Viber)`
  ${iconcommon}
`;

export const ArrowIcon = styled(Arrow)``;

export const DeleteIcon = styled(Delete)`
  width: 20px;
  height: 25px;
`;

export const Form = styled.form`
  border-radius: 14px 14px 0 0;
  background-color: white;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 50px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media (max-width: ${device.planshet}) {
    padding: 0;
    border-radius: 0;
    padding: 0 0 65px 0;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    padding: 30px 0 0 0;
  }
`;

export const UpSide = styled.div`
  height: 80%;
  width: 100%;
  flex-grow: 1;
  @media (max-width: ${device.mobile}) {
    padding: 0 15px 0 15px;
  }
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: auto;

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
`;

export const DownSide = styled.div`
  background-color: white;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  height: 20%;
  max-height: 65px;

  & > div {
    width: 87%;
    border-top: 1px solid rgba(96, 110, 234, 0.3);
    display: flex;
    align-items: center;
  }
  @media (max-width: ${device.planshet}) {
    position: fixed;
    bottom: 0;
    left: 0;
    & > div {
      width: 100%;
      border-top: 1px solid rgba(96, 110, 234, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 20px;
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const Wrap = styled.div`
  width: 40%;
  @media (max-width: ${device.mobile}) {
    width: 100%;
  }
`;

export const WrapArrow = styled.div`
  background-color: ${({ bgcolor }: Props) =>
    bgcolor ? "#606EEA" : "#C2C2C2"};
  cursor: ${({ bgcolor }: Props) => (bgcolor ? "pointer" : "not-allowed")};
  height: 50px;
  width: 55px;
  border-radius: 0 14px 14px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${device.planshet}) {
    height: 45px;
    width: 45px;
  }

  @media (min-width: ${device.laptop}) {
    height: 60px;
    width: 65px;
  }
`;

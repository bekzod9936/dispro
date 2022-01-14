import styled, { css } from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Facebook } from "assets/icons/IconsInfo/facebook.svg";
import { ReactComponent as Instagram } from "assets/icons/IconsInfo/instagram.svg";
import { ReactComponent as Telegram } from "assets/icons/IconsInfo/telegram.svg";
import { ReactComponent as Twitter } from "assets/icons/IconsInfo/twitter.svg";
import { ReactComponent as VK } from "assets/icons/IconsInfo/vk.svg";
import { ReactComponent as WhatsApp } from "assets/icons/IconsInfo/whatsapp.svg";
import { ReactComponent as Viber } from "assets/icons/IconsInfo/viber.svg";
import { ReactComponent as Close } from "assets/icons/SideBar/close.svg";
import { ReactComponent as EditPen } from "assets/icons/editpen.svg";

export const IconPen = styled(EditPen)`
  width: 18px;
  height: 18px;
  & > path {
    stroke: #1890ff;
  }
`;

export const Container = styled.div``;

export const WrapLinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #606eea;
  border-radius: 14px;
  width: 40px;
  height: 40px;

  @media (max-width: ${device.mobile}) {
    width: 33px;
    height: 33px;
    border-radius: 12px;
  }
`;

export const ModelContent = styled.div`
  min-width: 400px;
  padding: 20px;
  @media (max-width: ${device.mobile}) {
    min-width: 290px;
  }
`;

export const ModalWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
`;

export const CloseIcon = styled(Close)`
  margin-right: 15px;
`;

export const WrapLink = styled.div`
  display: flex;
  align-items: center;

  div:last-child {
    font-weight: normal;
    font-size: 16px;
    color: #223367;
    margin-left: 20px;
  }
  @media (max-width: ${device.mobile}) {
    div:last-child {
      font-size: 14px;
      margin-left: 15px;
    }
  }
`;
export const WrapSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
`;

export const ValueStyle = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
`;

export const WrapButtonsDelete = styled.div`
  display: flex;
  justify-content: center;
`;

export const ModalTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: #223367;
  max-width: 400px;
`;

export const ModalText = styled.div`
  font-weight: normal;
  font-size: 18px;
  color: #223367;
  max-width: 410px;
  word-break: break-word;
  margin-top: 15px;
`;

export const ModalWrap1 = styled.div`
  padding: 30px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 500px;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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

export const WrapDeleteComment = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #223367;
  margin: 15px 0;
  word-break: break-all;
`;

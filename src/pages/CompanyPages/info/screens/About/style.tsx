import styled, { css } from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Facebook } from 'assets/icons/IconsInfo/facebook.svg';
import { ReactComponent as Instagram } from 'assets/icons/IconsInfo/instagram.svg';
import { ReactComponent as Telegram } from 'assets/icons/IconsInfo/telegram.svg';
import { ReactComponent as Twitter } from 'assets/icons/IconsInfo/twitter.svg';
import { ReactComponent as VK } from 'assets/icons/IconsInfo/vk.svg';
import { ReactComponent as WhatsApp } from 'assets/icons/IconsInfo/whatsapp.svg';
import { ReactComponent as Viber } from 'assets/icons/IconsInfo/viber.svg';
import { ReactComponent as Arrow } from 'assets/icons/IconsInfo/arrowright.svg';
import { ReactComponent as Trash } from 'assets/icons/IconsInfo/trash.svg';
import { ReactComponent as PhotoLoading } from 'assets/icons/IconsInfo/photoloading.svg';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';

interface Props {
  weight?: string;
  bgcolor?: any;
  color?: string;
}

interface ButtonProps {
  mobile?: boolean;
  color?: string;
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

export const DeleteIcon = styled(Delete)`
  & > path {
    fill: ${({ color }: ButtonProps) => (color ? color : null)};
  }
`;

export const PhotoLoadingIcon = styled(PhotoLoading)`
  margin-left: 15px;
  width: 24px;
  height: 24px;
  @media (max-width: ${device.mobile}) {
    width: 18px;
    height: 18px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
`;

export const TrashIcon = styled(Trash)`
  & > path {
    fill: #ffffff;
  }
`;

export const ForExample = styled.div`
  margin-bottom: 20px;
  font-weight: 300;
  font-size: 14px;
  color: #223367;
`;

export const PhotoWrap = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 20px 0;
  .lazy-load-image-background.blur.lazy-load-image-loaded {
    filter: blur(0);
    transition: filter 0.3s;
    height: 100%;
    width: 100%;
  }
  :hover {
    div {
      background: rgba(34, 51, 103, 0.75);
      svg {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 2.5rem;
        height: 3rem;
      }
    }
  }
  @media (max-width: ${device.mobile}) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: ${device.laptop}) {
    width: 120px;
    height: 120px;
  }
  cursor: pointer;
  background-color: transparent;
`;

export const WrapTrash = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  cursor: pointer;
  background-color: transparent;
  border-radius: 14px;
  & > svg {
    display: none;
  }
`;

export const ArrowIcon = styled(Arrow)``;

export const WrapLoading = styled.div``;

export const WrapArrow = styled.div`
  background-color: ${({ bgcolor }: Props) =>
    bgcolor ? '#606EEA' : '#C2C2C2'};
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

export const LeftSide = styled.div`
  width: 40%;
  @media (max-width: ${device.mobile}) {
    width: 100%;
  }
`;

export const RightSide = styled.div`
  width: 40%;
  @media (max-width: ${device.mobile}) {
    width: 100%;
  }
`;

export const WrapHeader = styled.div``;

export const WrapCurrency = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;

  span {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: #c7c7c7;
    margin-bottom: 7px;
  }
  div {
    font-weight: 500;
    font-size: 16px;
    color: #223367;
    background: #f5f5f5;
    border-radius: 14px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 25px;
  }
  @media (max-width: ${device.planshet}) {
    div {
      height: 45px;
      font-size: 15px;
    }

    span {
      margin-bottom: 5px;
      font-size: 14px;
    }
  }

  @media (min-width: ${device.laptop}) {
    div {
      height: 60px;
    }
  }
`;

export const LabelLoading = styled.label`
  background: rgba(96, 110, 234, 0.1);
  border-radius: 14px;
  font-weight: 500;
  font-size: 16px;
  color: #606eea;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  cursor: pointer;
  margin-top: 10px;
  user-select: none;
  height: 50px;
  padding: 0 15px;
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    height: 45px;
    font-size: 16px;
    padding: 0 20px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    padding: 0 15px;
    height: 45px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const WebLink = styled.div`
  font-weight: normal;
  user-select: none;
  font-size: 15px;
  color: #223367;

  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }

  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

interface Props {
  margin?: string;
}

export const WrapWebLink = styled.div`
  margin: ${({ margin }: Props) => margin};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const WebValue = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  display: flex;
  align-items: center;

  a {
    margin: 0 20px 0 15px;
    text-decoration: none;
    font-weight: 300;
    font-size: 14px;
    color: #223367;
  }
`;

export const WrapKeyWords = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 20px;
  }
`;
export const ButtonKeyWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4c4;
  border-radius: 46px;
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  padding: 0 5px 0 15px;
  margin: 10px 10px 0 0;
  height: 35px;
  .MuiIconButton-root {
    padding: 6px !important;
    margin-left: 5px;
  }
  @media (max-width: ${device.mobile}) {
    height: 25px;
    font-weight: 300;
    font-size: 12px;
    color: #223367;
  }
`;

export const Message = styled.div`
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  margin-top: 5px;
  font-size: 14px;

  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    margin-top: 3px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: 14px;
    margin-top: 3px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: 14px;

    margin-top: 3px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
    margin-top: 5px;
  }
`;

export const WrapPhoto = styled.div``;

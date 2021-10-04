import styled from 'styled-components';
import { device } from '../../../../styles/device';
import { ReactComponent as Facebook } from '../../../../assets/icons/IconsInfo/facebook.svg';
import { ReactComponent as Instagram } from '../../../../assets/icons/IconsInfo/instagram.svg';
import { ReactComponent as Telegram } from '../../../../assets/icons/IconsInfo/telegram.svg';
import { ReactComponent as Twitter } from '../../../../assets/icons/IconsInfo/twitter.svg';
import { ReactComponent as VK } from '../../../../assets/icons/IconsInfo/vk.svg';
import { ReactComponent as WhatsApp } from '../../../../assets/icons/IconsInfo/whatsapp.svg';
import { ReactComponent as Viber } from '../../../../assets/icons/IconsInfo/viber.svg';
import { ReactComponent as Arrow } from '../../../../assets/icons/IconsInfo/arrowright.svg';
import { ReactComponent as TextArea } from '../../../../assets/icons/IconsInfo/textarea.svg';
import { ReactComponent as Trash } from '../../../../assets/icons/IconsInfo/trash.svg';
import { ReactComponent as PhotoLoading } from '../../../../assets/icons/IconsInfo/photoloading.svg';
import { ReactComponent as Save } from '../../../../assets/icons/IconsInfo/save.svg';
import { ReactComponent as Close } from '../../../../assets/icons/SideBar/close.svg';

interface Props {
  weight?: string;
  bgcolor?: any;
  color?: string;
}

export const FIcon = styled(Facebook)``;
export const IIcon = styled(Instagram)``;
export const TIcon = styled(Telegram)``;
export const TWIcon = styled(Twitter)``;
export const VKIcon = styled(VK)``;
export const WTIcon = styled(WhatsApp)``;
export const VIcon = styled(Viber)``;

export const PhotoLoadingIcon = styled(PhotoLoading)`
  margin-left: 15px;
`;

export const TrashIcon = styled(Trash)`
  & > path {
    fill: #ffffff;
  }
`;

export const SaveIcon = styled(Save)`
  margin-right: 15px;
`;

export const CloseIcon = styled(Close)`
  margin-right: ${({ mobile }: ButtonProps) => (mobile ? null : '15px')};
  margin-left: ${({ mobile }: ButtonProps) => (mobile ? '15px' : null)};
  & > path {
    fill: ${({ mobile }: ButtonProps) => (mobile ? '#606EEA' : '#223367')};
  }
`;

export const PhotoWrap = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
    width: 80px;
    height: 80px;
  }
  @media (min-width: ${device.laptop}) {
    width: 150px;
    height: 150px;
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

export const TextAreaIcon = styled(TextArea)``;

export const WrapLoading = styled.div``;

export const WrapArea = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  margin: 65px 10px 0 0;
  @media (max-width: ${device.mobile}) {
    margin: 55px 5px 0 0;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    margin: 30px 10px 0 0;
  }
  @media (min-width: ${device.laptop}) {
    margin: 90px 10px 0 0;
  }
`;

export const WrapArrow = styled.div`
  background-color: ${({ bgcolor }: Props) =>
    bgcolor ? '#606EEA' : '#C2C2C2'};
  height: 50px;
  width: 55px;
  border-radius: 0 14px 14px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${device.mobile}) {
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
  @media (max-width: ${device.mobile}) {
    padding: 0 10px;
  }
`;

export const UpSide = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 80%;
  width: 100%;
  @media (max-width: ${device.mobile}) {
    padding: 15px 15px 0 15px;
  }
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
  & > div {
    width: 87%;
    border-top: 1px solid rgba(96, 110, 234, 0.3);
  }
  @media (max-width: ${device.mobile}) {
    & > div {
      width: 100%;
      border-top: 1px solid rgba(96, 110, 234, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
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
    @media (max-width: ${device.mobile}) {
      height: 45px;
    }

    @media (min-width: ${device.laptop}) {
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
  padding: 13px;
  cursor: pointer;
  margin-top: 10px;
  user-select: none;
  @media (max-width: ${device.mobile}) {
    padding: 10px;
    font-size: 14px;
  }

  @media (min-width: ${device.laptop}) {
    padding: 15px;
    font-size: 18px;
  }
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  @media (max-width: ${device.mobile}) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: ${device.laptop}) {
    width: 120px;
    height: 120px;
  }
`;

interface ButtonProps {
  mobile?: boolean;
}

export const WrapButton = styled.div`
  display: ${({ mobile }: ButtonProps) => (mobile ? 'none' : 'inline-block')};

  @media (max-width: ${device.mobile}) {
    display: ${({ mobile }: ButtonProps) => (mobile ? 'inline-block' : 'none')};
  }
`;

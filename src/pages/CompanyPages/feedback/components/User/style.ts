import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Star } from 'assets/icons/FeedBack/star.svg';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import { ReactComponent as Message } from 'assets/icons/FeedBack/message.svg';
import { ReactComponent as Money } from 'assets/icons/FeedBack/money.svg';

interface Props {
  margin?: string;
}

export const CloseIcon = styled(Close)`
  width: 18px;
  height: 18px;
  @media (max-width: ${device.mobile}) {
    width: 15px;
    height: 15px;
  }
`;

export const MoneyIcon = styled(Money)``;

export const MessageIcon = styled(Message)``;

interface Props {
  bgcolor?: boolean;
}

export const StarIcon = styled(Star)`
  margin-right: 3px;
  width: 10px;
  height: 10px;
  & > path {
    fill: ${({ bgcolor }: Props) =>
      bgcolor ? '#FFC107' : 'rgba(255, 193, 7, 0.3)'};
  }
  @media (min-width: ${device.laptop}) {
    margin-right: 5px;
    width: 13px;
    height: 13px;
  }
  @media (max-width: ${device.mobile}) {
    margin-right: 5px;
    width: 13px;
    height: 13px;
  }
`;

export const WrapStars = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
`;

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 12px 16px rgba(13, 19, 36, 0.08);
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;
  height: fit-content;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  min-width: 190px;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;

  @media (max-width: ${device.mobile}) {
    border-radius: 12px;
    padding: 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const UserName = styled.div`
  font-weight: normal;
  font-size: 15px;
  color: #223367;
  white-space: nowrap;

  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
`;

export const Status = styled.div`
  font-weight: 300;
  font-size: 13px;
  color: #223367;
  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 12px;
  }
`;

export const Date1 = styled.div`
  div {
    font-weight: normal;
    font-size: 13px;
    color: #8f8f8f;
    white-space: nowrap;
    margin: ${({ margin }: Props) => margin};
    text-align: end;
    @media (min-width: ${device.laptop}) {
      font-size: 14px;
    }
  }
  div.mobile {
    display: none;
  }
  @media (max-width: ${device.mobile}) {
    div {
      font-size: 12px;
    }
    div.laptop {
      display: none;
    }
    div.mobile {
      display: block;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  font-weight: 500;
  font-size: 13px;
  color: #223367;
  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
`;

export const Context = styled.div`
  flex-grow: 1;
  @media (max-width: ${device.mobile}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Casher = styled.div`
  font-weight: 300;
  font-size: 13px;
  color: #3492ff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
`;

export const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: start;
  font-weight: 300;
  font-size: 13px;
  color: #223367;
  margin-bottom: 10px;
  width: 100%;
  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
  @media (max-width: ${device.mobile}) {
    -webkit-line-clamp: 4;
    font-size: 14px;
  }
`;

export const ModelContent = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
`;
export const ModalWrap = styled.div`
  overflow-y: auto;
  display: flex;
  overflow-x: hidden;
  flex: 1;
  flex-direction: column;
  padding: 20px;
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
  @media (max-width: ${device.mobile}) {
    padding: 15px;
  }
`;

export const WrapMContent = styled.div``;

export const ModalContext = styled.div`
  width: 100%;
  word-break: break-word;
  max-width: 500px;
`;

export const WrapClose = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const ModalText = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
`;

export const Wrapper = styled.div`
  @media (max-width: ${device.mobile}) {
    grid-gap: 5px;
  }
`;

export const WrapFillial = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 25px;
  justify-content: start;
  margin: 20px 0;
`;

export const WrapMoney = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  grid-gap: 15px;
`;

export const WrapButton = styled.div`
  @media (max-width: ${device.mobile}) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
`;

export const WrapDates = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

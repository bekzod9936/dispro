import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Star } from 'assets/icons/FeedBack/star.svg';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import { ReactComponent as Message } from 'assets/icons/FeedBack/message.svg';
import { ReactComponent as Money } from 'assets/icons/FeedBack/money.svg';

interface Props {
  margin?: string;
}
interface Props {
	bgcolor?: boolean;
  }
  interface Props {
	big?: boolean;
  }
  

export const CloseIcon = styled(Close)``;

export const MoneyIcon = styled(Money)``;

export const MessageIcon = styled(Message)``;



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
`;

export const WrapStars = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
`;

export const Container = styled.div`
// column-count: 3;
// column-gap: 10px;
  background: #ffffff;
  box-shadow: 0px 12px 16px rgba(13, 19, 36, 0.08);
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: fit-content;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const UserName = styled.div`
  font-weight: normal;
  font-size: 15px;
  color: #223367;
  white-space: nowrap;

  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const Status = styled.div`
  font-weight: 300;
  font-size: 13px;
  color: #223367;
  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
`;

export const Date = styled.div`
  font-weight: normal;
  font-size: 13px;
  color: #8f8f8f;
  white-space: nowrap;

  margin: ${({ margin }: Props) => margin};
  @media (min-width: ${device.laptop}) {
    font-size: 14px;
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
`;

export const Context = styled.div`
  overflow: hidden;
  max-width: 100%;
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
`;

export const Content = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  font-weight: 300;
  font-size: 13px;
  color: #223367;
  margin-bottom: 10px;

  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
`;

export const ModelContent = styled.div`
  width: 595px;
  max-width: 600px;
  max-height: 450px;
  overflow: hidden;
  display: flex;
  flex: 1;
`;
export const ModalWrap = styled.div`
  overflow-y: auto;
  display: flex;
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
`;

export const ModalContext = styled.div``;

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

export const Wrapper = styled.div``;

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


export const Avatar = styled.div`
  border-radius: 14px;
  width: ${({ big }: Props) => (big ? '45px' : '40px')};
  height: ${({ big }: Props) => (big ? '45px' : '40px')};
  min-width: ${({ big }: Props) => (big ? '45px' : '40px')};
  min-height: ${({ big }: Props) => (big ? '45px' : '40px')};
  background-color: lightgray;
  margin-right: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${device.laptop}) {
    width: ${({ big }: Props) => (big ? '55px' : '40px')};
    height: ${({ big }: Props) => (big ? '55px' : '40px')};
  }
  & > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

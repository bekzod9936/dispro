import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Search } from 'assets/icons/FeedBack/search.svg';

interface Props {
  right?: boolean;
}

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  margin-bottom: 10px;
  padding-right: 25px;
  overflow: hidden;
  background-color: transparent;
`;

export const LeftSide = styled.div`
  background-color: #abb2eb;
  border-radius: 14px 0 0 14px;
  width: 30%;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 300px;
`;

export const RightSide = styled.div`
  border-radius: 0 14px 14px 0;
  background-color: white;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const SearchIcon = styled(Search)`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  @media (max-width: ${device.mobile}) {
    width: 16px;
    height: 16px;
    margin-right: 0;
    & path {
      fill: #606eea;
    }
  }
`;

export const Header = styled.div`
  max-height: 85px;
  min-height: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  background-color: ${({ right }: Props) => (right ? 'white' : 'transparent')};
  padding: ${({ right }: Props) => (right ? '0 30px 0 15px' : '0 15px')};
  box-shadow: ${({ right }: Props) =>
    right ? '0px 4px 8px rgba(0, 0, 0, 0.12)' : null};
  border-radius: 0px 14px 0px 0px;
  @media (min-width: ${device.laptop}) {
    max-height: 90px;
    min-height: 90px;
    height: 90px;
  }
  position: relative;
`;

export const Fetching = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const Loading = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${device.mobile}) {
    color: #223367;
    font-weight: 500;
    margin-top: 15px;
  }
`;

export const WrapChatUsers = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  direction: rtl;

  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #223367;
    border-radius: 0px 14px 14px 0px;
  }
`;

export const NoResult = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  height: 200px;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
  word-break: break-word;
  width: 100%;
  text-align: center;
  @media (max-width: ${device.mobile}) {
    margin-top: 10px;
  }
`;

export const WrapImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;

export const WrapChoose = styled.div`
  color: #223367;
  font-weight: normal;
  font-size: 16px;
  margin-top: 25px;
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const Img = styled.img`
  width: 25%;
  height: 45%;
  @media (min-width: ${device.laptop}) {
    width: 20%;
    height: 35%;
  }
`;
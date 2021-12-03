import styled from 'styled-components';
import { ReactComponent as Search } from 'assets/icons/FeedBack/search.svg';
import { device } from 'styles/device';

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

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  margin-bottom: 10px;
  padding-right: 25px;
  overflow: hidden;
  background-color: transparent;
  flex-direction: column;
`;

export const Upside = styled.div`
  min-height: 85px;
  max-height: 85px;
  height: 85px;
  display: grid;
  grid-template-columns: 25% 75%;
`;

export const Downside = styled.div`
  flex-grow: 1;
  overflow: hidden;
  display: grid;
  grid-template-columns: 25% 75%;
`;

export const Box1 = styled.div`
  background-color: #abb2eb;
  border-radius: 14px 0 0 0;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  position: relative;
`;
export const Box2 = styled.div`
  border-radius: 0 14px 0 0;
  background-color: white;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
`;
export const Box3 = styled.div`
  background-color: #abb2eb;
  border-radius: 0 0 0 14px;
  overflow: hidden;
`;
export const Box4 = styled.div`
  border-radius: 0 0 14px 0;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
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

export const Img = styled.img`
  width: 25%;
  height: 45%;
  @media (min-width: ${device.laptop}) {
    width: 20%;
    height: 35%;
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

export const WrapUserInfo = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  z-index: 99;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 10px;
  & > div:first-child {
    display: flex;
    align-items: center;
  }
  @media (max-width: ${device.mobile}) {
    flex: 1;
    justify-content: space-between;
  }
`;

export const UserName = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const WrapInfo = styled.div``;

export const Form = styled.form`
  background: #ffffff;
  border: 2px solid #c2c2c2;
  border-radius: 14px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${device.mobile}) {
    border: none;
    border-radius: 0;
  }
`;

export const Body = styled.div`
  display: flex;

  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 15px;
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

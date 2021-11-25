import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Bell } from 'assets/icons/SideBar/bell.svg';
import { ReactComponent as Dis } from 'assets/icons/disicon.svg';

export const BellIcon = styled(Bell)`
  width: 30px;
  height: 30px;
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    width: 25px;
    height: 25px;
  }
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

export const Container = styled.div``;

export const BadgeWrap = styled.div`
  position: relative;
`;

export const BadgeContent = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3492ff;
  border: 3px solid #ffffff;
  border-radius: 14px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  top: -15px;
  left: 10px;
  user-select: none;
  padding: 3px 6px;
  @media (max-width: ${device.mobile}) {
    font-size: 10px;
    top: -8px;
    left: 10px;
    padding: 2px 5px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    font-size: 12px;
    top: -12px;
    left: 10px;
    padding: 1px 4px;
  }
`;

export const Avatar = styled.div`
  border-radius: 14px;
  width: 50px;
  height: 50px;
  min-height: 50px;
  min-width: 50px;
  background-color: lightgray;
  margin-right: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    width: 45px;
    height: 45px;
    min-height: 45px;
    min-width: 45px;
  }
  @media (max-width: ${device.mobile}) {
    width: 40px;
    height: 40px;
    min-height: 40px;
    min-width: 40px;
  }
`;

export const DisIcon = styled(Dis)`
  width: 80%;
`;

export const WrapNotification = styled.div`
  display: flex;
  padding: 20px 25px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
`;

export const LastMessage = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
`;

export const Name = styled.div`
  & > span {
    color: #223367;
    margin-right: 5px;
  }
  font-weight: 500;
  font-size: 16px;
  color: #606eea;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
`;

export const Date1 = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #a5a5a5;
  margin-top: 10px;
  @media (max-width: ${device.mobile}) {
    font-size: 12px;
  }
`;

export const Wrapper = styled.div`
  padding: 25px 0;
`;

export const WrapData = styled.div`
  max-width: 270px;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #223367;
  padding: 0 25px;

  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const Wrap = styled.div`
  overflow: hidden;
  min-width: 400px;
  max-width: 400px;
  width: 400px;
  min-height: 360px;
  max-height: 360px;
  height: 360px;

  @media (min-width: ${device.laptop}) {
    min-width: 400px;
    min-height: 360px;
    max-height: 360px;
  }
  & > div {
    height: 100%;
    width: 100%;
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
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  color: #223367;
  & > span {
    margin-left: 10px;
  }
  padding-left: 5px;
`;

export const ModalWrap = styled.div`
  padding: 15px 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  & > div:last-child {
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 15px;
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
  }
`;

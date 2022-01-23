import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Pink } from 'assets/icons/StatistisPage/app.svg';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import { ReactComponent as Trash } from 'assets/icons/delete.svg';

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 5px 0;
  margin-top: 15px;
  & > div:nth-child(2n-1) {
    background-color: #eff0fd;
  }
  & > div:nth-child(2n) {
    background-color: white;
  }
`;

export const PinkIcon = styled(Pink)``;

export const Data = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const FullName = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #223367;
`;

export const Title = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
`;

export const Amount = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #223367;
  margin-left: 5px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin-left: -10px;
  grid-gap: 15px;
  & > span {
    font-weight: 500;
    font-size: 16px;
    color: #223367;
  }
`;

export const ModalContent = styled.div`
  padding: 15px;
`;

export const WrapBox = styled.div``;

export const Box = styled.div`
  border-bottom: 1px solid rgba(96, 110, 234, 0.3);
  padding: 10px 0 10px 5px;
`;

export const BoxTitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  color: #a5a5a5;
  margin-bottom: 5px;
`;

export const BoxInfo = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
`;

interface MProps {
  isAvatar?: boolean;
}

export const WrapMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ isAvatar }: MProps) => (isAvatar ? '15px' : '0')};
`;

export const WrapIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapAvatar = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 15px;
  & > span {
    font-weight: 500;
    font-size: 16px;
    color: #223367;
  }
`;

export const WrapSideBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  height: 80%;
  @media (max-width: ${device.mobile}) {
    padding: 0 20px;
  }
`;

export const WrapSideHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0 13px 0 25px;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  color: #223367;
  margin-bottom: 15px;
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const WrapSideFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 20px;
  @media (max-width: ${device.planshet}) {
    grid-gap: 10px;
  }
`;

export const BodyTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #c7c7c7;
  padding: 0 25px;
  margin-bottom: 10px;
  @media (max-width: ${device.mobile}) {
    font-weight: normal;
    font-size: 14px;
    color: #a5a5a5;
    padding: 0;
  }
`;

export const Comment = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: #223367;
  margin-bottom: 10px;
  overflow: hidden;
  height: 100%;
  padding: 0 0 0 25px;
  @media (max-width: ${device.mobile}) {
    padding: 0;
  }
  & > div {
    height: 100%;
    word-break: break-all;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
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

export const CloseIcon = styled(Close)`
  width: 15px;
  height: 15px;
`;

export const DeleteIcon1 = styled(Trash)``;

export const WarpButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px 0;
`;

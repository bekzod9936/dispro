import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import { ReactComponent as Trash } from 'assets/icons/IconsInfo/trash.svg';

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
    overflow-y: auto;
    overflow-x: hidden;
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

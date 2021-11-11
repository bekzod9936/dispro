import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Close } from 'assets/icons/SideBar/close.svg';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';

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

export const DeleteIcon = styled(Delete)`
  margin-left: 10px;
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

import styled from 'styled-components';
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
  margin: 15px 20px 0 0;
`;

export const ModelContent = styled.div`
  min-width: 400px;
  padding: 20px;
`;

export const ModalWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: flex-end;
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
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;
export const WrapSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ValueStyle = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
`;

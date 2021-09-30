import styled from 'styled-components';
import { ReactComponent as Delete } from '../../../../../../assets/icons/IconsInfo/delete.svg';

export const Container = styled.div`
  width: fit-content;
  margin: 5px 10px;
  height: fit-content;
`;

export const Content = styled.div`
  padding: 25px;
`;

export const DeleteIcon = styled(Delete)`
  margin-left: 10px;
`;

export const Label = styled.label`
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  color: #223367;
  cursor: pointer;
`;

export const WrapCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const WrapTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

import styled from 'styled-components';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  justify-content: space-between;
  padding: 0 15px;
`;

export const WrapTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const DeleteIcon = styled(Delete)`
  margin-left: 10px;
`;

export const WrapCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: -12px;
  & > span.MuiCheckbox-colorPrimary.Mui-checked {
    color: #606eea !important ;
  }

  & > span.MuiCheckbox-root {
    color: #a5a5a5 !important ;
  }
  span.MuiTypography-body1 {
    font-weight: 300 !important;
    font-size: 16px !important;
    color: #223367 !important;
  }
`;

export const Label = styled.label`
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  color: #223367;
  cursor: pointer;
`;

export const WrapButton = styled.div`
  position: absolute;
  bottom: 15px;
  left: calc(50% - 70px);
`;

export const Content = styled.div``;

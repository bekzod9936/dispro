import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';

export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  margin-bottom: 5px;
`;

export const WrapStatus = styled.div``;

export const WrapCheck = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

export const WrapPlaceHolder = styled.div`
  width: fit-content;
  font-weight: 500;
  font-size: 18px;
  color: #a5a5a5;
  padding-left: 15px;
`;

export const WrapInputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > div {
    display: flex;
    width: 100%;
  }
`;

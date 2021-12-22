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

export const WrapFilter = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: 10px;
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    width: 60%;
  }
  @media (min-width: ${device.laptop}) {
    width: 70%;
  }
  @media (max-width: ${device.mobile}) {
    padding-bottom: 15px;
  }
`;

export const ButtonKeyWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4c4;
  border-radius: 46px;
  font-weight: 300;
  font-size: 13px;
  color: #223367;
  padding: 0 5px 0 15px;

  height: 30px;
  .MuiIconButton-root {
    padding: 6px !important;
    margin-left: 5px;
  }
  @media (max-width: ${device.mobile}) {
    height: 25px;
    font-weight: 300;
    font-size: 12px;
    color: #223367;
  }
  @media (min-width: ${device.laptop}) {
    height: 35px;
    font-size: 14px;
  }
`;

export const DeleteIcon = styled(Delete)`
  & > path {
    fill: #c4c4c4;
  }
`;

export const WrapValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
`;

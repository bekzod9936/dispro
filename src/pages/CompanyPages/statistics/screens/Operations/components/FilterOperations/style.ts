import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';

export const WrapFilter = styled.div`
  padding-bottom: 20px;
  display: flex;
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
  margin: 10px 10px 0 0;
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

export const WrapVal = styled.div``;

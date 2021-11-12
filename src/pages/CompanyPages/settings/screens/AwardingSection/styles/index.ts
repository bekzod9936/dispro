import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { device } from 'styles/device';

export const Form = styled.form`
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const UpSide = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 100%;
  flex: 1;
`;

export const DownSide = styled.div`
  height: 20%;
  min-height: 75px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const AwardContainer = styled(Grid)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  flex: 1;
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
`;

export const BottomAwardBtnContainer = styled.div`
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${device.laptop}) {
    display: flex;
    height: 100%;
  }
`;

export const LeftAwardGrid = styled(Grid)``;

export const RightAwardGrid = styled(Grid)``;

export const ControlGrid = styled(Grid)``;

export const AwardGrid = styled(Grid)``;

//Birthday row
export const RecomendationRow = styled.div`
  display: column;
  width: 100%;
`;

export const TextAreaGrid = styled(Grid)`
  padding-left: 20px;

  @media (max-width: ${device.laptop}) {
    padding-left: 0;
  }
`;

export const PayForGrid = styled(Grid)``;

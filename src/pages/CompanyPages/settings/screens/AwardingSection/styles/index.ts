import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { device } from "styles/device";

interface ITop {
  pTop?: number;
}

export const Form = styled.form`
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 14px;
  border: none;
  padding-left: 20px;
  padding-top: ${({ pTop = 25 }: ITop) => pTop + "px"};
  @media (max-width: ${device.planshet}) {
    background: transparent;
    padding-top: 0;
    padding-left: 0;
    border-radius: 0;
  }
`;

export const UpSide = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 100%;
  flex: 1;
`;

export const DownSide = styled.div`
  height: 16%;
  min-height: 75px;
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: ${device.planshet}) {
    background: #fff;
  }
`;

export const AwardContainer = styled.div`
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

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-left: 10px;
  padding-right: 10px;
  @media (max-width: ${device.planshet}) {
    grid-template-columns: 1fr;
  }
`;

export const BottomAwardBtnContainer = styled.div`
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${device.planshet}) {
    justify-content: center;
    height: 100%;
  }
`;

export const LeftAwardGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const RightAwardGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${device.planshet}) {
    margin-top: 20px;
  }
`;

export const ControlGrid = styled(Grid)``;

export const AwardGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

//Birthday row
export const RecomendationRow = styled.div`
  display: column;
  width: 100%;
`;

export const TextAreaGrid = styled(Grid)`
  padding-left: 20px;

  @media (max-width: ${device.planshet}) {
    padding-left: 0;
    margin-top: 15px;
  }
`;

export const PayForGrid = styled(Grid)`
  @media (max-width: ${device.planshet}) {
    margin-top: 15px;
  }
`;

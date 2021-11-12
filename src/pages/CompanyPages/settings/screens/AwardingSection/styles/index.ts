import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { device } from "styles/device";

export const AwardWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background-color: white;
  padding: 20px 50px 70px 45px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 50px;
  overflow-y: hidden;
  overflow-x: hidden;

  @media (max-width: ${device.laptop}) {
    background-color: transparent;
    padding: 0;
  }
`;

export const Form = styled.form`
  height: 100%;
`;

export const AwardContainer = styled(Grid)`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const BottomAwardBtnContainer = styled.div`
  width: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  line-height: 60px;

  @media (max-width: ${device.laptop}) {
    display: flex;
    justify-content: center;
    height: 100%;
    line-height: 75px;
  }
`;

export const LeftAwardGrid = styled(Grid)`
  padding-top: 20px;
`;

export const RightAwardGrid = styled(Grid)``;

export const ControlGrid = styled(Grid)`
  padding-top: 20px;
`;

export const AwardGrid = styled(Grid)`
  padding-top: 20px;
`;

//Birthday row
export const RecomendationRow = styled.div`
  display: column;
  width: 100%;
`;

export const TextAreaGrid = styled(Grid)`
  padding-left: 20px;

  @media (max-width: ${device.laptop}) {
    padding-left: 0;
    padding-top: 20px;
  }
`;

export const PayForGrid = styled(Grid)`
  margin-top: 30px;
`;

export const UpSide = styled.div`
  flex: 6;
`;

export const DownSide = styled.div`
  flex: 1;
  @media (max-width: ${device.laptop}) {
    height: 75px;
    width: 100%;
    background-color: #fff;
    content: "";
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

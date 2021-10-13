import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

export const AwardWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 14px;
  background-color: white;
  padding: 20px 50px 70px 45px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 50px;
`;

export const Form = styled.form`
  height: 100%;
`;

export const AwardContainer = styled(Grid)`
  height: 100%;
`;

export const BottomAwardBtnContainer = styled.div`
  position: absolute;
  padding-top: 25px;
  padding-bottom: 20px;
  bottom: 0;
  left: 40px;
  width: 100%;
  background-color: transparent;
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
`;

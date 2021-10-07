import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

export const BottomBtnContainer = styled.div`
  position: fixed;
  bottom: 20px;
  width: 100%;
`;

export const GridContainer = styled(Grid)`
  margin-bottom: 120px;
`;

export const LeftGrid = styled(Grid)`
  border-right: 1px solid rgba(96, 110, 234, 0.3);
`;

export const RightGrid = styled(Grid)`
  padding-left: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LevelsCard = styled.div`
  padding: 25px 50px;
  border-radius: 14px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LevelsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const LevelsRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const LevelsHead = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

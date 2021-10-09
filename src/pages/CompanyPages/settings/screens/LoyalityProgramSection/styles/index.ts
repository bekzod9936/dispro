import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const LeftGrid = styled(Grid)`
  border-right: 3px solid rgba(96, 110, 234, 0.3);
`;

//levels row
export const LevelsRow = styled(Grid)`
  flex-direction: row;
`;

export const ThirdContainer = styled.div``;

export const AddIconDiv = styled.div`
  background: rgba(96, 110, 234, 0.1);
  border-radius: 8px;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SelectGrid = styled(Grid)`
  display: flex;
  align-items: flex-end;
`;

export const LevelGrid = styled(Grid)`
  display: flex;
  align-items: flex-end;
`;

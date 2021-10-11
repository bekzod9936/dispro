import styled from "styled-components";
import { Grid } from "@material-ui/core";

interface IProps {
  bgContain?: boolean;
}

export const LeftGrid = styled(Grid)`
  border-right: 3px solid rgba(96, 110, 234, 0.3);
`;

//levels row

export const ProgramRow = styled(Grid)`
  margin-bottom: 25px;
`;

export const LevelsRow = styled(Grid)`
  flex-direction: row;
`;

export const ThirdContainer = styled.div`
  padding-bottom: 10px;
  padding-left: 10px;
`;

export const AddIconDiv = styled.div`
  /* background: rgba(96, 110, 234, 0.1); */
  background: ${({ bgContain = true }: IProps) =>
    bgContain ? "rgba(96, 110, 234, 0.1)" : "#fff"};
  border-radius: 8px;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RemoveIconDiv = styled.div`
  border-radius: 8px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RequirementsGrid = styled(Grid)`
  margin-top: 25px;
`;

export const SelectGrid = styled(Grid)`
  display: flex;
  align-items: flex-end;
`;

export const LevelGrid = styled(Grid)`
  display: flex;
  align-items: flex-end;
`;

export const SubText = styled.p`
  color: #a5a5a5;
  font-size: 16px;
  line-height: 18.75px;
  font-weight: 400;
  font-style: "Roboto";
  margin: 0 20px 0 0;
  padding: 0;
`;

export const HeaderGrid = styled(Grid)`
  padding-left: 0 !important;
`;

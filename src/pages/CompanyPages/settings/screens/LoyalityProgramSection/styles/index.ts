import styled from "styled-components";
import { Grid } from "@material-ui/core";

interface IProps {
  bgContain?: boolean;
}

export const MainContainer = styled(Grid)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
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

export const PercentDiv = styled.div`
  padding-right: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalBody = styled.div`
  text-align: left;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const LoyalDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  span.MuiTypography-body1 {
    font-weight: normal !important;
    font-size: 14px !important;
    color: #223367 !important;
    text-transform: none;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
`;

export const CloseBtn = styled.div`
  position: absolute;
  top: 10;
  right: 10;
`;

export const EText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 150%;
  color: #223367;
  margin-top: 40px;
  text-align: center;
`;

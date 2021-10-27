import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

interface IProps {
  deactivated?: boolean;
}

export const GridContainer = styled(Grid)`
  /* margin-bottom: 120px; */
  overflow-y: hidden;
`;

export const LeftGrid = styled(Grid)`
  border-right: 1px solid rgba(96, 110, 234, 0.3);
  position: relative;
  overflow: hidden;
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

export const Form = styled.form``;

export const ReferalCol = styled.div`
  display: flex;
  align-items: center;
  opacity: ${({ deactivated }: IProps) => (deactivated ? 0.4 : 1)};
`;

export const TextDiv = styled.div`
  width: 140px;
  text-align: left;
`;

export const HeaderReferal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: start;
  margin-bottom: 25px;
`;

export const ActDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: fit-content;
  padding-left: 4px;
`;

export const AddDiv = styled.div`
  background: rgba(96, 110, 234, 0.1);
  border-radius: 8px;
  height: 100%;
  width: 100%;
  padding: 8px;
`;

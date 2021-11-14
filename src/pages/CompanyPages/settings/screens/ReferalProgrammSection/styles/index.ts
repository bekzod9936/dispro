import styled from "styled-components";
import { device } from "styles/device";

interface IProps {
  deactivated?: boolean;
}

export const GridContainer = styled.div`
  /* margin-bottom: 120px; */
  overflow-y: hidden;
  height: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 0.7fr;

  @media (max-width: ${device.planshet}) {
    grid-template-columns: 1fr;
  }
`;

export const LeftGrid = styled.div`
  position: relative;
  overflow: hidden;
  overflow-y: hidden;
  flex: 1;
  height: 100%;
`;

export const RightGrid = styled.div`
  padding-left: 20%;
  padding-top: 110px !important;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: hidden;

  @media (max-width: ${device.planshet}) {
    padding-top: 0 !important;
    padding-left: 15px !important;
    padding-right: 15px;
    width: 100%;
  }
`;

export const LevelsCard = styled.div`
  padding: 25px 50px;
  border-radius: 14px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${device.planshet}) {
    width: 100%;
    padding: 15px 40px;
  }
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

export const Form = styled.form`
  flex: 1;
  height: 100%;

  @media (max-width: ${device.planshet}) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

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
  margin-bottom: 0;
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

export const SettingDiv = styled.div`
  width: 100%;
  padding-top: 10px;
`;

export const ReferalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 90%;
`;

export const ReferalContainer = styled.div`
  height: 80%;
  flex: 1;
`;

export const ReferalBtn = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
`;

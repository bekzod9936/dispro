import styled from "styled-components";
import { device } from "styles/device";

interface IProps {
  deactivated?: boolean;
}

export const GridContainer = styled.div`
  overflow-y: hidden;
  height: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 0.7fr;

  @media (max-width: ${device.planshet}) {
    grid-template-columns: 1fr;
    overflow-y: auto;
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
  padding-left: 0;
  padding-top:80px !important;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto !important;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }

  @media (max-width: ${device.planshet}) {
    padding-top: 0 !important;
    padding-left: 15px !important;
    padding-right: 15px;
    width: 100%;
    margin-top: 15px;
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
  align-items: center;
  justify-content: start;
  margin-top:5px;
  margin-bottom: 15px;
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
  height: 70%;
  flex: 1;
`;

export const ReferalBtn = styled.div`
  height: 30%;
  margin-bottom:10px;
  display: flex;
  align-items: center;
`;

export const ReferalDiv = styled.footer`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #fff;
  visibility: hidden;
  z-index: 9999;
  transition: 1s all linear;
`;

//mobile side
export const ReferalHeader = styled.div`
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 3px;
`;

export const Htext = styled.p`
  width: 190px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;

export const ReferalBody = styled.div`
  flex: 1;
  height: 80%;
  background-color: #f1f4f6;
`;

export const ReferalWrapper = styled.div`
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const ActionDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

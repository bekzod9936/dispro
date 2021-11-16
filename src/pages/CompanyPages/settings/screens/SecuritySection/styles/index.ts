import styled from "styled-components";
import { device } from "styles/device";

export const Form = styled.form`
  flex: 1;
  padding-top: 25px;
  padding-left: 15px;
  display: flex;
  height: 100%;
  position: relative;
  flex-direction: column;
  background-color: #fff;
  border: none;
  border-radius: 14px;

  @media (max-width: ${device.planshet}) {
    padding-left: 0;
    padding-top: 0;
    background: transparent;
  }
`;

export const UpSide = styled.div`
  overflow-y: scroll;
  height: 100%;
  overflow-x: hidden;
  height: 80%;
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

  @media (max-width: ${device.planshet}) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

export const UpWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DownSide = styled.div`
  height: 18%;

  @media (max-width: ${device.planshet}) {
    width: 100%;
    background-color: #fff;
  }
`;

export const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: ${device.planshet}) {
    justify-content: center;
  }
`;

export const UpRow = styled.div`
  display: flex;
  flex-direction: column;
`;

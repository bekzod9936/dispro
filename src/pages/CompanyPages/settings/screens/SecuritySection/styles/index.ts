import styled from "styled-components";
import { device } from "styles/device";

export const Form = styled.form`
  padding-top: 25px;
  padding-left: 35px;
  display: flex;
  height: 100%;
  position: relative;

  @media (max-width: ${device.laptop}) {
    padding-left: 0;
    height: 65vh;
  }
`;

export const UpSide = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex: 6;
`;

export const DownSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;

  @media (max-width: ${device.planshet}) {
    content: "";
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 90px;
  }
`;

export const UpRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SecurityWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
`;

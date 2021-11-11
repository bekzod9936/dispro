import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { device } from "styles/device";

export const QRPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding-left: 35px;
  padding-top: 30px;
  overflow-y: scroll;

  @media (max-width: ${device.mobile}) {
    padding-left: 0;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    padding-left: 0;
  }
`;

export const CreateBtn = styled.div`
  flex: 1;
  display: flex;
  @media (max-width: ${device.mobile}) {
    justify-content: flex-end;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    justify-content: flex-end;
  }
`;

export const HeadInput = styled.div`
  flex: 3;
  @media (max-width: ${device.mobile}) {
    flex: 1;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    flex: 1;
  }
`;

export const IconDiv = styled.div`
  padding-left: 30px;
`;

export const BtnAction = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  @media (max-width: ${device.mobile}) {
    justify-content: center;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    justify-content: center;
  }
`;

export const MyHeadAction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  align-items: flex-end;

  @media (max-width: ${device.mobile}) {
    flex-direction: row-reverse;
    width: 100%;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    flex-direction: row-reverse;
    width: 100%;
  }
`;

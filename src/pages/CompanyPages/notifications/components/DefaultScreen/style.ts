import styled from "styled-components";
import { device } from "styles/device";

export const WrapDefault = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
  & > img {
    width: 25%;
    height: 50%;
    min-width: 200px;
    min-height: 200px;
    max-width: 360px;
    max-height: 320px;
  }
  & > span {
    margin-top: 30px;
    font-size: 18px;
    color: #223367;
    text-align: center;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    & > span {
      width: 70%;
    }
  }
  @media (max-width: ${device.mobile}) {
    & > img {
      width: 50%;
      height: 50%;
    }
    & > span {
      margin-top: 40px;
      font-size: 16px;
    }
  }
`;

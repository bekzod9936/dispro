import styled from "styled-components";
import { device } from "styles/device";

export const ManagerDiv = styled.div`
  margin-top: 50px;
  padding-right: 40px;

`;

export const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  width: 530px;
  line-height: 150%;
`;

export const Break = styled.div`
  height: 20px;
`;

export const WrapDef = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ImgDef = styled.img`
  @media (max-width: ${device.mobile}) {
    width: 40%;
    height: 60%;
    min-height: 150px;
    min-width: 160px;
  }
`;

export const DefDiv = styled.div`
  font-weight: normal;
  font-size: 18px;
  text-align: center;
  color: #223367;
  max-width: 40%;
  margin-top: 10px;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
`;

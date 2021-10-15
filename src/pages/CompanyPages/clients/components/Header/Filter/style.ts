import styled from "styled-components";
import { device } from "styles/device";

export const WrapInputs = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
  }
`;
export const WrapStatus = styled.div`
`
export const WrapCheck = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;
export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  margin-bottom: 5px;
`;
export const WrapPlaceHolder = styled.div`
  width: fit-content;
  font-weight: 500;
  font-size: 18px;
  color: #a5a5a5;
  padding-left: 15px;
`;

export const WrapDate = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #223367;
  padding-left: 15px;
`;
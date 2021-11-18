import styled from "styled-components"
import { device } from "styles/device"

export const WrapInputs = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
  }

`;
export const Container=styled.div`
 width: 100%;
    height: 100%;
`
export const Form = styled.form`
    background-color: #FFFFFF;
    width: 95%;
    height: 100%;
    padding: 10px 0px;

    border-radius: 14px;

    @media (max-width: ${device.laptop}) {
      padding: 20px 25px;
    }
    @media (max-width: 1150px) {
      padding-right: 0;
    }
    overflow: hidden;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: #c7c7c7;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
  margin-bottom: 5px;
`;

export const WrapDate = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #223367;
  padding-left: 15px;
`;

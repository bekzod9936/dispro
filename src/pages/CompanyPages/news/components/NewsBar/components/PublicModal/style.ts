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


export const PeriodWrapper = styled.div`
  padding: 30px 40px 25px 30px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  width: max-content;
  height: 400px;
  overflow: auto;
  h5 {
    font-size: 22px;
    color: #223367;
    line-height: 26px;
    margin-bottom: 30px;
  }p {
    color: #C7C7C7;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .startAndEndDate {
    display: flex;
    justify-content: space-between;
  }
  .buttonsWrapper {
    display: flex;
    justify-content: flex-end;

  }
  @media (max-width: ${device.mobile}) {
    box-shadow: none;
    padding: 15px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
    overflow: hidden;
    .startAndEndDate {
      max-width: calc(100vw - 30px);
      width: 100%;
    }
  }
  @media (max-width: 430px) {
    .startAndEndDate {
      flex-direction: column;
    }
  }
`

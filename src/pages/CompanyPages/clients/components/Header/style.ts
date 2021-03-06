import styled from "styled-components";
import { device } from "styles/device";

export const WrapInputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: ${device.mobile}) {
    width: 100%;
    overflow: hidden;
  }
  & > div {
    display: flex;
  }
`;


export const PlanshetHeader = styled.div`
  @media (max-width: ${device.planshet}) {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    flex-direction: row-reverse;
  }
  @media(max-width: ${device.mobile}) {
    flex-direction: column;
    margin-bottom: 0;
  }
`

export const Wrapper = styled.div`
  padding: 0 15px 0 0;
`
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


export const SelectedFilter = styled.div`
  padding: 9px 15px 9px 9px;
  border: 1px solid #C4C4C4;
  border-radius: 46px;
  display: flex;
  width: max-content;
  position: relative;
  margin-bottom: 5px;
  margin-right: 10px;
  p {
    color: #223367;
    font-size: 14px;
    font-weight: 300;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
  @media (max-width: ${device.mobile}) {
    padding: 6px 10px;
    margin-right: 8px;
    padding-right: 15px;
    p {
      font-size: 12px;
    
    }
  }

`

export const SelectedFilters = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 10px;
`
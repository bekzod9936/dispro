import styled from "styled-components";
import { device } from "styles/device";

export const WrapInputs = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
  }
 
`;
export const WrapInputsMobile=styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
  }
`
export const Container = styled.div`
    width: 100%;
    height: 100%;
`;
export const MobileFlex=styled.div`
  width: 100%;
  height: 100%;
  padding:0px 10px;
  font-size:14px;
`
export const TopMobile=styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding-bottom:10px;


`
export const WrapSelect=styled.div`
margin-top:25px;`;

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
  @media (max-width: ${device.mobile}) {
    font-size: 14px;

  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: 14px;
    padding-left: 5px;
  }
  @media (max-width: 360px) {
     display:none;
    /* font-size: 14px;
    padding-left: 8px; */
    
  }
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

`

export const SelectedFilters = styled.div`
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 10px;
`
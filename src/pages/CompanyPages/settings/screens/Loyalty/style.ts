import styled from 'styled-components';
import { device } from 'styles/device';

export const Container=styled.div`
 padding:20px 0px;
`
export const LeftSide=styled.div`
  padding:0px 10px;
  
  border-right:3px solid #CFD3F9;
  width:30%;
`
export const Toggle=styled.div`
 display:flex;
 padding:20px 0px;
 /* align-items:center; */

`
export const ToggleGroup=styled.div`
  padding:10px 0px;
`
export const ToggleInfo=styled.div`
padding:0 0 0 20px;
  h5{
    font-weight:500;
    font-size:18px;
    color:#223367;
  }
  p{
    padding-top:5px;
    text-align:'center';
    font-weight:300;
    font-size:14px;
    line-height:16px;
    color:#223367;
    max-width:300px;
  }
`
export const PageWrapperFlex = styled.div`
  padding: 20px 30px 0 30px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${device.planshet}) {
    padding-left: 0;
    padding-right: 0;
  }
`;
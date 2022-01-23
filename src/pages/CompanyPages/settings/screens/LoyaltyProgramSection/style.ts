import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as DeleteSvg } from "newassets/icons/delete.svg";
import { ReactComponent as Plus } from "newassets/icons/plus.svg";
import { ReactComponent as Close } from "newassets/icons/close.svg";

export interface IText {
  lineHeight?: string;
  fontSize?: string;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  color?: string;
  marginLeft?: string;
  marginRight?: string;
  marginBottom?: string;
  fontFamily?: string;
  width?:string;
}


export const Text = styled.span<IText>`
 width:${(props:IText)=>props.width ? props.width:'100%'}
  font-size: ${(props: IText) =>
    props.fontSize ? props.fontSize : "16px"} !important;
  font-family: ${(props: IText) =>
    props.fontFamily ? props.fontFamily : "Roboto"};
  margin-right: ${(props: IText) =>
    props.marginRight ? props.marginRight : "0px"};
  color: ${(props: IText) => props.color || "#223367"};
  //position: relative;
  margin-left: ${(props: IText) => (props.marginLeft ? props.marginLeft : "0")};
  margin-bottom: ${(props: IText) =>
    props.marginBottom ? props.marginBottom : "0"};
  font-weight: ${(props: IText) => (props.fontWeight ? props.fontWeight : 700)};

  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    font-size: 15px;
  }
`;

export const WrapperModal = styled.div`
  padding: 25px 45px;
  width: 500px;
  position: relative;
  a {
    text-decoration: none;
  }
  h3 {
    font-size: 22px;
    line-height: 26px;
    margin-bottom: 10px;
    color: #223367;
  }
  p {
    font-size: 18px;
    font-weight: 300;
    color: #223367;
    margin-bottom: 25px;
  }
  @media (max-width: ${device.mobile}) {
    max-width: 300px;
    padding: 20px 12px;
    h3 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
      color: #223367;
    }
    p {
      width: 250px;
      font-size: 14px;
      color: #223367;
      font-weight: 300;
    }
  }
`;

export const CloseIcon = styled(Close)`
  & path {
    fill: #3492ff;
  }
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(96, 110, 234, 0.1);
`;

export const DeleteIcon = styled(DeleteSvg)`
  & path {
    fill: #ff5e68;
  }
  width: 32px;
  height: 34px;
`;
export const LittlePlus = styled(Plus)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(96, 110, 234, 0.1);
`;
export const Container = styled.div`
  padding: 10px 0px 30px 0px;
  display: flex;
  height: auto;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100%;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;
export const ContentGroup = styled.div`
  display: flex;
  justify-content: "flex-start";
  align-items: "center";
`;
export const ContentVariant = styled.div`
  background: #f0f1fd;
  border-radius: 12px;
  max-width: 350px;
  min-width:280px;

  padding: 20px;
  margin: 20px 30px 0px 0px;
  h5 {
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    color: #c7c7c7;
  }
  p {
    margin: 5px 0px;
    color: #223367;
    font-weight: 300;
    font-size: 16px;
  }
  span {
    margin: 5px 0px;
    color: #223367;
    font-weight: 400;
    font-size: 16px;
  }
`;
export const RightSide = styled.div`
  display: flex;
  /* margin: 0px 10px 20px 20px; */
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  /* background: #ffffff; */
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04); */
  border-radius: 14px;
  padding: 0px 20px;
  height: 100%;
  overflow-y: auto;
  overflow-x:hidden;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;
export const RightSideContent=styled.div`
  display: flex;
  margin: 0px 10px 0px 0px;
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04); */
  border-radius: 14px;
  /* @media (min-width: ${device.laptop}) {
    width: 95%;
  } */


`
export const LeftSide = styled.div`
  padding: 0px 10px;
  border-right: 3px solid rgba(96, 110, 234, 0.3);
  min-width: 400px;
  width: 470px;
  max-width: 600px;
  height: 100%;
`;
export const GroupToggle = styled.div`
  display: flex;
  padding: 10px 0px;
`;
export const ToggleInfo = styled.div`
  padding: 0px 20px;
  width: 380px;
  h5 {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #223367;
    text-align: center;
    display: flex;
  }
  p {
    padding: 5px 0px;
    display: flex;
    max-width: 400px;
    justify-content: center;

    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #223367;
  }
`;
export const Form = styled.form`
  display: flex;
  
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  padding: 10px 20px 10px 30px;
  border-radius: 14px;
`;
export const Title = styled.div`
  padding: 10px 0px;
  h5 {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #223367;
    display: flex;
  }
  p {
    padding: 5px 0px;
    display: flex;
    max-width: 400px;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #223367;
  }
`;
export const TitleForm = styled.div`
  padding: 10px 0px 12px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;
export const NestedTitleForm = styled.div`
  padding: 10px 0px;
  display: flex;
  
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;
export const TitleFormChild = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: baseline;
  align-items: center;
  height: 100%;
`;
export const TitleInsideFormChild = styled.div`
  padding: 15px 0px 10px 0px;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  display:flex;
  width:580px;
  flex-wrap: wrap;
     
`;
export const TitleInsideFormChildMore = styled.div`
  padding: 10px 0px;
  display:flex;
  /* flex-basis: 50%; */
  align-items: center;
  height: 100%;
`;
export const PercentDiv = styled.div`
  padding-right: 10px;
`;
export const IconStyle = styled.div`
  margin: 20px 0px 0px 25px;
  cursor: pointer;
`;
export const IconStyleMain=styled.div`
margin: 20px 0px 0px 20px;
  cursor: pointer;
`
export const LocalyPayment = styled.div`
  padding: 10px 0px;
`;
export const SubmitButton = styled.div`
  padding-top: 25px;
`;
export const MainDynamicGroup = styled.div`
  padding-left: 80px;
  display: flex;
  justify-content: center;
  align-content: "center";
`;
export const DynamicGroup = styled.div`
  display: flex;
  justify-content: center;
  align-content: "center";
`;
export const DynamicLabel = styled.div`
  font-size: 16px;
  color: #a5a5a5;
  padding: 15px 10px 0px 10px;
`;
export const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ModalBody = styled.div`
  text-align: left;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const LoyalDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  span.MuiTypography-body1 {
    font-weight: normal !important;
    font-size: 14px !important;
    color: #223367 !important;
    text-transform: none;
  }
`;
export const BtnContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
`;

export const WrapSpinner = styled.div`
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
  margin-top: 200px;
  @media (min-width:${device.mobile})and (max-width: ${device.planshet}) {
    padding: 200px 0 0 10px;
  }
  @media (max-width: ${device.mobile}) {
    padding: 150px 0 0 10px;
  }
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    appearance: none;
    display: none;
  }

  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
`;

export const WrapModalPaygo = styled.div`
  padding: 30px 50px 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const EText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 150%;
  color: #223367;
  margin-top: 40px;
  text-align: center;
`;

export const IconWord = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #c7c7c7;
  padding-right: 20px;
`;

export const IconHover=styled.div`
width: 20px;
height: 20px;
position:relative;
border-radius:50%;
background:rgba(96, 110, 234, 0.1);
`
export const IconHoverElement=styled.div`
height:100%;
display:flex;
justify-content:center;
align-Items:center;
`

export const HoverMainAdd=styled.div`
width: 46px;
height: 46px;
background: rgba(96, 110, 234, 0.1);
border-radius: 8px;
`
export const HoverMainIcon=styled.div`
display:flex;
justify-content:center;
align-items:center;
height:100%;
`

export const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content:center;

  align-items: center;
  .upside {
    @media (max-width: 347px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  }
`
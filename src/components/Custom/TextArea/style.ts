import styled from "styled-components";
import { InputAdornment } from '@material-ui/core';
import { device } from '../../../styles/device';
import { ReactComponent as TextArea } from 'assets/icons/IconsInfo/textarea.svg';
import Textt from 'assets/icons/IconsInfo/textarea.svg';
import defaultImage from "assets/images/textarea.jpg";
export interface ITextAreaProps {
    width?: string,
    border?: string,
    color?: string,
    fontSize?: string,
    borderRadius?: string,
    margin?: string,
    padding?: string,
    maxWidth?: string,
    height?: string,
    minHeight?: string,
    maxHeight?:string,
    resize?: string,
    required?:boolean,
    outline?: string,
    error?: boolean
    focus?: {
        border?: string,

    }
}
export interface ILabelProps {
    fontSize?: string,
    color?: string,
    fontWeight?: string,
    margin?: string,
    padding?: string,
    textAlign?: string
}

export interface IContainerProps {
    margin?: string,
    maxWidth?: string,
    width?: string
} 


export const Label = styled.label`
    color: ${({color}: ILabelProps) => color || "#C7C7C7"};
    font-size: ${({fontSize}: ILabelProps) => fontSize || "16px"};
    font-weight: ${({fontWeight}: ILabelProps) => fontWeight || "700"};
    margin: ${({margin}: ILabelProps) => margin || "0 0 10px 0"};
    padding: ${({padding}: ILabelProps) => padding || "0px"};
    text-align: ${({textAlign}: ILabelProps) => textAlign || "start"};

`


export const MTextArea = styled.textarea`
    z-index:14;
    border: ${({ error }: ITextAreaProps) => error ? "1px solid red" : "1px solid #C2C2C2;"};
    color: ${({ color }: ITextAreaProps) => color || "#223367"};
    resize: ${({resize}: ITextAreaProps) => resize || "none"};
    box-sizing: border-box;
    border-radius: ${({borderRadius}: ITextAreaProps) => borderRadius || "14px"};
    margin: ${({margin}: ITextAreaProps) => margin || "0"};
    padding: ${({padding}: ITextAreaProps) => padding || "15px"};
    font-family: "Roboto", sans-serif;
    font-size: ${({fontSize}: ITextAreaProps) => fontSize || "16px"};
    max-width: ${({maxWidth}: ITextAreaProps) => maxWidth || "100%"};
    width: ${({width}: ITextAreaProps) => width || "100%"};
    height: ${({height}: ITextAreaProps) => height || "100%"};
    min-height: ${({minHeight}: ITextAreaProps) => minHeight || "none"};
    max-height: ${({maxHeight}: ITextAreaProps) => maxHeight || "none"};
    outline: ${({outline}: ITextAreaProps) => outline || "none"};
   
    &::-webkit-resizer {
     
      background-image: url(${defaultImage});
         /* background-image: url(${Textt}); */
        height:20px;
   
        width:20px; 
        background-color:'red';
     
    }
    &::-webkit-scrollbar {
  width:20px;
}
    /* &:focus {
        border: ${({focus}: ITextAreaProps) => focus?.border || "1px solid #C2C2C2;"};
    } */

`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: ${({margin}: IContainerProps) => margin || "25px 0"};
    width: ${({width}: IContainerProps) => width || "100%"};
    max-width: ${({maxWidth}: IContainerProps) => maxWidth || "100%"};
    resize: ${({resize}: ITextAreaProps) => resize || "none"};
`



export const Message = styled.div`
  position: absolute;
  top: 100%;
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  display: flex;
  margin-top: 5px;
  font-size:16px;

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size:14px;
  }  
`;


export const Icons = styled.div`
   color: #606eea !important;

    width: 100%;
    position: absolute;
    padding-left: 10px;
    bottom:10%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    font-size: '16px' !important;
    font-weight: '500' !important;
    color: '#223367' !important;
    @media (max-width: ${device.mobile}) {
      font-size: '14px'!important;
    }
    @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
      font-size: 14px !important;
    }


`;

export const WrapArea = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  margin: 65px 10px 0 0;
  @media (max-width: ${device.mobile}) {
    margin: 130px 5px 0 0;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    margin: 30px 10px 0 0;
  }
  @media (min-width: ${device.laptop}) {
    margin: 90px 10px 0 0;
  }
`;
export const TextAreaIcon = styled(TextArea)`
display:'flex';
flex-direction:column;
position: relative;

`;
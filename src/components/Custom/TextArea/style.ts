import styled from "styled-components";
import { device } from '../../../styles/device';
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
    border: ${({ border }: ITextAreaProps) => border || "1px solid #C2C2C2;"};
    
    color: ${({ color }: ITextAreaProps) => color || "#223367"};
    resize: ${({resize}: ITextAreaProps) => resize || "none"};
    
    box-sizing: border-box;
    border-radius: ${({borderRadius}: ITextAreaProps) => borderRadius || "14px"};
    margin: ${({margin}: ITextAreaProps) => margin || "0"};
    padding: ${({padding}: ITextAreaProps) => padding || "15px"};
    font-family: "Roboto", sans-serif;
    font-size: ${({fontSize}: ITextAreaProps) => fontSize || "16px"};
    max-width: ${({maxWidth}: ITextAreaProps) => maxWidth || "570px"};
    width: ${({width}: ITextAreaProps) => width || "100%"};
    height: ${({height}: ITextAreaProps) => height || "100%"};
    min-height: ${({minHeight}: ITextAreaProps) => minHeight || "none"};
    max-height: ${({maxHeight}: ITextAreaProps) => maxHeight || "none"};
    outline: ${({outline}: ITextAreaProps) => outline || "none"};
    /* position: relative;
    max-height: 500px; */
    /* &::after {
        content: '';
        background: #C2C2C2;
        width: 23px;
        height: 2px;
        z-index: 100;
        position: absolute;
        right: 20px;
        bottom: 20px;
    } */
    &::-webkit-resizer {
        appearance: none;
        display: none;
    }
    &:focus {
        border: ${({focus}: ITextAreaProps) => focus?.border || "1px solid #C2C2C2;"};
    }

`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${({margin}: IContainerProps) => margin || "25px 0"};
    width: ${({width}: IContainerProps) => width || "100%"};
    max-width: ${({maxWidth}: IContainerProps) => maxWidth || "440px"};
`

export const Message = styled.div`
  position: absolute;
  top: 100%;
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  display: flex;
  margin-top: 5px;

  
`;

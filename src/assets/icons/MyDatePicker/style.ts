import styled from "styled-components";
import { IProps } from ".";

export const Wrapper = styled.div`
    max-width: ${({maxWidth}: IProps) => maxWidth || "none"};
    width: ${({width}: IProps) => width || "100%"};
    margin: ${({margin}: IProps) => margin || "0 0 25px 0"};
    input {
        border-radius: 14px;
        border: 1px solid #C2C2C2;
        box-sizing: border-box;
        padding: 16px 25px;
        opacity: 0;
        position: absolute;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
`
import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
        font-size: 18px;
        line-height: 21px;
        color: #223367;
        margin-top: 15px;
    }
    @media(max-width: ${device.mobile}) {
        p {
            text-align: center;
            font-size: 14px;
            line-height: 16.41px;
            
        }
    }
`
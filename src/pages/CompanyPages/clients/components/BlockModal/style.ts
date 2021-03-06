import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.form`
    padding: 30px 40px;
    width: 520px;
    header {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 8px;
        svg {
            cursor: pointer;

        }
        h3 {
            font-size: 22px;
            line-height: 25px;
            color: #223367;
        }
    }
    p.infoText {
        font-size: 14px;
        line-height: 16px;
        font-weight: 300;
        color: #223367;
        width: 272px;
        margin-bottom: 30px;
    }
    .buttons {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-end;
        @media (max-width: ${device.planshet}) {
            justify-content: center;
        }
    }
    .clientInfo {
        
    }
`
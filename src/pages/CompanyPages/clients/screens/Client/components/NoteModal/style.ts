import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    padding: 30px 40px 25px 40px;
    max-width: 520px;
    width: 100%;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 30px;
        h3 {
            font-size: 22px;
            color: #223367;
        }

    }
    .buttons {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    @media (max-width: ${device.planshet}) {
        padding: 20px 25px;
    }
    @media (max-width: ${device.mobile}) {
        padding: 20px 15px;
        max-width: none;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .header {
            margin-bottom: 13px;
            h3 {
                font-size: 16px;
                line-height: 18.75px;
            }
        }
        .buttons {
            justify-content: center;
        }
    }
`
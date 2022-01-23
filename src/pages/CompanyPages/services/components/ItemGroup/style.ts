import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    background-color: #fff;
    border-radius: 14px;
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    overflow: hidden;

    .header {
        padding-left: 25px;
        height: 50px;
        display: flex;
        align-items: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);

        h4 {
            font-size: 18px;
            line-height: 21.09px;
            color: #A3A3A3;
            font-weight: 500;
        }
    }

    @media (max-width: ${device.laptop}) {
        .header {
            padding-left: 15px;
        }
    }
`
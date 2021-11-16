import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    margin-left: 35px;
    height: 100%;
    @media (max-width: ${device.planshet}) {
        margin-left: 0;
    }
`
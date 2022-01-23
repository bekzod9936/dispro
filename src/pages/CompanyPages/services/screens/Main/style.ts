import styled from "styled-components";
import { device } from "styles/device";


export const Wrapper = styled.div`
    padding: 30px 0 0 35px;
    height: 100%;

    @media (max-width: ${device.laptop}) {
        padding: 20px 0 0 25px;
    }
`


export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 50px;
    justify-content: space-between;

    @media (max-width: ${device.laptop}) {
        margin-top: 30px;
    }
`



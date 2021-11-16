import styled from "styled-components";
import { device } from "styles/device";

interface IRightSide {
    isCreating: boolean
}
export const Container = styled.div`
    display: flex;
    height: 100%;
    @media (max-width: ${device.planshet}) {
        flex-direction: column;

    }
`


export const Wrapper = styled.div`
    padding: 30px 0 30px 35px;
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    @media (max-width: ${device.mobile}) {
        padding: 13px 0 13px 15px;
        position: static;
        height: 95%;
    }
`

export const Header = styled.div`
    margin-bottom: 45px;
    @media (max-width: ${device.mobile}) {
        margin-bottom: 13px;
    }

`
export const RightSide = styled.div`
    height: ${({ isCreating }: IRightSide) => isCreating ? "100%" : "80%"};
    border-left: ${({ isCreating }: IRightSide) => !isCreating ? "3px solid rgba(96, 110, 234, 0.3)" : "none"};
    flex: 1;
    /* padding-bottom: 100px; */
    @media (max-width: ${device.planshet}) {
        border: none;
    }
`
export const LeftSide = styled.div`
    margin-right: 45px;
    @media (max-width: ${device.laptop}) {
        margin-right: 15px;
    }
    @media (max-width: ${device.mobile}) {
        margin: 0;
    }
`

import styled from "styled-components";
import { device } from "styles/device";

interface IRightSide {
    isCreating: boolean
}
export const Container = styled.div`
    display: flex;
    @media (max-width: ${device.planshet}) {
        flex-direction: column;

    }
`


export const Wrapper = styled.div`
    padding: 30px 35px;
`

export const Header = styled.div`
    margin-bottom: 45px;

`
export const RightSide = styled.div`
    min-height: 500px;
    border-left: ${({isCreating}: IRightSide) => !isCreating ? "3px solid rgba(96, 110, 234, 0.3)" : "none"};
    flex: 1;

`
export const LeftSide = styled.div`
    margin-right: 45px;
`

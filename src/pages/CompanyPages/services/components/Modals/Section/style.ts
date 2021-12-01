import styled from "styled-components";
import { ReactComponent as ExitSvg } from "assets/icons/exit.svg"


export const Wrapper = styled.div`
    max-width: 520px;
    width: 100%;
    padding: 30px 40px;
`

export const Header = styled.div`
    width: 100%;
    margin-bottom: 30px;

    .nav {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        h1 {
            color: #223367;
            font-size: 22px;
            line-height: 25.78px;
        }
    }

    p {
        font-size: 14px;
        line-height: 16.41px;
        color: #223367;
        font-weight: 300;
    }
`
export const Main = styled.div`
    margin-bottom: 30px;
    max-height: 250px;
    overflow-y: auto;
`
export const Footer = styled.div`

`
//icons
export const CloseIcon = styled(ExitSvg)``
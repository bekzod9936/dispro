import styled from "styled-components";

interface IStyleProps {
    isOpen: "hide" | "show" | "fullShow"
    border?: boolean
}
export const Wrapper = styled.div`
    border-radius: ${({ border }: IStyleProps) => border ? "0" : "12px 12px 0 0"};
    background-color: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000 !important;
    transition: 500ms all;
    transform: ${({ isOpen }: IStyleProps) => isOpen === "show" ? "translateY(calc(100vh - 46px))" : isOpen === "fullShow" ? "translateY(0)" : "translateY(100%)"};
    `
export const Header = styled.div`
    padding: 15px;
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
`

export const Content = styled.div`
    margin-top: 10px;
    padding: 0 15px 15px 15px;
    display: flex;
    flex-wrap: wrap;
    div.client {
        padding: 8px;
        border: 1px solid #C4C4C4;
        box-sizing: border-box;
        border-radius: 46px;
        height: max-content;
        margin: 4px;
        display: flex;
        align-items: center;
        p {
            font-size: 12px;
            line-height: 14px;
            font-weight: 300;
            color: #223367;
            margin-right: 8px;
        }
    }
`;
export const Footer = styled.div`
    flex: 0 0 auto;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    div.vipProcent {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        h6 {
            font-size: 16px;
            line-height: 18.75px;
            color: #223367;
            font-weight: 300;
            margin-right: 15px;
        }
    }
    button.customButton {
        outline: 0;
        border: 0;
        background: transparent;
        color: #3492FF;
        font-size: 16px;
        line-height: 18.75px;
        margin-bottom: 25px;
    }
`
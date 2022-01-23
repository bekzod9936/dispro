import styled from "styled-components";



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
    align-items: center;
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        .toggler {
            display: flex;
            align-items: center;
            h6 {
                font-size: 16px;
                line-height: 18.75px;
                color: #223367;
                font-weight: 300;
                margin-right: 15px;
            }
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

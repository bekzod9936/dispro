import styled from "styled-components";
interface IWrapper {
    isOpen: boolean
    top: boolean
}
export const Wrapper = styled.div`
    transition: 200ms all;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 2001;
    background-color: #ffffff;
    transform: ${({ isOpen }: IWrapper) => !isOpen ? "translateX(100%)" : ""};
    padding: 20px;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 13px;
    h5 {
        font-size: 16px;
        line-height: 18.75px;
        color: #223367;

    }
`
export const Subtitle = styled.p`
    font-size: 14px;
    line-height: 16px;
    color: #223367;
    margin-bottom: 13px;
    width: 80%;
`

export const Client = styled.div`
margin-bottom: 15px;
    h6 {
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 8px;
        color: #A5A5A5;
        font-weight: 400;

    }
    p {
        font-size: 14px;
        line-height: 16.41px;
        color: #223367;
        font-weight: 300;
        span {
            margin-left: 15px;
        }
    }
`

export const MyForm = styled.form`
    div.downSide {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        position: absolute;
        bottom: 20px;
    }
`


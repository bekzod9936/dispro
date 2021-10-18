import styled from "styled-components";
interface IProps {
    isOpen: boolean
}
export const Wrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    max-width: 320px;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: 20;
    transition: 200ms all;
    transform: ${(props: IProps) => (props.isOpen ? "translateX(0)" : "translateX(100%)")};
`


export const Container: any = styled.div`
    padding: 15px 25px;
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: -5px 2px 20px rgba(0, 0, 0, 0.06);
`


export const CancelButton = styled.div`
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    transition: 200ms all;
    &:hover {
        transform: scale(1.1, 1.1)
    }
`

export const Content = styled.div`
    h4 {
        color: #223367;
        font-size: 18px;
        margin-bottom: 25px;
    }
    p {
        color: #223367;
        font-size: 16px;
        margin-bottom: 35px;
    }
`

export const QrBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        margin-bottom: 80px;
        font-size: 22px;
        color: #223367;
        font-weight: 500;
    }
    span {
        font-size: 16px;
        font-weight: 700;
        color: #C7C7C7;
        margin-bottom: 15px;
    }
    button {
        outline: 0;
        border: 0;
        font-size: 18px;
        font-weight: 500;
        color: #606EEA;
        background: transparent;
        cursor: pointer;
        transition: 200ms all;
        &:hover {
            transform: scale(1.1, 1.1)
        }
    }
`
export const LinkBtn = styled.div`
    padding: 18px 22px;
    border: 1px solid #C2C2C2;
    border-radius: 14px;
    color: #A5A5A5;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 42px;

`
export const QrCode = styled.div`
    text-align: center;
    width: 150px;
    height: 150px;
    border-radius: 14px;
    background: black;
    margin-bottom: 25px;
`
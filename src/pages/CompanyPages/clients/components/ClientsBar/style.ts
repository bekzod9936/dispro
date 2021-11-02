import styled from "styled-components"

export const Text = styled.p`
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 25px;
    color: #223367;
`
export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`
export const Wrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 25px;

`
export const SelectButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        outline: none;
        border: none;
        color:#3492FF;
        font-size: 18px;
        font-family: "Roboto", sans-serif;
        line-height: 21px;
        margin-bottom: 21px;
        background-color: transparent;
        cursor: pointer;
    }
`
export const AddInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
        p {
            font-weight: 700;
            color:#C7C7C7;
            font-size: 18px;
            margin-bottom: 15px;
        }
        span {
            font-size: 18px;
            color: #223367;
            font-weight: 700;
            line-height: 21px;
        }
    }
`
export const Content = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    img {
        width: 62px;
        height: 62px;
        border-radius: 14px;
        margin-right: 30px;
        
    }
`
export const DefaultImage = styled.div`
    background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
    height: 62px;
    width: 62px;
    border-radius: 14px;
    margin-right: 30px;
    display: block;
`

export const ContentInfo = styled.div`
    p {
        font-size: 18px;
        font-weight: 700;
        color: #223367;
        line-height: 25px;
        margin-bottom: 10px;
    }
    span {
        color: #223367;
        font-size: 16px;
        font-weight: 300;
        line-height: 18px;

    }
`
export const SubContent = styled.div`
    p {
        font-size: 14px;
        color: #223367;
        font-weight: 300;
        line-height: 16px;
        margin-bottom: 20px;

    }
`

export const Buttons = styled.div`
    margin-bottom: 50px;
`

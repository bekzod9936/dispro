import styled from "styled-components";

interface IProps {
    disabled?: boolean
}

export const Wrapper = styled.div`
    max-width: 460px;
    width: 100%;
    padding: 15px 25px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    margin: 0 15px;
    min-height: inherit;

`
export const UpSide = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h4 {
        font-size: 16px;
        line-height: 18.75px;
        color: #C7C7C7;

    }
    button {
        outline: none;
        border: none;
        color: ${({disabled}: IProps) => disabled ? "#C7C7C7" : "#3492FF"};
        font-weight: 300;
        font-size: 16px;
        line-height: 18.75px;
        background: transparent;
        font-family: "Roboto", sans-serif;
        cursor: ${({disabled}: IProps) => disabled ? "not-allowed" : "pointer"};
    }
`

export const DownSide = styled.div`
    b {
        font-size: 16px;
        line-height: 18px;
        color: #FF5E68;
        font-weight: 300;
        margin-bottom: 10px;
    }
    p {
        font-size: 16px;
        font-weight: 300;
        line-height: 18.75px;
        color: #223367;
        span {
            color: #3492FF;
        }
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
    .changeStatus {
        display: flex;
        align-items: center;
        
    }
`

export const Note = styled.p`
    font-size: 16px;
    line-height: 18.75px;
    color: #223367;
    button {
        outline: none;
        border: none;
        color: #3492FF;
        font-weight: 300;
        font-size: 16px;
        line-height: 18.75px;
        background: transparent;
        font-family: "Roboto", sans-serif;
        cursor: pointer;
    }
`


export const NoteView = styled.div`
    padding: 30px 40px 25px 40px;
    max-width: 520px;
    width: 100%;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
        h3 {
            font-size: 22px;
            color: #223367;
        }
        
    }
    p {
        font-size: 16px;
        line-height: 18.75px;
        margin-bottom: 30px;
        color: #223367;
        width: 100%;
        overflow: hidden;
    }
    .buttons {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
`
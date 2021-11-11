import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 460px;
    width: 100%;
    height: 100%;
    padding: 15px 25px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    margin: 0 15px;
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
        color: #3492FF;
        font-weight: 300;
        font-size: 16px;
        line-height: 18.75px;
        background: transparent;
        font-family: "Roboto", sans-serif;
        cursor: pointer;
    }
`

export const DownSide = styled.div`
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
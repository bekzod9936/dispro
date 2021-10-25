import styled from "styled-components";

export const Wrapper = styled.div`
    padding-right: 45px;
`

export const Container = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    padding: 50px 0 50px 80px;
    overflow: auto;
    display: flex;
    justify-content: space-between;
`

export const Right = styled.div`
    width: 45%;
    h5 {
        font-size: 16px;
        line-height: 18.75px;
        color: #223367;
        margin-bottom: 25px;

    }
    h6 {
        font-size: 16px;
        line-height: 18.75px;
        color: #C7C7C7;
        margin-bottom: 10px;
    }
    p {
        width: 100%;
        padding: 20px 30px;
        color: #223367;
        border-radius: 14px;
        background-color: #F5F5F5;
        margin-bottom: 25px;
    }

`
export const Left = styled.div`
    width: 45%;
    h6 {
        font-size: 16px;
        line-height: 18.75px;
        color: #C7C7C7;
        margin-bottom: 10px;
    }
    p {
        color: #223367;
        font-size: 14px;
        font-weight: 300;
        line-height: 16.5px;
        &:not(:last-child) {
            margin-bottom: 9px;
        }
    }
`
import styled from "styled-components";

export const Wrapper = styled.form`
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

`

export const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    h2 {
        color: #223367;
        font-size: 16px;
        line-height: 18.75px;
        
    }

`

export const Inputs = styled.div`

`

export const UpSide = styled.div`
    p.subtitle {
        font-size: 14px;
        line-height: 16.41px;
        color: #223367;
        font-weight: 300;
        margin-bottom: 10px;
    }
`

export const ClientInfo = styled.div`
    margin-bottom: 25px;
    p.label {
        font-size: 14px;
        line-height: 16.41px;
        color: #A5A5A5;
        margin-bottom: 8px;
    }
    span {
        font-size: 14px;
        line-height: 16.41px;
        color: #223367;
        font-weight: 300;
        margin-right: 15px;
    }
    b {
        font-size: 14px;
        line-height: 16.41px;
        color: #223367;
        font-weight: 300;
    }
`


export const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
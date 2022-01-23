import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 6px 0;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    
    width: 100%;
`

export const Content = styled.div`
    padding: 10px 15px;
    display: flex;
    align-items: center;
    overflow: hidden;
    &:nth-child(odd) {
        background-color: rgba(96, 110, 234, 0.1);
    }
`

export const LeftSide = styled.div`
    margin-right: 15px;
    img {
        width: 40px;
        height: 40px;
        display: block;
        border-radius: 14px;
    }
`
export const RightSide = styled.div`
    h5 {
        font-size: 16px;
        line-height: 18px;
        font-weight: 500;
        color: #223367;
        margin-bottom: 5px;
    }
    p {
        font-size: 14px;
        line-height: 16px;
        color: #223367;
        font-weight: 300;
    }
`
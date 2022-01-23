import styled from "styled-components";

export const Wrapper = styled.div`
    width: 300px;
    min-height: 220px;
    
    z-index: 2006;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background: white;
    border-radius: 14px;
    padding: 0 30px 25px 30px;
    img {
        top: 150px;
        position: absolute;

    }
    p {
        font-size: 14px;
        color: #223367;
        margin-bottom: 30px;
        text-align: center;
    }
`

export const OutSideWrapper = styled.div`
    height: 100vh;
    width: 100%;
    background-color: transparent !important;
    position: relative;
    display: flex;
    align-items: center;
`
import styled from "styled-components";

export const ResetModalWrapper = styled.div`
padding: 15px 15px 20px 15px;
.header {
    h4 {
        color: #223367;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
        line-height: 18.75px;
    }
    p {
        font-weight: 300;
        line-height: 16.41px;
        font-weight: 300;
        font-size: 14px;
        color: #223367;
        margin-bottom: 20px;
    }
}
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        font-size: 14px;
        line-height: 16.41px;
        margin-bottom: 5px;
        color: #C4C4C4;
        font-weight: 700;
    }
    span {
        color: #606EEA;
        font-size: 16px;
        font-weight: 700;
        line-height: 18.75px;
    }
    svg {
        transform: rotate(90deg);
        margin: 17px 0
    }
}
.footer {
    display: flex;
    align-items: center;
    margin-top: 30px;
    justify-content: center;
}
`
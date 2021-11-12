import styled from "styled-components";

export const RemoveWrapper = styled.div`
    width: 290px;
    padding: 15px;
    h4 {
        font-size: 16px;
        line-height: 18px;
        font-weight: 500;
        color: #223367;
        margin-bottom: 10px;

    }
    p {
        font-size: 14px;
        line-height: 16px;
        color: #223367;
        margin-bottom: 20px;
        font-weight: 300;
    }
    .status {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 13px;
        b {
            font-size: 14px;
            line-height: 16px;
            font-weight: 700;
            color: #C4C4C4;
            margin-bottom: 5px;
        }
        span {
            font-weight: 700;
            color:#606EEA;
            font-size: 16px;
            margin-bottom: 17px;
        }
        svg {
            transform: rotate(90deg);
            margin-bottom: 17px;
        }
    }
    .buttons {
        display: flex;
    }
`
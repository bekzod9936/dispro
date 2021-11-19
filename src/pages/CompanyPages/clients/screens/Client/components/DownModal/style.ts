import styled from "styled-components";

export const Modal = styled.div`
    position: absolute;
    background: #FFFFFF;
    box-shadow: 0px 0px 6px 4px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    bottom: 15px;
    height: 100px;
    right: 15px;
    left: 15px;
    z-index: 10;
    padding: 28px 0 28px 30px;
    min-height: 120px;
    p {
        font-size: 16px;
        line-height: 18.75px;
        color: #223367;
        &:not(:last-child) {
            margin-bottom: 24px;
        }
    }
    p.disabled {
        color: #C4C4C4;
    }
`
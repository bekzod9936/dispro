import styled from "styled-components"

export const Status = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 45px;
    div.child {
        p {
            font-size: 16px;
            line-height: 18px;
            color: #C4C4C4;
            font-weight: 700;
            margin-bottom: 7px;
        }
        b {
            font-size: 18px;
            line-height: 21px;
            color: #606EEA;
            font-weight: 700;
        }
    }
`
export const Wrapper = styled.form`
    padding: 30px 40px 25px 40px;
    width: 520px;
    div.header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 25px;
        h3 {
            font-size: 22px;
            line-height: 25.78px;
            color: #223367;
            max-width: 390px;
            width: 100%;
        }
        svg {
            cursor: pointer;
            height: 18px;
            width: 18px;
        }
    }
    div.content {
        margin-bottom: 25px;
        h5 {
            font-size: 18px;
            line-height: 21px;
            color: #223367;
            font-weight: 500;
        }
        p.client {
            font-size: 18px;
            font-weight: 500;
            line-height: 21.09px;
            b {
                color: #C4C4C4;
                margin: 0 20px;
            }
            span {
                font-size: 14px;
                line-height: 16.41px;
                color: #C4C4C4;
            }
        }
        p.amount {
            margin-bottom: 15px;
        }
        p.info {
            font-size: 18px;
            line-height: 21px;
            color:#223367;
            font-weight: 300;
        }
    }
    div.buttons {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }
`
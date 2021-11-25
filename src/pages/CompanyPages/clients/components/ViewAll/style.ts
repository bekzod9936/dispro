import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    div.main {
        padding: 20px 40px;
        div.header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 60px;
            .left {
                display: flex;
                align-items: center;
                h3 {
                    font-size: 22px;
                    color: #223367;
                    margin-left: 20px;
                }
                svg {
                    @media (max-width: ${device.planshet}) {
                        width: 13px;
                        height: 20px;
                    }
                }
            }
            h4 {
                font-size: 18px;
                line-height: 21px;
                color: #223367;
                font-weight: 400;
            }
        }
        div.content {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .client {
                border: 1px solid #C4C4C4;
                box-sizing: border-box;
                border-radius: 46px;
                margin-right: 9px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                padding: 9px 10px;
                span {
                    font-size: 14px;
                    color: #223367;
                    margin-right: 8px;
                    font-weight: 300;
                    line-height: 16.41px;
                }
                svg {
                    cursor: pointer;
                    transform: translateY(-1px);
                }
            }
        }
    }
`
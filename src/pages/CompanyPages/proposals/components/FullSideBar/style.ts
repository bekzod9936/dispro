import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px 15px 15px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .content {
        display: flex;
        align-items: center;
        img {
            width: 50px;
            height: 50px;
            border-radius: 14px;
            margin: 0 15px;
            object-fit: cover;
        }
        .subContent {
            h4 {
                font-size: 16px;
                color: #223367;
                font-weight: 500;
                line-height: 18.75px;
                margin-bottom: 5px;
            }
            h5 {
                font-size: 14px;
                line-height: 16.41px;
                font-weight: 300;
                color: #223367;
            }
        }
    }
`

export const Main = styled.div`
    h3 {
        color: #C7C7C7;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 15px;
    }
    p.description {
        height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        font-size: 14px;
        line-height: 16px;
        color: #223367;
        margin-bottom: 25px;
        width: 100%;
    }
    ul {
        li {
            margin-bottom: 10px;
            font-weight: 300;
            color: #223367;
            font-size: 14px;
            line-height: 16.41px;
            list-style: none;
        }
    }
`

export const Footer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
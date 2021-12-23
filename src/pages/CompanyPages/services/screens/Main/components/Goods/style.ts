import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 100%;
`

export const Container = styled.div`
    width: 100%;
    margin-left: 50px;
    overflow: auto;
    height: calc(100vh - 41%);
    padding-right: 30px;

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #606eea;
        border-radius: 14px 0px 0px 14px;
    }
`
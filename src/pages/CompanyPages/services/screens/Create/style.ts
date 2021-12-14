import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 30px 60px 25px 45px;
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 7px;
    }
    
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #606eea;
      border-radius: 14px 0px 0px 14px;
    }

`

export const Form = styled.form`
    width: 100%;
    background-color: #fff;
    border-radius: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: center;
    height: max-content;
`

export const Container = styled.div`
    max-width: 800px;
    width: 100%;
    padding: 30px 0 60px 0;
    height: max-content;

`







//icons 

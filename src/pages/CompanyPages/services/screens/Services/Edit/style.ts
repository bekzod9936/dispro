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
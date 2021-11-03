import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 30px;
    width: 100%;
    height: 100%;
    overflow: auto;
    ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`

export const UpSide = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    height: 205px;
    margin-bottom: 30px;
`

export const MiddleSide = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    max-width: 1250px;
    width: 100%;
    margin-bottom: 20px;
`

export const DownSide = styled.div`
    width: 100%;
`
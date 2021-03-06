import styled from "styled-components";
import { device } from "styles/device";

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  margin: 20px 0;
`;

export const Body = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-grow: 1;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
  & > div {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 25px;
    height: fit-content;
  }
`;

export const WrapList = styled.div`
  padding: 15px 0;
  & > ul {
    list-style: none;
    & > li {
      padding: 15px 20px;
      cursor: pointer;
      font-weight: normal;
      font-size: 16px;
      color: #223367;
      &:hover {
        background: #eff0fd;
      }
    }
  }
`;

export const ModalTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: #223367;
  max-width: 400px;
`;

export const ModalText = styled.div`
  font-weight: normal;
  font-size: 18px;
  color: #223367;
  max-width: 410px;
  word-break: break-word;
  margin-top: 15px;
`;

export const ModalWrap = styled.div`
  padding: 30px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 500px;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

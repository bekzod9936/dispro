import styled from "styled-components";
import { device } from "styles/device";

export const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  padding: 8px 8px 20px 20px;
  width: fit-content;
  max-width: 490px;
  max-height: 200px;
`;

export const BoxTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #223367;
  display: flex;
  flex-wrap: wrap;
  word-break: break-word;
  padding: 10px 0;
  span {
    margin-right: 10px;
  }
`;

export const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BoxBody = styled.div`
  display: flex;
`;

export const WrapList = styled.div`
  padding: 15px 0;

  ul {
    list-style: none;
    li.delete {
      color: #ff5e68 !important;
    }
    li {
      padding: 15px 20px;
      cursor: pointer;
      font-weight: normal;
      color: #223367 !important;
      font-size: 16px;
      &:hover {
        background: #eff0fd;
      }
    }
  }
`;

export const WrapButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-gap: 15px;
  margin-left: 30px;
`;

export const WrapButtonsDelete = styled.div`
  display: flex;
  justify-content: center;
`;

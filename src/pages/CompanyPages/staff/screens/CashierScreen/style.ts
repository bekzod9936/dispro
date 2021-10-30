import styled from "styled-components";

export const CashierDiv = styled.div`
  margin-top: 50px;
  padding-right: 40px;
  position: relative !important;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  width: 480px;
`;

export const Break = styled.div`
  height: 20px;
`;

export const ModalContent = styled.div`
  padding: 30px 40px;
  overflow-y: auto;
`;

export const ModalMain = styled.div`
  padding: 30px 40px;
  overflow-y: auto;
  width: 580px;

  scroll-behavior: auto;

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
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

interface IMAction {
  justifyContent?:
    | "space-between"
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around";
  mTop?: number;
}

export const ModalAction = styled.div`
  display: flex;
  justify-content: ${({ justifyContent = "flex-end" }: IMAction) =>
    justifyContent};
  align-items: center;
  margin-top: ${({ mTop = 1 }: IMAction) => mTop + "px"};
`;

export const ModalHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ModalTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */

  color: #223367;
`;

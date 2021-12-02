import styled from "styled-components";

export const ModalContent = styled.div`
  padding: 20px 25px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const ModalHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  color: #223367;
  font-size: 20px;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalText = styled.p`
  color: #223367;
  font-size: 16px;
  font-weight: 400;
`;

export interface IAction {
  aItems?: "center" | "flex-start" | "flex-end";
  jItems?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
}

export const ModalAction = styled.div`
  display: flex;
  align-items: ${({ aItems = "flex-end" }: IAction) => aItems};
  justify-content: ${({ jItems = "flex-end" }: IAction) => jItems};
  gap: 15px;
`;

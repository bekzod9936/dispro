import styled from "styled-components";

export const CashierDiv = styled.div`
  margin-top: 50px;
  padding-right: 40px;
  position: relative !important;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
`;

export const EmptyRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
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

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ModalAction = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

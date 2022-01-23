import styled from "styled-components";

interface IBreak {
  width?: number;
  height?: number;
}

export const Form = styled.form``;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const FormCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Break = styled.div`
  height: ${({ height }: IBreak) => height + "px"};
  width: ${({ width }: IBreak) => width + "px"};
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
import styled from "styled-components";

export const ManagerDiv = styled.div``;

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

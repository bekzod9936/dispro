import styled from "styled-components";

interface IUsers {
  width?: number;
}

export const ArrowDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const TwoUserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UsersRow = styled.div`
  width: ${({ width = 120 }: IUsers) => `${width}px`};
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const TextContainer = styled.div`
  width: max-content;
  text-align: center;
`;

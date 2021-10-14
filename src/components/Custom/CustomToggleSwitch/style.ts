import styled from "styled-components";

interface Props {
  disabled?: boolean;
}

export const Label = styled.label`
  opacity: ${({ disabled }: Props) => (disabled ? 0.4 : 1)};
`;

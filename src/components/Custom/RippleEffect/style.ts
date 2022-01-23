import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";

interface IProps {
  marginLeft?: number;
  marginRight?: number;
  padding?: number;
}

export const RippleDiv = styled(ButtonBase)`
  margin-right: ${({ marginRight = 10 }: IProps) => `${marginRight}px`};
  margin-left: ${({ marginLeft = 5 }: IProps) => `${marginLeft}px`};
  padding: ${({ padding = 8 }: IProps) => `${padding}px`};
  border-radius: 10px;
`;

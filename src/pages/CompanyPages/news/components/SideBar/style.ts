import styled from "styled-components";

interface IProps {
  isOpen: boolean;
  maxWidth?: string;
}

export const Wrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  padding-top: 50px;
  max-width: ${({ maxWidth }: IProps) => maxWidth || "320px"};
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 20;
  transition: 100ms all;
  transform: ${(props: IProps) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
`;

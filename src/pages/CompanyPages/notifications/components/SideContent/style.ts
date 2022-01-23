import styled from "styled-components";

interface Props {
  open?: boolean;
}

export const SideDrawer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 40%;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 20;
  transition: 500ms all;
  box-shadow: -5px 2px 20px rgba(0, 0, 0, 0.06);
  transform: ${(props: Props) =>
    props.open ? "translateX(0)" : "translateX(100%)"};
`;

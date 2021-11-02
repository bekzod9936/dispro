import styled from "styled-components";
import { device } from "styles/device";

export const Wrapper = styled.div`
  margin-right: 20px;
  @media (max-width: ${device.planshet}) {
    margin: 20px 0;
  }
`;

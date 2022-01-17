import styled from "styled-components";
import { device } from "styles/device";

export const WrapKeyWords = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
  .buttonkey {
    margin-right: 15px;
    margin-bottom: 15px;
  }
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

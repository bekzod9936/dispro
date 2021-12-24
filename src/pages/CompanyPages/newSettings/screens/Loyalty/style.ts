import styled from 'styled-components';
import { device } from 'styles/device';
export const PageWrapperFlex = styled.div`
  padding: 20px 30px 0 30px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${device.planshet}) {
    padding-left: 0;
    padding-right: 0;
  }
`;
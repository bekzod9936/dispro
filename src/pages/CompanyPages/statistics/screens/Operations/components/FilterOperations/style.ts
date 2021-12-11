import styled from 'styled-components';
import { device } from 'styles/device';

export const WrapFilter = styled.div`
  padding-bottom: 20px;
  display: flex;
  @media (max-width: ${device.mobile}) {
    padding-bottom: 15px;
  }
`;

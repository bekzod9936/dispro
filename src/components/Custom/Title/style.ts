import styled from 'styled-components';
import { device } from '../../../styles/device';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  font-style: normal;
  font-weight: bold;
  color: #223367;
  font-size: 20px;

  @media (min-width: ${device.laptop}) {
    font-size: 22px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 18px;
    padding-left: 15px;
  }
`;

import styled from 'styled-components';
import { device } from 'styles/device';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  @media (max-width: ${device.mobile}) {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: space-between;
  }
`;

export const Label = styled.label`
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  color: #223367;
  cursor: pointer;
`;

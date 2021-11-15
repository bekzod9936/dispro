import styled from 'styled-components';
import { device } from '../../../styles/device';

interface Props {
  padding?: {
    mobile?: string;
    planshet?: string;
    laptop?: string;
    desktop?: string;
  };
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  font-style: normal;
  font-weight: bold;
  color: #223367;
  font-size: 20px;
  padding: ${({ padding }: Props) => padding?.laptop} !important;
  @media (max-width: ${device.mobile}) {
    padding: ${({ padding }: Props) => padding?.mobile} !important;
    font-size: 18px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    padding: ${({ padding }: Props) =>
      padding?.planshet ? padding?.planshet : '0 0  0 20px'} !important;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    padding: ${({ padding }: Props) => padding?.laptop} !important;
  }
  @media (min-width: ${device.laptop}) {
    padding: ${({ padding }: Props) => padding?.desktop} !important;
    font-size: 22px;
  }
`;

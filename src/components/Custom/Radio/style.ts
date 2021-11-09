import styled from 'styled-components';
import { device } from '../../../styles/device';
import { RProps, LabelProps } from './types';

export const Container = styled.div`
  span.MuiRadio-colorSecondary.Mui-checked {
    color: #3492ff !important ;
  }
  span.MuiRadio-colorSecondary {
    color: #a5a5a5 !important ;
  }
  legend.MuiFormLabel-root {
    color: #c7c7c7 !important ;
    font-weight: bold !important ;
    font-size: 14px !important ;
  }
  span.MuiTypography-body1 {
    font-weight: 500 !important ;
    font-size: 16px;
    color: #223367 !important ;
    text-transform: capitalize;
  }
  .MuiFormControl-root {
    display: flex !important ;
    flex-direction: ${({ flexDirection = 'row' }: RProps) =>
      flexDirection} !important;
  }
  @media (min-width: ${device.laptop}) {
    legend.MuiFormLabel-root {
      font-size: 16px !important ;
    }
    span.MuiTypography-body1 {
      font-size: 18px !important ;
    }
  }
`;

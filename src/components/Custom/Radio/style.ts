import styled from 'styled-components';
import { device } from '../../../styles/device';
import { RProps, Props } from './types';

export const Container = styled.div`
  label.MuiFormControlLabel-root {
    margin: ${({ marginlabel }: Props) =>
      marginlabel ? `${marginlabel} !important` : null};
  }
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
    text-transform: ${({textTransform}: Props) => !textTransform ? 'capitalize' : 'initial'};
  }

  label.MuiFormControlLabel-root {
    &:not(:last-child) {
      margin-right: ${({formControlMarginRight}: Props) => formControlMarginRight + ' !important' || '16px'}
    }
  }

  .MuiFormControl-root {
    display: flex !important ;
    flex-direction: ${({ flexDirection = 'row' }: RProps) =>
      flexDirection} !important;
  }
  @media (max-width: ${device.laptop}) {
    legend.MuiFormLabel-root {
      font-size: 12px !important;
    }
    span.MuiTypography-body1 {
      font-size: 14px !important;
    }
  }
  @media (max-width: ${device.planshet}) {
    legend.MuiFormLabel-root {
      font-size: 12px !important;
    }
    span.MuiTypography-body1 {
      font-size: 14px !important;
    }
  }
`;

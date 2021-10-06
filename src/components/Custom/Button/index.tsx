import React from 'react';
import { Container, MButton } from './style';

export interface Props {
  children?: any;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  endIcon?: any;
  startIcon?: any;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (e: any) => void;
  buttonStyle?: {
    color?: string;
    bgcolor?: string;
    bgimage?: string;
    hovercolor?: string;
    hoverbgcolor?: string;
    weight?: string | number;
    border?: string;
    shadow?: string;
    radius?: number | string;
    fontSize?: {
      mobile?: number;
      planshet?: number;
      laptop?: number;
      desktop?: number;
    };
    height?: {
      mobile?: number;
      planshet?: number;
      laptop?: number;
      desktop?: number;
    };
  };
  width?: {
    maxwidth?: number;
    minwidth?: number;
    width?: string;
  };
  margin?: {
    mobile?: string;
    planshet?: string;
    laptop?: string;
    desktop?: string;
  };
  padding?: {
    mobile?: string;
    planshet?: string;
    laptop?: string;
    desktop?: string;
  };
  iconmargin?: {
    mobile?: number;
    planshet?: number;
    laptop?: number;
    desktop?: number;
  };
}
const Button = ({ children, ...props }: Props) => {
  return (
    <Container
      margin={props.margin}
      buttonStyle={props.buttonStyle}
      disabled={props.disabled}
      width={props.width}
      fullWidth={props.fullWidth}
      padding={props.padding}
    >
      <MButton
        fullWidth={props.fullWidth ? props.fullWidth : true}
        type={props.type}
        {...props}
      >
        {children}
      </MButton>
    </Container>
  );
};

export default Button;

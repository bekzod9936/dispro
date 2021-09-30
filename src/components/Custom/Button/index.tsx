import React from 'react';
import { MButton, Wrapper } from './style';

export interface Props {
  props?: any;
  children: any;
  /**
   *  device:
   *    mobile(max:1000px): min;
   *    laptop(min:1000px and max:1400px): min+max/2;
   *    desktop(min:1400px): max;
   */
  width?: string;
  minWidth?: number;
  maxWidth?: number;
  height?: string;
  minHeight?: number;
  maxHeight?: number;
  tcolor?: string;
  bgcolor?: string;
  fontSize?: { max?: number; min?: number };
  radius?: number | string;
  border?: string;
  margin?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  bordercolor?: string;
  shadow?: string;
  weight?: string;
  type?: 'submit' | 'button' | 'reset';
  bgimage?: string;
  padding?: string;
  hovercolor?: string;
  hoverbgcolor?: string;
  form?: string;
}
const Button = ({ children, ...props }: Props) => {
  return (
    <Wrapper disabled={props.disabled} {...props}>
      <MButton type={props.type} {...props}>
        {children}
      </MButton>
    </Wrapper>
  );
};

export default Button;

import { MouseEventHandler } from "react";
import { RippleDiv } from "./style";

interface IProps {
  children?: any;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const RippleEffect = ({ children, ...props }: IProps) => {
  return <RippleDiv {...props}>{children}</RippleDiv>;
};

export default RippleEffect;

import Spinner from "components/Helpers/Spinner";
import { Container, MButton } from "./style";

export interface Props {
  children?: any;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  loading?: boolean;
  endIcon?: any;
  startIcon?: any;
  loadingColor?: string;
  type?: "submit" | "button" | "reset";
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
        {props.loading ? (
          <Spinner size={25} color={props.loadingColor} />
        ) : (
          children
        )}
      </MButton>
    </Container>
  );
};

export default Button;

export interface Props {
  children?: any;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  loading?: boolean;
  endIcon?: any;
  startIcon?: any;
  loadingColor?: string;
  value?: string;
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

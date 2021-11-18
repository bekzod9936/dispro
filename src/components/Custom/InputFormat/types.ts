export interface Props {
  field?: any;
  autoComplete?: string;
  autoFocus?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  id?: string;
  label?: any;
  maxRows?: number | string;
  minRows?: number | string;
  multiline?: boolean;
  name?: string;
  moneyInput?: boolean;
  variant?: "filled" | "standard" | "outlined" | undefined;
  onChange?: (e: any) => void;
  placeholder?: string;
  required?: boolean;
  select?: boolean;
  type?: string;
  value?: any;
  InputProps?: any;
  message?: any;
  IconStart?: any;
  IconEnd?: any;
  labelStyle?: {
    color?: string;
    weight?: string | number;
    letterSpacing?: string;
    fontSize?: {
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

  lmargin?: {
    mobile?: number;
    planshet?: number;
    laptop?: number;
    desktop?: number;
  };
  inputStyle?: {
    color?: string;
    bgcolor?: string;
    weight?: string | number;
    inpadding?: string;
    outpadding?: string;
    margin?: string;
    border?: string;
    shadow?: string;
    radius?: number;
    borderbottom?: string;
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
    placeholdercolor?: string;
    fitheight?: boolean;
  };
  margin?: {
    mobile?: string;
    planshet?: string;
    laptop?: string;
    desktop?: string;
  };
  maxLength?: number | string;
  minLength?: number | string;
  onFocus?: () => void;
  onBlur?: () => void;
  min?: string;
  max?: string;
}

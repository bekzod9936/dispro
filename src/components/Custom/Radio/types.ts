export interface RProps {
  flexDirection: "row" | "column";
}

export interface LabelProps {
  labelWeight: string | number;
  labelSize: string; 
}

export  interface Props {
  title?: string;
  list?: { value?: string | number; label?: string | number | any | HTMLElement }[];
  onChange?: (e: any) => void;
  value?: any;
  required?: boolean;
  name?: string;
  id?: string;
  icon?: any;
  disableRipple?: boolean;
  disabled?: boolean;
  checkedIcon?: any;
  checked?: boolean;
  defaultValue?: string | number;
  labelPlacement?: "bottom" | "end" | "start" | "top";
  flexDirection: "row" | "column";
  marginlabel?: string;
}
export interface Props {
  defaultValue?: any;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  name?: string;
  options?: { value?: any; label?: any; name?: any }[];
  isMulti?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  className?: any;
  dataCy?: any;
  onChange?: (e: any) => void;
  placeholder?: string;
  nooptionsmessage?: any;
  value?: any;
  label?: any;
  labelStyle?: {
    color?: string;
    weight?: string | number;
    fontSize?: {
      mobile?: number;
      planshet?: number;
      laptop?: number;
      desktop?: number;
    };
  };
  lmargin?: {
    mobile?: number;
    planshet?: number;
    laptop?: number;
    desktop?: number;
  };
  selectStyle?: {
    color?: string;
    bgcolor?: string;
    weight?: string | number;
    margin?: string;
    border?: string;
    borderbottom?: string;
    shadow?: string;
    radius?: number;
    deleteColor?: string;
    deleteBgColor?: string;
    inpadding?: string;
    fontSize?: {
      mobile?: number;
      planshet?: number;
      laptop?: number;
      desktop?: number;
    };
    valuebgcolor?: string;
    height?: {
      mobile?: number;
      planshet?: number;
      laptop?: number;
      desktop?: number;
    };
    placeholdercolor?: string;
    placewieght?: string;
  };
  IconDown?: any;
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
  message?: any;
  field?: any;
  iconmargin?: string;
  icon?: any;
  iconleft?: string;
  iconright?: string;
  icondowncolor?: string;
  isOptionDisabled?: any;
}

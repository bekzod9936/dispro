import { Container, NewSelect, DownIcon, Label, Message } from "./style";
import { components } from "react-select";

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
}
const MultiSelect = ({ iconmargin, nooptionsmessage, ...props }: Props) => {
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        {props.IconDown ? props.IconDown : <DownIcon iconmargin={iconmargin} />}
      </components.DropdownIndicator>
    );
  };

  const NoOptionsMessage = (props: any) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">{nooptionsmessage}</span>
      </components.NoOptionsMessage>
    );
  };

  const customStyle = {
    menuPortal: (base: any) => ({ ...base, zIndex: 999999 }),
    control: (base: any, state: any) => ({
      ...base,
      border: props.error
        ? "1px solid #FF5E68"
        : props.selectStyle?.border
        ? props.selectStyle?.border
        : "1px solid #C2C2C2",

      boxShadow: "none",
      "&:hover": {
        border: "inherite",
      },
      borderBottom: props.selectStyle?.borderbottom
        ? props.selectStyle?.borderbottom
        : null,
      backgroundColor: props.selectStyle?.bgcolor
        ? props.selectStyle?.bgcolor
        : "white",
      borderRadius:
        props.selectStyle?.radius === 0
          ? 0
          : props.selectStyle?.radius
          ? `${props.selectStyle?.radius}px`
          : "14px",
    }),
    option: (base: any, state: any) => {
      return {
        ...base,
        color: props.selectStyle?.color ? props.selectStyle?.color : "#223367",
        fontWeight: props.selectStyle?.weight
          ? props.selectStyle?.weight
          : "500",
        backgroundColor: state.isSelected ? "#E8F0FE" : "white",
      };
    },
  };

  return (
    <Container width={props.width} margin={props.margin}>
      {props.label ? (
        <Label
          htmlFor={props.label}
          labelStyle={props.labelStyle}
          focused={true}
          error={props.error}
          disabled={props.isDisabled}
          lmargin={props.lmargin}
        >
          {props.label}
        </Label>
      ) : null}
      <NewSelect
        styles={customStyle}
        components={{ DropdownIndicator, NoOptionsMessage }}
        inputId={props.label}
        inputStyle={props.selectStyle}
        defaultValue={props.defaultValue}
        value={props.defaultValue}
        {...props}
        {...props.field}
        placeholder={props.placeholder ? props.placeholder : ""}
        menuPortalTarget={document.body}
      />
      {props.error ? (
        <Message labelStyle={props.labelStyle}>{props.message}</Message>
      ) : null}
    </Container>
  );
};

export default MultiSelect;

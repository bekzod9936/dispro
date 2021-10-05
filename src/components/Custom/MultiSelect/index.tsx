import React from 'react';
import { Container, NewSelect, DownIcon, Label, Message } from './style';
import { components } from 'react-select';

export interface Props {
  defaultValue?: any;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  name?: string;
  options?: { value?: any; label?: any }[];
  isMulti?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  className?: any;
  onChange?: (e: any) => void;
  placeholder?: string;
  noOptionsMessage?: any;
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
}
const MultiSelect = ({ ...props }: Props) => {
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        {props.IconDown ? props.IconDown : <DownIcon />}
      </components.DropdownIndicator>
    );
  };

  const customStyle = {
    control: (base: any, state: any) => ({
      ...base,
      border: props.error
        ? '1px solid #FF5E68'
        : props.selectStyle?.border
        ? props.selectStyle?.border
        : '1px solid #C2C2C2',
      borderRadius: props.selectStyle?.border
        ? `${props.selectStyle?.border}px`
        : '14px',
      boxShadow: 'none',
      '&:hover': {
        border: 'inherite',
      },
    }),
    option: (base: any, state: any) => {
      return {
        ...base,
        color: props.selectStyle?.color ? props.selectStyle?.color : '#223367',
        fontWeight: props.selectStyle?.weight
          ? props.selectStyle?.weight
          : '500',
        backgroundColor: state.isSelected ? '#E8F0FE' : 'white',
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
        components={{ DropdownIndicator }}
        inputId={props.label}
        inputStyle={props.selectStyle}
        {...props}
        {...props.field}
        placeholder={props.placeholder ? props.placeholder : ''}
      />
      {props.error ? (
        <Message labelStyle={props.labelStyle}>{props.message}</Message>
      ) : null}
    </Container>
  );
};

export default MultiSelect;

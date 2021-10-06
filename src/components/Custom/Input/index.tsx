import React from 'react';
import { Container, MInput, Label, Adornment, Message } from './style';

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

const NInput = ({ onChange = () => {}, ...props }: Props) => {
  return (
    <Container width={props.width} margin={props.margin}>
      {props.label ? (
        <Label
          htmlFor={props.id ? props.id : props.label}
          labelStyle={props.labelStyle}
          focused={true}
          error={props.error}
          disabled={props.disabled}
          lmargin={props.lmargin}
        >
          {props.label}
        </Label>
      ) : null}
      <MInput
        inputProps={{
          maxLength: props.maxLength,
          minLength: props.minLength,
          min: props.min,
          max: props.max,
        }}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        error={props.error}
        fullWidth={props.fullWidth === false ? false : true}
        id={props.id ? props.id : props.label}
        maxRows={props.maxRows}
        minRows={props.minRows}
        multiline={props.multiline}
        name={props.name}
        onChange={(e) => onChange(e)}
        placeholder={props.placeholder}
        required={props.required}
        select={props.select}
        type={props.type}
        value={props.value}
        InputProps={{
          startAdornment: props.IconStart ? (
            <Adornment position='start'>{props.IconStart}</Adornment>
          ) : null,
          endAdornment: props.IconEnd ? (
            <Adornment position='end'>{props.IconEnd}</Adornment>
          ) : null,
        }}
        inputStyle={props.inputStyle}
        {...props.field}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      <Message labelStyle={props.labelStyle}>
        {props.error ? props.message : null}
      </Message>
    </Container>
  );
};

export default NInput;

import { InputAdornment } from '@material-ui/core';
import React from 'react';
import { Container, MInput, Label, Wrap, Message } from './style';

interface Props {
  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  lcolor?: string;
  lweight?: string;
  lfontSize?: string;
  lmarginbottom?: number;
  radius?: number;
  border?: string;
  fontSize?: number;
  width?: string;
  minWidth?: number;
  maxWidth?: number;
  height?: string;
  minHeight?: number;
  maxHeight?: number;
  margin?: string;
  onChange?: Function;
  defaultValue?: any;
  value?: any;
  required?: boolean;
  field?: any;
  startAdornment?: any;
  endAdornment?: any;
  error?: boolean;
  message?: any;
  min?: number;
  max?: number;
  autoFocus?: boolean;
}

const Input = ({
  type,
  label,
  placeholder,
  disabled,
  lcolor,
  lweight,
  lfontSize,
  lmarginbottom,
  radius,
  border,
  fontSize,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  margin,
  onChange = () => {},
  defaultValue,
  value,
  required,
  field,
  startAdornment,
  endAdornment,
  error,
  message,
  min,
  max,
  autoFocus,
}: Props) => {
  const handleChange = (e: {}) => {
    onChange(e);
  };

  return (
    <Container margin={margin}>
      {label ? (
        <Label
          lcolor={lcolor}
          lweight={lweight}
          lfontSize={lfontSize}
          lmarginbottom={lmarginbottom}
        >
          {label}
        </Label>
      ) : null}
      <Wrap
        height={height}
        width={width}
        minHeight={minHeight}
        maxHeight={maxHeight}
        minWidth={minWidth}
        maxWidth={maxWidth}
      >
        <MInput
          disableUnderline={true}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          radius={radius}
          border={error ? '1px solid #FF5E68' : border}
          fontSize={fontSize}
          onChange={handleChange}
          defaultValue={defaultValue}
          value={value}
          required={required}
          {...field}
          error={error}
          startAdornment={
            <InputAdornment position='start'>{startAdornment}</InputAdornment>
          }
          endAdornment={
            <InputAdornment position='end'>{endAdornment}</InputAdornment>
          }
          inputProps={{
            maxlength: max,
          }}
          autoFocus={autoFocus}
        />
        <Message>{error ? message : null}</Message>
      </Wrap>
    </Container>
  );
};

export default Input;

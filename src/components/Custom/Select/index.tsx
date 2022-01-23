import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import {
  Container,
  MSelect,
  Label,
  Option,
  Wrap,
  Message,
  IconWrap,
} from './style';

interface Props {
  options?: any[];
  label?: string;
  onChange?: (v: any) => void;
  width?: string;
  minWidth?: number;
  maxWidth?: number;
  height?: string;
  minHeight?: number;
  maxHeight?: number;
  tcolor?: string;
  bgcolor?: string;
  fontSize?: number;
  radius?: number;
  border?: string;
  lcolor?: string;
  lweight?: string;
  lfontSize?: string;
  lmarginbottom?: number;
  componentOptions?: any[];
  defaultValue?: any;
  weight?: string;
  Icon?: any;
  paddingLeft?: number;
  margin?: string;
  field?: any;
  value?: any;
  onOpen?: (e: any) => void;
  error?: boolean;
  message?: any;
  onClose?: () => void;
  renderValue?: (v: any) => any;
}

const Select = ({
  options,
  label,
  onChange = () => {},
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
  lcolor,
  lweight,
  lfontSize,
  bgcolor,
  tcolor,
  fontSize,
  radius,
  border,
  lmarginbottom,
  defaultValue,
  weight,
  Icon,
  paddingLeft,
  margin,
  field,
  value,
  onOpen = () => {},
  error,
  message,
  onClose,
  renderValue,
}: Props) => {
  const [open, setOpen] = useState(false);
  const useStyles = makeStyles({
    paper: {
      marginTop: height,
      width: `${minWidth}px` || width || `${maxWidth}px`,
    },
  });

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
    onOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onOpen(false);
  };

  return (
    <Container width={width} margin={margin}>
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
        <MSelect
          disableUnderline
          defaultValue={defaultValue}
          tcolor={tcolor}
          bgcolor={bgcolor}
          fontSize={fontSize}
          radius={radius}
          border={error ? '1px solid #FF5E68' : border}
          onChange={(e) => onChange(e.target.value)}
          weight={weight}
          IconComponent={() => (
            <IconWrap open={open}>
              <Icon />
            </IconWrap>
          )}
          paddingLeft={paddingLeft}
          {...field}
          value={value}
          onOpen={handleOpen}
          onClose={onClose || handleClose}
          MenuProps={{
            PaperProps: {
              className: classes.paper,
            },
          }}
          renderValue={renderValue}
        >
          {options?.map((v, i) => (
            <Option key={i} value={v?.id || v}>
              {v?.value || v}
            </Option>
          ))}
        </MSelect>
        <Message>{error ? message : null}</Message>
      </Wrap>
    </Container>
  );
};

export default Select;

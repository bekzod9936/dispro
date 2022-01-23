import React from 'react';
import {
  IContainerProps,
  ILabelProps,
  ITextAreaProps,
  Label,
  MTextArea,
  Wrapper,
  Message,
  Icons,
  WrapArea,
  TextAreaIcon,
} from './style';

interface IProps {
  textarea?: ITextAreaProps;
  label?: ILabelProps;
  container?: IContainerProps;
  onChange?: any;
  fontSize?: string | number;
  value?: string | number;
  defaultValue?: string | number;
  title: any;
  field?: any;
  resize?: string;
  required?: boolean;
  maxLength?: number;
  maxHeight?: string;
  minHeight?: string;
  message?: any;
  IconStart?: any;
  IconEnd?: any;
  error?: any;
}

export const TextArea = ({
  textarea,
  fontSize,
  error,
  defaultValue,
  IconEnd,
  label,
  maxHeight,
  minHeight,
  message,
  required,
  maxLength,
  resize,
  value,
  onChange,
  title,
  container,
  field,
}: IProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | any>(null);

  const handleFocus = () => {
    textareaRef.current.focus();
  };

  return (
    <Wrapper {...container}>
      <Label {...label} onClick={handleFocus}>
        {title}
      </Label>
      <MTextArea
        error={error}
        {...field}
        defaultValue={defaultValue}
        fontSize={fontSize}
        maxHeight={maxHeight}
        minHeight={minHeight}
        maxLength={maxLength}
        required={required}
        resize={resize}
        value={value}
        onChange={onChange}
        ref={textareaRef}
        {...textarea}
      >
        {/* <TextAreaIcon /> */}
      </MTextArea>
      <Message>{error ? message : null}</Message>
    </Wrapper>
  );
};

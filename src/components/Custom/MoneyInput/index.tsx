import MaskedInput from "react-text-mask";
import createNumberMask from "services/utils/format_number";
import { Container, MoneyInput, Label, Adornment, Message } from "./style";
import { MProps } from "./types";

function TextMask(props: any) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref?.inputElement : null);
      }}
      mask={createNumberMask()}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

const MFormatInput = ({ onChange = () => {}, ...props }: MProps) => {
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
      <MoneyInput
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
        placeholder={props.placeholder}
        required={props.required}
        select={props.select}
        type={props.type}
        variant={props.variant}
        InputProps={{
          inputComponent: TextMask,
          value: props.value?.textmask,
          defaultValue: props.defaultValue,
          onChange: (e: any) => onChange(e),
          startAdornment: props.IconStart ? (
            <Adornment position="start">{props.IconStart}</Adornment>
          ) : null,
          endAdornment: props.IconEnd ? (
            <Adornment position="end">{props.IconEnd}</Adornment>
          ) : null,
        }}
        inputStyle={props.inputStyle}
        {...props.field}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        inputComponent
      />

      <Message labelStyle={props.labelStyle}>
        {props.error ? props.message : null}
      </Message>
    </Container>
  );
};

export default MFormatInput;

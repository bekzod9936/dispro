import { Props } from "./types";
import MaskedInput from "react-text-mask";
import { Container, MInput, Label, Adornment, Message } from "./style";

function TextMaskCustom(props: any) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /^[0-9]*$/,
        /^[0-9]*$/,
        /^[0-9]*$/,
        /^[0-9]*$/,
        /^[0-9]*$/,
        /^[0-9]*$/,
        /^[0-9]*$/,
        /^[0-9]*$/,
        /^[0-9]*$/,
      ]}
      keepCharPositions={true}
      placeholderChar={"\u2000"}
    />
  );
}

const NInput = ({
  onChange = () => {},
  onKeyPress = () => {},
  ...props
}: Props) => {
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
          {props.label} {props.labelIcon || null}
        </Label>
      ) : null}
      <MInput
        inputProps={{
          maxLength: props.maxLength,
          minLength: props.minLength,
          min: props.min,
          max: props.max,
        }}
        max={props.max}
        min={props.min}
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
        variant={props.variant}
        InputProps={{
          startAdornment: props.IconStart ? (
            <Adornment position="start">{props.IconStart}</Adornment>
          ) : null,
          endAdornment: props.IconEnd ? (
            <Adornment position="end">{props.IconEnd}</Adornment>
          ) : null,
          inputComponent: props.maskPhone ? TextMaskCustom : undefined,
        }}
        inputStyle={props.inputStyle}
        {...props.field}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        inputComponent
        onKeyPress={onKeyPress}
        {...props.register}
      />
      <Message isAbsolute={props.isAbsolute} labelStyle={props.labelStyle}>
        {props.error ? props.message : null}
      </Message>
    </Container>
  );
};

export default NInput;

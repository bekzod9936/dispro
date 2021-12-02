import { Container, NewSelect, DownIcon, Label, Message } from "./style";
import { components } from "react-select";

//types
import { Props } from "./type";
import { customStyle } from "./constants";

const MultiSelect = ({
  iconmargin,
  nooptionsmessage,
  icon,
  iconleft,
  iconright,
  icondowncolor,
  ...props
}: Props) => {
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator data-cy={props.dataCy} {...props}>
        {props.IconDown ? (
          props.IconDown
        ) : (
          <DownIcon icondowncolor={icondowncolor} iconmargin={iconmargin} />
        )}
      </components.DropdownIndicator>
    );
  };

  const NoOptionsMessage = (props: any) => {
    return (
      <components.NoOptionsMessage data-cy={props.dataCy} {...props}>
        <span className="custom-css-class">{nooptionsmessage}</span>
      </components.NoOptionsMessage>
    );
  };

  const ValueContainer = (props: any) => {
    return (
      components.ValueContainer && (
        <components.ValueContainer data-cy={props.dataCy} {...props}>
          {icon && (
            <div
              style={{ position: "absolute", left: iconleft, right: iconright }}
            >
              {icon}
            </div>
          )}
          {props.children}
        </components.ValueContainer>
      )
    );
  };

  //   console.log(props, "data cy ");

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
        styles={customStyle(props)}
        components={{ DropdownIndicator, NoOptionsMessage, ValueContainer }}
        inputId={props.label}
        selectStyle={props.selectStyle}
        defaultValue={props.defaultValue}
        isOptionDisabled={props.isOptionDisabled}
        value={props.defaultValue}
        data-cy={props.dataCy}
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

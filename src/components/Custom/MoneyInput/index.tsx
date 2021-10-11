import { useState } from "react";
import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import createNumberMask from "./utility";

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

const MoneyInput = () => {
  const [values, setValues] = useState<any>("");
  const handleChange = (event: any) => {
    setValues(event.target.value);
  };
  return (
    <>
      <div>
        <Input
          value={values?.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMask}
        />
      </div>
    </>
  );
};

export default MoneyInput;

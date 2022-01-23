interface Props {
  value: string;
}

export const inputPhoneNumber = ({ value }: Props) => {
  let str = String(value);
  let check: boolean = !/^\d+$/.test(str);

  if (check) {
    str = str.slice(0, str.length - 1);
  }

  return {
    check: check,
    newString: str,
  };
};

export const inputSms = ({ value }: Props) => {
  let str = String(value);
  let check: boolean = !/^\d{0,4}$/.test(str);

  if (check) {
    str = str.slice(0, str.length - 1);
  }

  return {
    check: check,
    newString: str,
  };
};

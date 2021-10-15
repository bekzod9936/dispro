export interface IFormInput {
  [n: string]: string;
}

export const copyToClipboard = (text: string) => {
  console.log("text", text);
  var textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

export const stopPropagation = (e: React.SyntheticEvent) => {
  e.stopPropagation();
};

const limit = (val: string, max: string) => {
  if (Number(val) > Number(max)) {
    val = max;
  }

  return val;
};

export const cardExpiry = (val: string) => {
  let month = limit(val.substring(0, 2), "12");
  let year = val.substring(2, 4);

  return month + (year.length ? "/" + year : "");
};

export const formatFormData = (data: IFormInput) => {
  const spacesRegEx = /\s/g;
  const slashRegEx = /\//g;
  let newData: IFormInput = {};

  Object.entries(data).forEach(([name, value]) => {
    if (spacesRegEx.test(value)) {
      return (newData[name] = value.split(" ").join(""));
    }

    if (slashRegEx.test(data[name])) {
      return (newData[name] = value.split("/").reverse().join(""));
    }

    newData[name] = value;
  });

  return newData;
};

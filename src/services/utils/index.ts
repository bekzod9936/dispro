export interface IFormInput {
  [n: string]: string;
}

export const copyToClipboard = (text: string) => {
  console.log('text', text);
  var textField = document.createElement('textarea');
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
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
  let month = limit(val.substring(0, 2), '12');
  let year = val.substring(2, 4);

  return month + (year.length ? '/' + year : '');
};

export const formatFormData = (data: IFormInput) => {
  const spacesRegEx = /\s/g;
  const slashRegEx = /\//g;
  let newData: IFormInput = {};

  Object.entries(data).forEach(([name, value]) => {
    if (spacesRegEx.test(value)) {
      return (newData[name] = value.split(' ').join(''));
    }

    if (slashRegEx.test(data[name])) {
      return (newData[name] = value.split('/').reverse().join(''));
    }

    newData[name] = value;
  });

  return newData;
};

export const numberWith = (
  x: string,
  replaceValue: string,
  defaultValue?: string
) => {
  const defVal = defaultValue || '-';

  return x
    ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, replaceValue)
    : defVal;
};

export const normalInteger = (str: string, max?: number) => {
  str = str.replace(/\s/g, '');
  str = str?.toString().trim();

  if (!str) {
    return '';
  }
  str = str.replace(/^0+/, '') || '0';
  const n = Math.floor(Number(str));
  if (String(n) === str && n >= 0) {
    return str;
  }

  return str.replace(/\D/g, '');
};

export const parseSimpleString = (str: string) => {
  let parsed: string = str?.split(' ')?.join('');

  return parsed;
};

interface Props {
  count: number;
  firstWord: string;
  secondWord: string;
  thirdWord: string;
}

export const ruCount = ({ count, firstWord, secondWord, thirdWord }: Props) => {
  const lastTwoNumber: number = count % 100;
  const lastNumber: number = count % 10;

  const group1: number[] = [2, 3, 4];
  const group2: number[] = [0, 5, 6, 7, 8, 9];
  const group3: number[] = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  if (group3.includes(lastTwoNumber)) {
    return thirdWord;
  } else if (group2.includes(lastNumber)) {
    return thirdWord;
  } else if (group1.includes(lastNumber)) {
    return secondWord;
  } else {
    return firstWord;
  }
};

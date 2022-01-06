interface Props {
  count: number;
  firstWord: string;
  secondWord: string;
}
export const formatPagination = ({ count, firstWord, secondWord }: Props) => {
  const lastNumber: number = count % 10;

  if (lastNumber === 1 && count !== 11) {
    return firstWord;
  } else {
    return secondWord;
  }
};

interface CProps {
  count: number | any;
  firstWord: string;
  secondWord: string;
  thirdWord: string;
}

export const ruCount = ({
  count,
  firstWord,
  secondWord,
  thirdWord,
}: CProps) => {
  const number = Number(String(count).slice(-1));

  const group1 = [2, 3, 4];
  const group2 = [5, 6, 7, 8, 9, 0];
  if (count === 11) {
    return secondWord;
  } else if (group1.includes(number)) {
    return firstWord;
  } else if (group2.includes(number)) {
    return secondWord;
  } else if (number === 1) {
    return thirdWord;
  } else if (count === undefined) {
    return secondWord;
  }
};

interface Props {
  count: number;
  firstWord: string;
  secondWord: string;
  thirdWord: string;
}

export const ruCount = ({ count, firstWord, secondWord, thirdWord }: Props) => {
  const lastNumber: number = count % 10;

  const group1: number[] = [1];
  const group2: number[] = [2, 3, 4];
  const group3: number[] = [0, 5, 6, 7, 8, 9];

  if (group3.includes(lastNumber)) {
    return thirdWord;
  } else if (group2.includes(lastNumber)) {
    return secondWord;
  } else if (group1.includes(lastNumber)) {
    return firstWord;
  }
};

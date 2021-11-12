interface Props {
  count: number;
  firstWord?: string;
  secondWord?: string;
}
export const ruCount = ({ count, firstWord, secondWord }: Props) => {
  const lastNumber: number = count % 10;

  const group2: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (group2.includes(lastNumber)) {
    return secondWord;
  } else if (count === 1) {
    return firstWord;
  }
};

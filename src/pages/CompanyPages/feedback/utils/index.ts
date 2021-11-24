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

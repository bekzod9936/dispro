interface PagProps {
  count: number;
  firstWord?: string;
  secondWord?: string;
}
export const countPagination = ({ count, firstWord, secondWord }: PagProps) => {
  const lastNumber: number = count % 10;

  const group2: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 0];

  if (group2.includes(lastNumber) || count === 11) {
    return secondWord;
  } else if (count === 1) {
    return firstWord;
  }
};

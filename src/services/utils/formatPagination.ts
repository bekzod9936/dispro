interface Props {
  page?: number;
  perPage?: number;
  total?: number;
}

export const formatPagination = ({
  page = 1,
  perPage = 5,
  total = 0,
}: Props) => {
  let start: number = 1;
  let end: number = 1;
  if (page === 1 && perPage <= total) {
    start = 1;
    end = total > perPage ? perPage : total;
  } else if (page * perPage > total) {
    start = (page - 1) * perPage + 1;
    end = total;
  } else {
    start = (page - 1) * perPage + 1;
    end = page * perPage;
  }

  let info = `${start}-${end}`;
  return info;
};

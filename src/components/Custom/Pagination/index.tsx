import { MPagination } from './style';

interface Props {
  boundaryCount?: number;
  count?: number;
  defaultPage?: number;
  disabled?: boolean;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: Function;
  page?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
}

const Pagination = ({
  boundaryCount,
  count,
  defaultPage,
  disabled,
  hideNextButton,
  hidePrevButton,
  onChange = () => {},
  page,
  showFirstButton,
  showLastButton,
  siblingCount,
}: Props) => {
  const handleChange = (e: object, page: number) => {
    onChange(page);
  };
  return (
    <MPagination
      boundaryCount={boundaryCount}
      count={count}
      page={page}
      defaultPage={defaultPage}
      disabled={disabled}
      hideNextButton={hideNextButton}
      hidePrevButton={hidePrevButton}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
      siblingCount={siblingCount}
      onChange={handleChange}
    />
  );
};

export default Pagination;

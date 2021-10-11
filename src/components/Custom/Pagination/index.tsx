import { MPagination, Container } from './style';

interface Props {
  boundaryCount?: number;
  count?: number;
  defaultPage?: number;
  disabled?: boolean;
  getItemAriaLabel?: Function;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: Function;
  page?: number;
  renderItem?: Function;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
}

const Pagination = () => {
  return (
    <Container>
      <MPagination count={10} />
    </Container>
  );
};

export default Pagination;

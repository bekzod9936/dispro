import { setPage } from 'services/redux/Slices/clients';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { RootState } from 'services/redux/store';
import { WrapPag } from './style';
import { formatPagination } from 'services/utils/formatPagination';
import { NewPagination } from 'components/Custom/NewPagination';

interface IProps {
  query: string
}

export const Footer = ({ query }: IProps) => {
  const { page, totalCount, totalPages } = useAppSelector(
    (state: RootState) => state.clients
  );
  const dispatch = useAppDispatch();

  const handleChangePage = (int: number) => {
    dispatch(setPage(int))
  }

  return (
    <WrapPag>
      {!query ? <p>
        Показано <span>{formatPagination({ page, perPage: 10, total: totalCount })}</span> из <span>{totalCount}</span> {totalCount.toString().endsWith("1") ? "клиента" : "клиентов"}
      </p> : <p></p>}
      <NewPagination onChange={handleChangePage} currentPage={page} totalCount={Number(totalPages)} />
    </WrapPag>
  );
};

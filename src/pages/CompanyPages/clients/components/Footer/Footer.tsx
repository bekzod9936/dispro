import Pagination from 'components/Custom/Pagination';
import { setPage } from "services/redux/Slices/clients"
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { RootState } from 'services/redux/store';
import { WrapPag } from './style';

export const Footer = () => {
	const { page, totalCount, totalPages } = useAppSelector((state: RootState) => state.clients)
	const dispatch = useAppDispatch()
	return (
		<WrapPag>
			<p>Всего {totalCount} клиентов</p>
			<Pagination
				count={Number(totalPages)}
				defaultPage={page}
				onChange={(e: number) => {
					dispatch(setPage(e))
				}}
			/>
		</WrapPag>
	);
};


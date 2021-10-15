import styled from 'styled-components';
import Pagination from 'components/Custom/Pagination';

export const Footer = ({ page, setPage, totalCount, totalPages }: any) => {
	return (
		<WrapPag>
			<p>Показано {`${(page - 1) * 3 + 1}-${page * 3} из ${totalCount}`} клиентов</p>
			<Pagination
				count={totalPages}
				defaultPage={page}
				onChange={(e: any) => {
					setPage({ type: 'setPage', payload: e });
				}}
			/>
		</WrapPag>
	);
};

export const WrapPag = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;
`;

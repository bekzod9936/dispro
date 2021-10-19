import styled from 'styled-components';
import Pagination from 'components/Custom/Pagination';
import { device } from 'styles/device';
import { ActionType, ActionTypes } from '../../utils/reducerTypes';
interface IProps {
	page: number,
	setPage: (arg: ActionType) => void,
	totalCount: number,
	totalPages: number | string,
	length: number
}
export const Footer = ({ page, setPage, totalCount, totalPages, length }: IProps) => {
	
	// TODO: fix how many clients have been shown 
	return (
		<WrapPag>
			<p>Показано <span>{`${(page - 1) * 5 + 1}-${page * length + Math.round(page * 0.5)}`}</span> из <span>{totalCount}</span> клиентов</p>
			<Pagination
				count={+totalPages}
				defaultPage={page}
				onChange={(e: any) => {
					setPage({ type: ActionTypes.SET_PAGE, payload: e });
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
	p {
		font-size: 18px;
		color:#223367;
		span {
			font-weight: 700;
		}
	}
	@media (max-width: ${device.planshet}) {
		flex-direction: column-reverse;
		align-items: flex-start;
		p {
			margin-top: 15px;
			font-size: 14px;
		}
	}
`;
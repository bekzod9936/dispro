import { useQuery } from 'react-query';
import { getPointHistories } from 'services/queries/staffQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
	setPointHistoriesBetween,
	setPointHistoriesData,
	setPointHistoriesTotal,
} from 'services/redux/Slices/staffs';
import { formatPagination } from 'services/utils/formatPagination';

interface PProps {
	filterValues: any;
}

const useBallTable = ({ filterValues }: PProps) => {
	const dispatch = useAppDispatch();
	const cashierId = useAppSelector((state) => state.staffs.cashierId);
	const response = useQuery(
		['fetchPointHistories', filterValues],
		() => {
			const url = Object.keys(filterValues)
				.map((v: any) => `${v}=${filterValues[v]}&`)
				.join('');
			return getPointHistories({
				url: url,
				id: cashierId,
			});
		},
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			retry: 0,
			onSuccess: (data) => {
				dispatch(setPointHistoriesData(data.data.data.cashierPointHistories));
				dispatch(
					setPointHistoriesTotal(
						Math.ceil(data.data.data.totalCount / filterValues?.perPage)
					)
				);
				dispatch(
					setPointHistoriesBetween(
						formatPagination({
							page: filterValues?.page,
							perPage: filterValues?.perPage,
							total: data.data.data.totalCount,
						})
					)
				);
			},
		}
	);

	return { response };
};

export default useBallTable;

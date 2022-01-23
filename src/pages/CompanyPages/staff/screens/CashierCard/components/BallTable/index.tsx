import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

//helpers
import useBallTable from './useBallTable';
import { useAppSelector } from 'services/redux/hooks';

//components
import Table from '../Table';
import Spinner from 'components/Custom/Spinner';
import { NewPagination } from 'components/Custom/NewPagination';

//styles
import { Container, NoData, NoDataText, WrapPag, Info } from './style';

//icons
import { ReactComponent as CashierDataPoints } from 'assets/images/cashierDataPoints.svg';

interface intialFilterProps {
	page?: number;
	perPage?: number;
}

const BallTable = () => {
	const { t } = useTranslation();
	const cashierId = useAppSelector((state) => state.staffs.cashierId);

	const data = useAppSelector((state) => state.staffs.pointHistories.data);

	const between = useAppSelector(
		(state) => state.staffs.pointHistories.between
	);
	console.log('data', data);
	const totalCount = useAppSelector(
		(state) => state.staffs.pointHistories.totalCount
	);

	const intialFilter = {
		cashierId: cashierId,
		page: 1,
		perPage: 7,
	};

	const [filterValues, setFilterValues] =
		useState<intialFilterProps>(intialFilter);

	const { response } = useBallTable({
		filterValues: filterValues,
	});

	const list = data.map((item: any, id: number) => {
		const date = dayjs(item.date).format('DD.MM.YYYY');
		return {
			col1: id + 1,
			col2: date,
			col3: item.option,
			col4: item.amount,
			col5: item.operation,
		};
	});

	const columns: any = useMemo(
		() => [
			{
				Header: t('№'),
				accessor: 'col1',
			},
			{
				Header: t('date'),
				accessor: 'col2',
			},
			{
				Header: t('type'),
				accessor: 'col3',
				Cell: (props: any) => (
					<>
						{props?.value === 5
							? 'Баллы за покупку'
							: props?.value === 6
							? 'Дополнительные баллы'
							: props?.value === 10
							? 'Списать баллы кассиру'
							: props?.value === 0
							? '-'
							: null}
					</>
				),
			},
			{
				Header: t('balls'),
				accessor: 'col4',
				Cell: (props: any) => (
					<>
						{props?.row.original.col5 === '+' ? (
							`${props?.row.original.col4}`
						) : (
							<span style={{ color: '#FF5E68' }}>
								{` - ${props?.row.original.col4}`}
							</span>
						)}
					</>
				),
			},
		],
		[]
	);

	const handlechangePage = async (e: any) => {
		await setFilterValues({ ...filterValues, page: e });
		await response.refetch();
	};

	return (
		<>
			{response.isLoading || response.isFetching ? (
				<Spinner />
			) : list?.length === 0 ? (
				<NoData>
					<CashierDataPoints />
					<NoDataText>
						Подробная информация о баллах кассира будет хранится тут
					</NoDataText>
				</NoData>
			) : (
				<>
					<Container>
						{list?.length > 0 ? <Table columns={columns} data={list} /> : null}
					</Container>
					<WrapPag>
						<Info>
							{t('shown')}
							<span>{between}</span>
							{t('from1')} <span>{totalCount}</span> {t('operations1')}
						</Info>

						<NewPagination
							onChange={handlechangePage}
							currentPage={Number(filterValues.page)}
							totalCount={Number(totalCount)}
						/>
					</WrapPag>
				</>
			)}
		</>
	);
};

export default BallTable;

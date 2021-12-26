import Spinner from 'components/Helpers/Spinner';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { numberWith } from 'services/utils';
import { useDebounce } from 'use-debounce/lib';
import Button from 'components/Custom/Buttons/Button';
import CashierTable from '../../components/CashierTable';
import { SideBar } from '../../components/SideBar';
import useCashiers from '../../hooks/useCashiers';
import { SpinnerDiv, EmptyContainer, EmptyLeft, EmptyRight } from '../../style';
import CashierBar from './components/CashierBar';
import { ReactComponent as EmptyCashier } from 'assets/images/staffs_empty.svg';
import { ReactComponent as AddCashier } from 'assets/icons/add_cashier.svg';
import notfoundsearch from 'assets/images/notfoundsearch.png';
import {
	CashierDiv,
	Text,
	Break,
	ButtonKeyWord,
	DeleteIc,
	CashierFilterWrap,
	Wrap,
	WrapDef,
	ImgDef,
	DefDiv,
} from './style';
import { setOpenCash, setOpenFilter } from 'services/redux/Slices/staffs';
import EditCashier from './components/EditCashier';
import CashierFilterBar from './components/CashierFilterBar';
import { IconButton } from '@material-ui/core';

const CashierScreen = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const open = useAppSelector((state) => state.staffs.openFilter);
	const query = useAppSelector((state) => state.staffs.query);
	const cashiers = useAppSelector((state) => state.staffs.cashiers);
	const [storeIdForFilter, setStoreIdForFilter] = useState<number | null>(null);
	const selectedCashiers = useAppSelector(
		(state) => state.staffs.selectedCashiers
	);

	const openEdit = useAppSelector((state) => state.staffs.openEditCashier);
	const { openFilter, allCashiers, storeFilters, page } = useAppSelector(
		(state) => state.staffs
	);
	const [filterValue, setFilterValue] = useState<null | number>(null);
	const [period, setPeriod] = useState({
		startDate: '',
		endDate: '',
	});

	// const [page, setPage] = useState(1);
	const [debouncedQuery] = useDebounce(query, 300);
	const casierFilterAdress = allCashiers;
	const { response } = useCashiers({
		query: debouncedQuery,
		period,
		storeIdForFilter,
	});
	useEffect(() => {
		return () => {
			dispatch(setOpenFilter(false));
		};
	}, []);

	const filter = storeFilters?.find(
		(el: any) => el.value == storeIdForFilter
	)?.label;

	console.log(`cashiers`, cashiers);
	return (
		<>
			{filter && (
				<CashierFilterWrap>
					<ButtonKeyWord>
						{filter}
						<IconButton
							onClick={() => {
								setStoreIdForFilter(null);
								setFilterValue(null);
							}}
						>
							<DeleteIc color='#C4C4C4' />
						</IconButton>
					</ButtonKeyWord>
				</CashierFilterWrap>
			)}
			<CashierDiv>
				{response.isFetching ? (
					<SpinnerDiv>
						<Spinner />
					</SpinnerDiv>
				) : cashiers?.length > 0 ? (
					<Wrap>
						<CashierTable
							cashiers={cashiers.map((cashier: any) => {
								return {
									...cashier,
									storeName: storeIdForFilter
										? cashier?.stores.find((e: any) => e.id == storeIdForFilter)
												?.name
										: cashier?.stores[0]?.name,

									firstName: cashier?.firstName + ' ' + cashier?.lastName,
									score: numberWith(cashier?.addInfo?.avgRating, ' '),
									avgCheque: numberWith(cashier?.addInfo?.avgCheque, ' '),
									clients: numberWith(cashier?.addInfo?.countClient, ' '),
									operations: numberWith(cashier?.addInfo?.countOperation, ' '),
									amountOperation: numberWith(
										cashier?.addInfo?.amountOperation,
										' '
									),
									countRefer: numberWith(cashier?.addInfo?.countRefer, ' '),
								};
							})}
						/>
					</Wrap>
				) : debouncedQuery?.length !== 0 ? (
					<WrapDef>
						<ImgDef src={notfoundsearch} alt='defimage' />
						<DefDiv>По вашему запросу ничего не найдено...</DefDiv>
					</WrapDef>
				) : (
					// <EmptyContainer>
					// 	<EmptyRight>
					// 		<Text>По вашему запросу ничего не найдено...</Text>
					// 		<Break />
					// 	</EmptyRight>
					// </EmptyContainer>
					<EmptyContainer>
						<EmptyLeft>
							<EmptyCashier />
						</EmptyLeft>
						<EmptyRight>
							<Text>
								На данный момент кассиры в компании отсутствуют. Добавьте
								кассира, для внесения оплат клиентами.
							</Text>
							<Break />
							<Button
								onClick={() => {
									dispatch(setOpenCash(true));
								}}
								startIcon={<AddCashier />}
							>
								Добавить кассира
							</Button>
						</EmptyRight>
					</EmptyContainer>
				)}
				{/* <SideBar isOpen={open}>Salom</SideBar> */}
				<SideBar maxWidth='340px' isOpen={selectedCashiers?.length}>
					<CashierBar />
				</SideBar>

				<SideBar maxWidth='340px' isOpen={openFilter}>
					<CashierFilterBar
						storeIdForFilter={storeIdForFilter}
						setStoreIdForFilter={setStoreIdForFilter}
						filterValue={filterValue}
						setFilterValue={setFilterValue}
					/>
				</SideBar>

				{/* edit cashier */}
				<EditCashier openEdit={openEdit} />
			</CashierDiv>
		</>
	);
};

export default CashierScreen;

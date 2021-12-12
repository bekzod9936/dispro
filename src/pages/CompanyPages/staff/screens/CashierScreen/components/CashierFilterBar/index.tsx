import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import useCashiers, { useSearchBranch } from '../../../../hooks/useCashiers';
import { ModalContent, ModalBody, ModalAction } from '../../style';
import {
	BarContainer,
	CashierCard,
	CashierRow,
	CashierCol,
	Img,
	ImgDiv,
	BarTitle,
	BarText,
	BarSecondText,
	CountText,
	Break,
	BreakH,
	UpSide,
	DownSide,
	BarNormalText,
	ButtonKeyWord,
	DeleteIc,
	FilterTitle,
	SearchIcon,
	FilterInputWrap,
	HeaderWrap,
	FilterList,
} from './style';
import { IconButton } from '@material-ui/core';
import { ReactComponent as Logo } from 'assets/icons/cashier_logo_placeholder.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit_cashier.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user_setting.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete_setting.svg';
import { ReactComponent as DeleteWhiteIcon } from 'assets/icons/trash_white.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';
import { ReactComponent as TrashWhite } from 'assets/icons/trash_white.svg';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import CashierAvg from 'assets/icons/cashier_avg.png';
import CashierRecommend from 'assets/icons/cashier_recommend.png';
import Button from 'components/Custom/Button';
import Modal from 'components/Custom/Modal';
import RippleEffect from 'components/Custom/RippleEffect';
import {
	setOpenEditCashier,
	setCashierId,
	setSelectedCashiers,
	setOpenFilter,
} from 'services/redux/Slices/staffs';
import Input from 'components/Custom/Input';
// import { CheckIcon } from 'pages/CompanyPages/statistics/screens/Clients/style';
import { TickIcon } from 'components/Custom/Filter/style';
import Radio from 'components/Custom/Radio';
import { useQueryClient } from 'react-query';

interface Props {
	filterValue: any;
	setFilterValue: any;
	setStoreIdForFilter: (a: any) => void;
	storeIdForFilter: number | null;
}

const CashierFilterBar: React.FC<Props> = ({
	filterValue,
	setFilterValue,
	setStoreIdForFilter,
	storeIdForFilter,
}) => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { storeFilters } = useAppSelector((state) => state.staffs);
	const [query, setQuery] = useState('');
	const [stores, setStores] = useState<any[]>([]);
	const { open, setOpen, response } = useCashiers({
		page: 1,
		query: '',
		period: '',
	});
	const branches = useSearchBranch(query, storeFilters);
	const allCashier = useAppSelector((state) => state.staffs.allCashiers);

	const selectedCashiers = useAppSelector(
		(state) => state.staffs.selectedCashiers
	);
	// const getBranches = (obj: any) => {
	// 	if (obj) {
	// 		return Object.keys(obj).map((el) => ({
	// 			value: el,
	// 			label: obj[el],
	// 		}));
	// 	}
	// 	return [];
	// };
	// useEffect(() => {
	// 	let res = storeFilters?.reduce((acc: any, curr: any) => {
	// 		acc[curr.value] = curr.label;
	// 		return acc;
	// 	}, {});
	// 	setStores(getBranches(res));
	// }, []);

	const handleApplyFilters = async () => {
		if (!filterValue) {
			dispatch(setOpenFilter(open));
			return;
		}
		setStoreIdForFilter(filterValue);
		dispatch(setOpenFilter(open));
	};

	const staffsDiv = () => {
		return (
			<CashierCard>
				<FilterInputWrap>
					<HeaderWrap>
						<FilterTitle>Фильтр по филиалам</FilterTitle>
						<IconButton
							onClick={() => {
								dispatch(setOpenFilter(open));
							}}
						>
							<ExitIcon />
						</IconButton>
					</HeaderWrap>

					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						inputStyle={{
							height: { desktop: 50, laptop: 45 },
						}}
						IconEnd={<SearchIcon style={{ marginRight: 20 }} />}
						placeholder='Искать здесь'
					/>
				</FilterInputWrap>
				<FilterList>
					<Radio
						flexDirection='row'
						list={branches}
						value={filterValue}
						onChange={(e) => setFilterValue(e)}
					/>
					{/* {storeIdForFilter && <span>{allCashier.length}</span>} */}
				</FilterList>
				<DownSide>
					<CashierRow>
						{/* <Button
							buttonStyle={{
								bgcolor: '#fff',
								color: '#223367',
							}}
							onClick={() => {
								setStoreIdForFilter(null);
								setFilterValue(null);
								dispatch(setOpenFilter(open));
							}}
							startIcon={<CancelIcon />}
						>
							{t('cancel')}
						</Button> */}
						<Button
							onClick={handleApplyFilters}
							margin={{
								desktop: '7px 0 0 0',
							}}
							startIcon={<TickIcon />}
						>
							Применить
						</Button>
					</CashierRow>
				</DownSide>
			</CashierCard>
		);
	};
	return <BarContainer>{staffsDiv()}</BarContainer>;
};

export default CashierFilterBar;

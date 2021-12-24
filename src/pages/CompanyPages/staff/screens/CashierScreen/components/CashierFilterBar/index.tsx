import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import useCashiers, { useSearchBranch } from '../../../../hooks/useCashiers';
import {
	BarContainer,
	CashierCard,
	CashierRow,
	DownSide,
	FilterTitle,
	SearchIcon,
	FilterInputWrap,
	HeaderWrap,
	FilterList,
} from './style';
import { IconButton } from '@material-ui/core';

import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';

import Button from 'components/Custom/Button';

import { setOpenFilter } from 'services/redux/Slices/staffs';
import Input from 'components/Custom/Input';
import { TickIcon } from 'components/Custom/Filter/style';
import Radio from 'components/Custom/Radio';

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
}) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { storeFilters } = useAppSelector((state) => state.staffs);
	const [query, setQuery] = useState('');
	const { open } = useCashiers({
		page: 1,
		query: '',
		period: '',
	});
	const branches = useSearchBranch(query, storeFilters);

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
					{branches.length >= 1 ? (
						<Radio
							flexDirection='row'
							list={branches}
							value={filterValue}
							onChange={(e) => setFilterValue(e)}
						/>
					) : (
						'По вашему запросу ничего не найдено...'
					)}
				</FilterList>

				<DownSide>
					<CashierRow>
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

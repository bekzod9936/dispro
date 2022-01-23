import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Popover } from '@material-ui/core';

//helpers
import {
	setOpenCash,
	setOpenFilter,
	setOpenManager,
	setQuery,
	setSelectedCashiers,
} from 'services/redux/Slices/staffs';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
import { usePermissions } from 'services/hooks/usePermissions';

//components
import Button from 'components/Custom/Buttons/Button';
import Input from 'components/Custom/Input';

//styles
import { SearchIcon } from 'components/Layout/Header/style';
import { StaffPopover, PopoverRow, Flex } from '../../style';

//types
import { IProps } from './types';

//icons
import { ReactComponent as ArrowDown } from 'assets/icons/arrow_down.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings_icon.svg';
import { ReactComponent as FilterIcon } from 'assets/icons/StatistisPage/filter.svg';
import { AddIcon } from 'assets/icons/InfoPageIcons/InfoPageIcons';
import React, { useCallback, useEffect, useState } from 'react';

const Header = ({
	// handleOpen,
	// handleClose,
	closeFun,
	handleOpenSetting,
}: IProps) => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const query = useAppSelector((state) => state.staffs.query);
	const open = useAppSelector((state) => state.staffs.openFilter);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const { t } = useTranslation();
	const isEditable = usePermissions('staff');
	useEffect(() => {
		dispatch(setQuery(''));
	}, [location.pathname]);

	const handleOpen = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setAnchorEl(event.currentTarget);
		},
		[]
	);

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const handleOpenModal = (modal: 'cashier' | 'manager') => {
		if (modal === 'cashier') dispatch(setOpenCash(true));
		else dispatch(setOpenManager(true));

		handleClose();
	};

	return (
		<Flex
			width='95%'
			justifyContent='flex-start'
			alignItems='center'
			margin='0'
		>
			<>
				<Button
					disabled={!isEditable}
					onClick={handleOpen}
					buttonStyle={{
						bgcolor: '#FFFFFF',
						color: '#223367',
						weight: 500,
						height: { desktop: 60 },
					}}
					margin={{
						desktop: '0 25px 0 0',
						laptop: '0 25px 0 0',
						planshet: '0 0 20px 0',
					}}
					startIcon={<AddIcon />}
					endIcon={<ArrowDown />}
				>
					{t('create')}
				</Button>
				<Popover
					open={Boolean(anchorEl)}
					onClose={handleClose}
					anchorEl={anchorEl}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
					transformOrigin={{ horizontal: 'left', vertical: 'top' }}
					PaperProps={{
						style: {
							marginTop: 10,
						},
					}}
				>
					<StaffPopover>
						<PopoverRow onClick={() => handleOpenModal('cashier')}>
							{t('cashier')}
						</PopoverRow>

						<PopoverRow onClick={() => handleOpenModal('manager')} light={true}>
							{t('manager')}
						</PopoverRow>
					</StaffPopover>
				</Popover>
			</>

			{/* Settings side  */}
			{location.pathname !== '/staff/manager' && (
				<Button
					disabled={!isEditable}
					onClick={
						location.pathname !== '/staff/manager/setting'
							? handleOpenSetting
							: () => {
									console.log('Manager');
							  }
					}
					buttonStyle={{
						bgcolor: '#FFFFFF',
						color: '#223367',
						weight: 500,
						height: { desktop: 60 },
					}}
					margin={{
						desktop: '0 25px 0 0',
						laptop: '0 25px 0 0',
						planshet: '0 0 20px 0',
					}}
					startIcon={<SettingsIcon />}
				>
					{t('settings')}
				</Button>
			)}

			{/* Filter side  */}
			{location.pathname !== '/staff/manager' && (
				<Button
					buttonStyle={{
						shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
						bgcolor: '#FFFFFF',
						color: '#223367',
						weight: 500,
						height: { desktop: 60 },
					}}
					margin={{
						desktop: '0 25px 0 0',
						laptop: '0 25px 0 0',
						planshet: '0 0 20px 0',
					}}
					startIcon={<FilterIcon />}
					onClick={() => {
						dispatch(setOpenFilter(!open));
						dispatch(setSelectedCashiers([]));
					}}
				>
					{t('filters')}
				</Button>
			)}

			{/* <div style={{ width: '70px' }} /> */}
			<Input
				inputStyle={{ border: 'none' }}
				IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
				value={query}
				placeholder='Поиск по сотрудникам'
				onChange={(e) => dispatch(setQuery(e.target.value))}
				width={{ maxwidth: 700 }}
			/>
		</Flex>
	);
};

export default Header;

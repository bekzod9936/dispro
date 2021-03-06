import dayjs from 'dayjs';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import useCashiers from '../../../../hooks/useCashiers';
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
	ImageWrap,
	CashierCollection,
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
import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import RippleEffect from 'components/Custom/RippleEffect';
import {
	setOpenEditCashier,
	setCashierId,
	setSelectedCashiers,
} from 'services/redux/Slices/staffs';
import { usePermissions } from 'services/hooks/usePermissions';

const CashierBar = () => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const isEditable = usePermissions('staff');
	const { deleteCashier, open, setOpen } = useCashiers({
		page: 1,
		query: '',
		period: '',
	});

	const allCashier = useAppSelector((state) => state.staffs.allCashiers);
	const selectedCashiers = useAppSelector(
		(state) => state.staffs.selectedCashiers
	);

	const staffsDiv = () => {
		if (selectedCashiers?.length === 1) {
			return (
				<CashierCard>
					<UpSide>
						<CashierRow>
							<CashierCol>
								<BarNormalText>????????????</BarNormalText>
							</CashierCol>

							<CashierCol>
								<RippleEffect
									onClick={() => {
										dispatch(setSelectedCashiers([]));
									}}
								>
									<ExitIcon />
								</RippleEffect>
							</CashierCol>
						</CashierRow>
						<CashierRow justifyContent='flex-start' marginTop='15px'>
							<CashierCol>
								<ImageWrap>
									{selectedCashiers[0].logo !== '' ? (
										<ImgDiv>
											<Img
												src={selectedCashiers[0].logo}
												effect='blur'
												height='100%'
												width='100%'
											/>
										</ImgDiv>
									) : (
										<Logo />
									)}
								</ImageWrap>
							</CashierCol>
							<CashierCol>
								<BarTitle>{selectedCashiers[0].firstName}</BarTitle>
								<BarText>
									{dayjs(selectedCashiers[0].createdAt).format('DD.MM.YYYY')}
								</BarText>
							</CashierCol>
						</CashierRow>
						<Break />
						<CashierRow justifyContent='center'>
							<CashierCol>
								<Img src={CashierAvg} effect='blur' />
							</CashierCol>
							<BreakH width={16} />
							<CashierCol>
								<BarSecondText>?????????????? ??????</BarSecondText>
								<CountText>{selectedCashiers[0].avgCheque}</CountText>
							</CashierCol>
						</CashierRow>
						<Break />
						<CashierRow justifyContent='center'>
							<CashierCol>
								<Img src={CashierRecommend} effect='blur' />
							</CashierCol>
							<BreakH width={16} />
							<CashierCol>
								<BarSecondText>????????????????????????</BarSecondText>
								<CountText>{selectedCashiers[0].countRefer}</CountText>
							</CashierCol>
						</CashierRow>
						<Break />
						<CashierRow justifyContent='center'>
							<Button
								disabled={!isEditable}
								onClick={() => {
									dispatch(setOpenEditCashier(true));
								}}
								padding={{
									desktop: '14px 25px',
									laptop: '14px 25px',
								}}
								buttonStyle={{
									bgcolor: '#fff',
									hoverbgcolor: 'rgba(96, 110, 234, 0.1)',
									radius: `14px`,
									color: '#606EEA',
								}}
								endIcon={<EditIcon />}
							>
								??????????????????????????
							</Button>
						</CashierRow>
					</UpSide>
					<DownSide>
						<CashierRow justifyContent='space-between'>
							<Button
								onClick={() => {
									history.push({
										pathname: '/staff/cashier/statistic',
										state: {
											prevPage: location.pathname,
											id: selectedCashiers[0].id,
										},
									});
									dispatch(setCashierId(selectedCashiers[0].id));
									dispatch(setSelectedCashiers([]));
								}}
								startIcon={<UserIcon />}
							>
								???????????????? ??????????????
							</Button>
						</CashierRow>
						<CashierRow justifyContent='space-between'>
							<Button
								disabled={!isEditable}
								buttonStyle={{
									bgcolor: '#fff',
									color: '#FF5E68',
								}}
								onClick={() => {
									setOpen(true);
								}}
								startIcon={<DeleteIcon />}
							>
								?????????????? ??????????????
							</Button>
						</CashierRow>
					</DownSide>
				</CashierCard>
			);
		} else if (selectedCashiers?.length > 1) {
			return (
				<CashierCard>
					<UpSide>
						<CashierRow>
							<CashierCol>
								<BarNormalText>
									?????????????? {selectedCashiers?.length}
								</BarNormalText>
							</CashierCol>

							<CashierCol>
								<RippleEffect
									onClick={() => {
										dispatch(setSelectedCashiers([]));
									}}
								>
									<ExitIcon />
								</RippleEffect>
							</CashierCol>
						</CashierRow>

						<CashierCollection>
							{selectedCashiers.map((item: any, index: number) => {
								return (
									<ButtonKeyWord>
										{item?.firstName}
										<IconButton
											onClick={() => {
												let filteredItem = selectedCashiers?.filter(
													(it: any) => it.id !== item.id
												);
												dispatch(setSelectedCashiers(filteredItem));
											}}
										>
											<DeleteIc color='#C4C4C4' />
										</IconButton>
									</ButtonKeyWord>
								);
							})}
						</CashierCollection>

						<Break height={20} />

						<CashierRow justifyContent='center'>
							<CashierCol>
								<Button
									buttonStyle={{
										bgcolor: '#fff',
										color: '#3492FF',
									}}
									onClick={() => {
										dispatch(setSelectedCashiers(allCashier));
									}}
								>
									?????????????? ???????? ????????????????
								</Button>
							</CashierCol>
						</CashierRow>
						<Break height={10} />

						<CashierRow justifyContent='center'>
							<CashierCol>
								<Button
									buttonStyle={{
										bgcolor: '#fff',
										color: '#3492FF',
									}}
									onClick={() => {
										dispatch(setSelectedCashiers([]));
									}}
								>
									?????????? ??????????????????
								</Button>
							</CashierCol>
						</CashierRow>
					</UpSide>
					<DownSide>
						<CashierRow>
							<CashierCol>
								<CashierRow justifyContent='space-between'>
									<Button
										buttonStyle={{
											bgcolor: '#FF5E68',
											color: '#fff',
										}}
										onClick={() => {
											setOpen(true);
										}}
										startIcon={<TrashWhite />}
									>
										?????????????? ????????????????
									</Button>
								</CashierRow>
							</CashierCol>
						</CashierRow>
					</DownSide>
				</CashierCard>
			);
		}
	};
	return (
		<BarContainer>
			{staffsDiv()}

			{/* delete cashier */}
			<Modal open={open}>
				<ModalContent>
					<ModalBody>
						<BarTitle>
							{selectedCashiers.length === 1
								? `???? ?????????????? ?????? ???????????? ?????????????? ???????????????`
								: `???? ?????????????? ?????? ???????????? ?????????????? ?????????????????`}
						</BarTitle>
						<Break height={15} />
						{selectedCashiers.length > 1
							? selectedCashiers.map((item: any, index: number) => {
									return (
										<ButtonKeyWord key={index}>
											{item?.firstName}
											<IconButton
												onClick={() => {
													let filteredItem = selectedCashiers?.filter(
														(it: any) => it.id !== item.id
													);
													dispatch(setSelectedCashiers(filteredItem));
												}}
											>
												<DeleteIc color='#C4C4C4' />
											</IconButton>
										</ButtonKeyWord>
									);
							  })
							: selectedCashiers.map((item: any) => {
									return <BarText>{item?.firstName}</BarText>;
							  })}
					</ModalBody>
					<Break height={35} />
					<ModalAction>
						<Button
							buttonStyle={{
								bgcolor: '#fff',
								color: '#223367',
							}}
							onClick={() => {
								setOpen(false);
							}}
							startIcon={<CancelIcon />}
						>
							{t('cancel')}
						</Button>
						<Button
							buttonStyle={{
								bgcolor: '#FF5E68',
								color: '#fff',
							}}
							disabled={deleteCashier.isLoading}
							onClick={() => {
								deleteCashier.mutate(
									selectedCashiers.map((item: any) => item.id)
								);
							}}
							startIcon={<DeleteWhiteIcon />}
						>
							{t('delete')}
						</Button>
					</ModalAction>
				</ModalContent>
			</Modal>
		</BarContainer>
	);
};

export default CashierBar;

import { useEffect } from 'react';
import { lazy, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

//helpers
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
import { SpinnerDiv } from 'pages/CompanyPages/staff/style';
import useStaffRoute from '../../routes';
import useCashierCard from './hooks/useCashierCard';
import { numberWith } from 'services/utils';
import useStaff from '../../hooks/useStaff';
import useCashiers from '../../hooks/useCashiers';
import { setOpenEditCashier } from 'services/redux/Slices/staffs';

//components
import IconButton from '@material-ui/core/IconButton';
import EditCashier from '../../screens/CashierScreen/components/EditCashier';
import NavBar from 'components/Custom/NavBar';
import Spinner from 'components/Helpers/Spinner';
import Button from 'components/Custom/Button';
import { SideBar } from 'pages/CompanyPages/staff/components/SideBar';
import QrBar from './components/QrBar';
import BallTable from './components/BallTable';
import Popover from 'components/Custom/Popover';
import Modal from 'components/Custom/Modal';

//styles
import {
	CardContainer,
	StaticDiv,
	StatisticCol,
	Content,
	Title,
	Value,
	StaticIcon,
	CashierInfo,
	StaffImg,
	StaffCol,
	StaffName,
	StaffText,
	Break,
	StaffSecondText,
	StaffAction,
	Side,
	Flex,
	ContentTable,
	Wrapper,
	QRIcon,
	DotsWrap,
	DotsIcon,
	SelectWrap,
	Edit,
	Delete,
	ModalContent,
	ModalBody,
	ModalAction,
	BarTitle,
	BarText,
} from './style';
import { CashierWrapTitle, TitleText } from '../CashierSettings/style';

//icons
import { ReactComponent as Money } from 'assets/icons/CashierData/money.svg';
import { ReactComponent as MoneyBag } from 'assets/icons/StatistisPage/money.svg';
import { ReactComponent as Basket } from 'assets/icons/CashierData/basket.svg';
import { ReactComponent as Score } from 'assets/icons/StatistisPage/score.svg';
import { ReactComponent as Cashback } from 'assets/icons/CashierData/cashback.svg';
import { ReactComponent as TotalClients } from 'assets/icons/StatistisPage/users.svg';
import { ReactComponent as Discount } from 'assets/icons/CashierData/discount.svg';
import { ReactComponent as PaidWithPoints } from 'assets/icons/CashierData/paidWthPoints.svg';
import { ReactComponent as ArrowBack } from 'assets/icons/arrow_back.svg';
import { ReactComponent as DeleteWhiteIcon } from 'assets/icons/trash_white.svg';
import defaultImg from 'assets/images/staff_default.png';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';

const CashierBalls = lazy(() => import('./screens/CashierBalls'));
const CashierFeedback = lazy(() => import('./screens/CashierFeedback'));

const CashierCard = () => {
	const history: any = useHistory();
	const { branches } = useStaff();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { pathname, state }: any = useLocation();
	const { menuItems } = useStaffRoute();
	const { isLoading, openQr, setOpenQr, handleOption, refetch } =
		useCashierCard();
	const { staffData } = useAppSelector((state) => state.staffs);
	const prevPage: any = state?.prevPage || '/staff';
	const cashierId: any = state?.id;
	const [closeFun, setCloseFun] = useState<any>();
	const openEdit = useAppSelector((state) => state.staffs.openEditCashier);

	const { deleteCashier, open, setOpen } = useCashiers({
		page: 1,
		query: '',
		period: '',
	});

	useEffect(() => {
		let id: any = history?.location?.state?.id;
	}, []);

	const getStoreName = (storeIds: any) => {
		let branch: any = '';
		if (branches?.length) {
			branch = branches.find((item: any) => item.value === storeIds)?.label;
		} else {
			branch = '';
		}

		return branch;
	};
	const renderData = () => {
		if (isLoading) {
			return (
				<SpinnerDiv>
					<Spinner />
				</SpinnerDiv>
			);
		} else if (pathname === '/staff/cashier/statistic') {
			const statistic = staffData?.operations;
			const statClient = staffData?.clients;
			return (
				<StaticDiv>
					<StatisticCol>
						<StaticIcon>
							<Money />
						</StaticIcon>
						<Content>
							<Title>Оплаченно в UZS</Title>
							<Value>{numberWith(statistic?.payCount, ' ')}</Value>
						</Content>
					</StatisticCol>
					<StatisticCol>
						<StaticIcon>
							<MoneyBag />
						</StaticIcon>
						<Content>
							<Title>Сумма всех покупок</Title>
							<Value>{numberWith(statistic?.discountSum, ' ')}</Value>
						</Content>
					</StatisticCol>
					<StatisticCol>
						<StaticIcon>
							<Basket />
						</StaticIcon>
						<Content>
							<Title>Совершено покупок</Title>
							<Value>{numberWith(statClient?.countCheque, ' ')}</Value>
						</Content>
					</StatisticCol>
					<StatisticCol>
						<StaticIcon>
							<TotalClients />
						</StaticIcon>
						<Content>
							<Title>Всего клиентов</Title>
							<Value>{numberWith(statClient?.countClient, ' ')}</Value>
						</Content>
					</StatisticCol>
					<StatisticCol>
						<StaticIcon>
							<Score />
						</StaticIcon>
						<Content>
							<Title>Баллов клиентам</Title>
							<Value>{numberWith(statClient?.pointSum, ' ')}</Value>
						</Content>
					</StatisticCol>
					<StatisticCol>
						<StaticIcon>
							<Discount />
						</StaticIcon>
						<Content>
							<Title>Скидка</Title>
							<Value>{numberWith(statistic?.discountSum, ' ')}</Value>
						</Content>
					</StatisticCol>
					<StatisticCol>
						<StaticIcon>
							<Cashback />
						</StaticIcon>
						<Content>
							<Title>Кешбэк</Title>
							<Value>{numberWith(statistic?.cashbackSum, ' ')}</Value>
						</Content>
					</StatisticCol>
					<StatisticCol>
						<StaticIcon>
							<PaidWithPoints />
						</StaticIcon>
						<Content>
							<Title>Оплатили баллами</Title>
							<Value>{numberWith(statistic?.pointSum, ' ')}</Value>
						</Content>
					</StatisticCol>
				</StaticDiv>
			);
		} else if (pathname === '/staff/cashier/feedback') {
			return <CashierFeedback />;
		}
	};

	const cashierBallTable = () => {
		if (pathname === '/staff/cashier/balls') {
			return <BallTable />;
		}
		return '';
	};

	const cashierBalls = () => {
		if (pathname === '/staff/cashier/balls') {
			return <CashierBalls ballCount={staffData?.cashierPointsSum} />;
		}

		return '';
	};

	const handleClose = (e: any) => {
		setCloseFun(e);
	};

	return (
		<CardContainer className='dsds'>
			<CashierWrapTitle>
				<IconButton
					onClick={() => {
						history.push(prevPage);
					}}
				>
					<ArrowBack />
				</IconButton>
				<TitleText>Данные по кассиру</TitleText>
			</CashierWrapTitle>
			<Wrapper>
				<div>
					<Break height={20} />
					{!isLoading && (
						<CashierInfo>
							<StaffCol>
								<StaffImg>
									<LazyLoadImage
										src={defaultImg}
										alt='image'
										style={{
											objectFit: 'cover',
										}}
										height='100%'
										width='100%'
									/>
								</StaffImg>
							</StaffCol>
							<StaffCol>
								<StaffName>
									{staffData?.firstName} {staffData?.lastName}
								</StaffName>
								<Break height={5} />
								<StaffText>{staffData?.telNumber}</StaffText>
							</StaffCol>
							<StaffCol>
								<StaffSecondText>Филиал</StaffSecondText>
								<Break height={5} />
								<StaffText>{getStoreName(staffData?.storeIds[0])}</StaffText>
							</StaffCol>
							<StaffCol>
								<StaffSecondText>Комментарий</StaffSecondText>
								<Break height={5} />
								<StaffText>{staffData?.comment}</StaffText>
							</StaffCol>
							<StaffCol>
								<Button
									buttonStyle={{
										bgcolor: 'rgba(96, 110, 234, 0.1)',
										color: '#606EEA',
									}}
									onClick={() => {
										setOpenQr(true);
									}}
								>
									QR код кассира
									<QRIcon />
								</Button>
							</StaffCol>
							<StaffAction>
								<Popover
									click={
										<DotsWrap>
											<DotsIcon />
										</DotsWrap>
									}
									anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
									transformOrigin={{ horizontal: 'right', vertical: 24 }}
									openBgColor='rgba(96, 110, 234, 0.1)'
									radius={14}
									popoverStyle={{
										marginTop: '20px',
									}}
									onClose={handleClose}
								>
									<SelectWrap>
										<Edit
											onClick={() => {
												dispatch(setOpenEditCashier(true));
												closeFun?.close();
											}}
										>
											{t('edit')}
										</Edit>
										<Delete
											onClick={() => {
												setOpen(true);
												closeFun?.close();
											}}
										>
											{t('delete')}
										</Delete>
									</SelectWrap>
								</Popover>
							</StaffAction>
						</CashierInfo>
					)}
					<Flex>
						<Side>
							<NavBar
								list={menuItems.filter((item) =>
									item.path.includes('/staff/cashier')
								)}
								margin='20px 0 0'
								padding='0 10px 10px 0'
							/>
							{cashierBalls()}
						</Side>

						<Side>
							<ContentTable>{cashierBallTable()}</ContentTable>
						</Side>
					</Flex>
					{renderData()}

					<SideBar isOpen={openQr}>
						<QrBar
							closeQr={() => {
								setOpenQr(false);
							}}
							qrLink={staffData?.cashierRefLink || ''}
						/>
					</SideBar>
				</div>
			</Wrapper>
			{/* delete cashier */}
			<Modal open={open}>
				<ModalContent>
					<ModalBody>
						<BarTitle>Вы уверены что хотите удалить кассира?</BarTitle>
						<Break height={15} />
						<BarText>{`${staffData?.firstName} ${staffData?.lastName}`}</BarText>
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
								deleteCashier.mutate(cashierId);
							}}
							startIcon={<DeleteWhiteIcon />}
						>
							{t('delete')}
						</Button>
					</ModalAction>
				</ModalContent>
			</Modal>
			{/* edit cashier */}
			<EditCashier openEdit={openEdit} refetch={refetch} />
		</CardContainer>
	);
};

export default CashierCard;

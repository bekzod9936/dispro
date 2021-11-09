import { lazy } from 'react';
import NavBar from 'components/Custom/NavBar';
import IconButton from '@material-ui/core/IconButton';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
import { useLocation, useHistory } from 'react-router-dom';
import { SpinnerDiv } from 'pages/CompanyPages/staff/style';
import useStaffRoute from '../../routes';
import { ReactComponent as Money } from 'assets/icons/CashierData/money.svg';
import { ReactComponent as MoneyBag } from 'assets/icons/StatistisPage/money.svg';
import { ReactComponent as Basket } from 'assets/icons/CashierData/basket.svg';
import { ReactComponent as Score } from 'assets/icons/StatistisPage/score.svg';
import { ReactComponent as Cashback } from 'assets/icons/CashierData/cashback.svg';
import { ReactComponent as TotalClients } from 'assets/icons/StatistisPage/users.svg';
import { ReactComponent as Discount } from 'assets/icons/CashierData/discount.svg';
import { ReactComponent as PaidWithPoints } from 'assets/icons/CashierData/paidWthPoints.svg';
import { ReactComponent as ArrowBack } from 'assets/icons/arrow_back.svg';
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
} from './style';
import useCashierCard from './hooks/useCashierCard';
import Spinner from 'components/Helpers/Spinner';
import { numberWith } from 'services/utils';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect } from 'react';
import { setCashierId } from 'services/redux/Slices/staffs';
import defaultImg from 'assets/images/staff_default.png';
import useStaff from '../../hooks/useStaff';
import Button from 'components/Custom/Button';
import { ThreeDotsIcon } from 'assets/icons/SettingsIcons/SettingsPageIcon';
import { SideBar } from 'pages/CompanyPages/staff/components/SideBar';
import QrBar from './components/QrBar';
import { CashierWrapTitle, TitleText } from '../CashierSettings/style';
import BallTable from './components/BallTable';

const CashierBalls = lazy(() => import('./screens/CashierBalls'));
const CashierFeedback = lazy(() => import('./screens/CashierFeedback'));

const CashierCard = () => {
	const history = useHistory();
	const { branches } = useStaff();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { pathname, state }: any = useLocation();
	const { menuItems } = useStaffRoute();
	const { isLoading, openQr, setOpenQr } = useCashierCard();
	const staffData = useAppSelector((state) => state.staffs.staffData);
	const cashierId = useAppSelector((state) => state.staffs.cashierId);
	const prevPage: any = state?.prevPage || '/staff';

	console.log(staffData, 'staf');

	useEffect(() => {
		if (cashierId === '') {
			dispatch(setCashierId(state?.id));
		}
	}, [cashierId]);

	const getStoreName = (storeId: any) => {
		let branch: any = '';
		if (branches?.length) {
			branch = branches.find((item: any) => item.value === storeId)?.label;
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
								<StaffText>{getStoreName(staffData?.storeId)}</StaffText>
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
								<IconButton>
									<ThreeDotsIcon />
								</IconButton>
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
		</CardContainer>
	);
};

export default CashierCard;

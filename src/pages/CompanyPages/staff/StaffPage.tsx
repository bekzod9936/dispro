import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Switch,
	Route,
	useHistory,
	useLocation,
	Redirect,
} from 'react-router-dom';

//helpers

import useStaffRoute from './routes';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setQuery } from 'services/redux/Slices/staffs';

//Components
import NavBar from 'components/Custom/NavBar';
import { Title } from 'components/Layout/Header/style';
import Spinner from 'components/Helpers/Spinner';
import Header from './components/Header';
import CreateCashier from './screens/CashierScreen/components/CreateCashier';
import CreateManager from './screens/ManagerScreen/components/CreateManager';

//Styles
import { MainWrapper, Flex, SpinnerDiv } from './style';

const StaffPage = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const history = useHistory();
	const { t } = useTranslation();
	const { menuItems, staffPath } = useStaffRoute();
	const { openManager, openCash } = useAppSelector((state) => state.staffs);

	const [closeFun, setCloseFun] = useState<any>();
	const handleClose = (e: any) => {
		setCloseFun(e);
	};

	const handleOpen = () => {};

	const handleOpenSetting = () => {
		history.push({
			pathname: '/staff/setting',
			state: { prevPage: location.pathname },
		});
		dispatch(setQuery(''));
	};

	return (
		<MainWrapper id='drawer-container'>
			{location.pathname !== '/staff/setting' &&
			!location.pathname.includes('/staff/cashier/') ? (
				<>
					<Title>{t('staff')}</Title>

					<Flex width='90%' height='85px' alignItems='flex-start' margin='0'>
						<NavBar list={staffPath} margin='20px 0' padding='0 10px 10px 0' />
					</Flex>

					<Header
						closeFun={closeFun}
						handleOpen={handleOpen}
						handleOpenSetting={handleOpenSetting}
						handleClose={handleClose}
					/>
				</>
			) : null}

			<Switch>
				<Suspense
					fallback={
						<SpinnerDiv>
							<Spinner />
						</SpinnerDiv>
					}
				>
					{menuItems.map((item) => {
						return <Route exact path={item.path} component={item.component} />;
					})}
					<Route path='*'>
						<Redirect to={menuItems[0].path} />
					</Route>
				</Suspense>
			</Switch>

			{/* create new cashier  */}
			<CreateCashier openCash={openCash} />
			<CreateManager openManager={openManager} />
		</MainWrapper>
	);
};

export default StaffPage;

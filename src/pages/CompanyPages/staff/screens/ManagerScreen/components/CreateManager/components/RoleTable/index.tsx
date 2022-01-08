import { useState, useEffect, useRef } from 'react';
import { IProps } from './types';
import {
	Container,
	Table,
	TableTd,
	TableTh,
	TableTr,
	WrapRadio,
	ModalAction,
	DisabledText,
	DisabledWrap,
	SelectedUser,
	WrapperScroll,
} from './style';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
import useManagers from 'pages/CompanyPages/staff/hooks/useManagers';
import { getPermission } from 'services/queries/staffQuery';
import { useQuery } from 'react-query';
import Spinner from 'components/Custom/Spinner';
import Button from 'components/Custom/Buttons/Button';
import { setOpenManager, setStepManager } from 'services/redux/Slices/staffs';
import { ReactComponent as SaveIcon } from 'assets/icons/IconsInfo/save.svg';
import { ReactComponent as DisableBtn } from 'assets/icons/Staff/disableBtn.svg';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { MRadio as Radio } from './style';

const permissionsRole: any = {
	info: [],
	news: [],
	staff: [],
	orders: [],
	clients: [],
	feedback: [],
	finances: [],
	services: [],
	settings: [],
	proposals: [],
	statistics: [],
	notifications: [],
	// support: [],
};

const RoleTable = ({ handleClose }: IProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const errorRef = useRef<null | HTMLSpanElement>(null);
	const permissions = useAppSelector((state) => state.staffs.permissions);
	const { managers } = useAppSelector((state) => state.staffs);
	const [state, setState] = useState<any>({});
	const [managerName, setManagerName] = useState<any>();
	const managerId = useAppSelector((state) => state.staffs.managerId);
	const parentRef = useRef<any | null>(null);
	const { saveRoleManager } = useManagers({
		page: 1,
		query: '',
		period: '',
	});

	const userName = managers?.find((item: any) => item.id == managerId);

	const { isFetching } = useQuery(
		'permission',
		() => getPermission(managerId),
		{
			retry: 0,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				let res = null;
				let mName = `${data.data.data.firstName} ${data.data.data.lastName}`;
				if (data.data.data.permissions) {
					res = { ...data.data.data.permissions };
					delete res.support;
				}
				setManagerName(mName);
				setState(res || permissionsRole);
			},
		}
	);
	useEffect(() => {
		let res = Object.keys(state).every((el) => state[el].join('') == '');
		if (res) {
			parentRef?.current?.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	}, [state]);

	const onSave = () => {
		saveRoleManager.mutate({ state, id: managerId });
	};

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<>
			<SelectedUser>{managerName}</SelectedUser>
			<WrapperScroll ref={parentRef}>
				{Object.keys(state).every((el) => state[el].join('') === '') ? (
					<DisabledWrap>
						<DisableBtn />
						<DisabledText ref={errorRef}>
							Менеджеру нельзя отключить доступ по всем пунктам
						</DisabledText>
					</DisabledWrap>
				) : null}
				<Container>
					<Table>
						<tr>
							<TableTh></TableTh>
							<TableTh>
								Полный доступ
								<WrapRadio>
									<Radio
										color='secondary'
										onChange={() =>
											setState({
												info: [1],
												news: [1],
												staff: [1],
												orders: [1],
												clients: [1],
												feedback: [1],
												finances: [1],
												services: [1],
												settings: [1],
												proposals: [1],
												statistics: [1],
												notifications: [1],
											})
										}
										checked={Object.keys(state).every(
											(el) => state[el].join('') == 1
										)}
									/>
								</WrapRadio>
							</TableTh>
							<TableTh>
								Только просмотр
								<WrapRadio>
									<Radio
										onChange={() =>
											setState({
												info: [2],
												news: [2],
												staff: [2],
												orders: [2],
												clients: [2],
												feedback: [2],
												finances: [2],
												services: [2],
												settings: [2],
												proposals: [2],
												statistics: [2],
												notifications: [2],
											})
										}
										checked={Object.keys(state).every(
											(el) => state[el].join('') == 2
										)}
									/>
								</WrapRadio>
							</TableTh>
							<TableTh>Без доступа</TableTh>
						</tr>
						<tbody>
							{Object.keys(state).map((el) => (
								<TableTr>
									<TableTd>{t(el)}</TableTd>
									<TableTd>
										<Radio
											onChange={() =>
												setState((prev: any) => ({ ...prev, [el]: [1] }))
											}
											checked={state[el].join('') == 1}
										/>
									</TableTd>
									<TableTd>
										<WrapRadio>
											<Radio
												onChange={() =>
													setState((prev: any) => ({ ...prev, [el]: [2] }))
												}
												checked={state[el].join('') == 2}
											/>
										</WrapRadio>
									</TableTd>
									<TableTd>
										<WrapRadio>
											<Radio
												color='primary'
												onChange={() =>
													setState((prev: any) => ({ ...prev, [el]: [] }))
												}
												checked={state[el].join('') == ''}
											/>
										</WrapRadio>
									</TableTd>
								</TableTr>
							))}
						</tbody>
					</Table>
				</Container>
			</WrapperScroll>
			<ModalAction justifyContent='center' mTop={25}>
				<Button
					buttonStyle={{
						bgcolor: 'white',
						color: '#223367',
					}}
					onClick={handleClose}
					startIcon={<CancelIcon />}
				>
					{t('cancel')}
				</Button>

				<Button
					disabled={Object.keys(state).every((el) => state[el].join('') === '')}
					onClick={() => {
						dispatch(setOpenManager(false));
						dispatch(setStepManager(1));
						onSave();
					}}
					startIcon={<SaveIcon />}
				>
					{t('save')}
				</Button>
			</ModalAction>
		</>
	);
};

export default RoleTable;

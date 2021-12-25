import { useState } from 'react';
import dayjs from 'dayjs';
import useManagers from 'pages/CompanyPages/staff/hooks/useManagers';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
import {
	ManagerRow,
	ManagerCol,
	ManagerCard,
	UpSide,
	DownSide,
	BarText,
	BarContainer,
	BarNormalText,
	BarTitle,
	Break,
	Img,
	CommentText,
	CommentContent,
	ButtonKeyWord,
	ManagerCollection,
	DeleteIc,
	ImageWrap,
} from './style';
import { IconButton } from '@material-ui/core';
import { useUploadImage } from 'pages/CompanyPages/staff/hooks/useUploadIMage';
//components
import { ReactComponent as Logo } from 'assets/icons/cashier_logo_placeholder.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit_cashier.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete_setting.svg';
import { ReactComponent as DeleteWhiteIcon } from 'assets/icons/trash_white.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';
import { ReactComponent as RoleIcon } from 'assets/icons/role_icon.svg';
import NoPhoto from 'assets/images/NoPhotos.png';

import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import RippleEffect from 'components/Custom/RippleEffect';
import {
	setOpenEditManager,
	setOpenManager,
	setSelectedManagers,
	setStepManager,
	setManagerId,
} from 'services/redux/Slices/staffs';
import {
	ModalAction,
	ModalBody,
	ModalContent,
} from '../../../CashierScreen/style';

const ManagerBar: React.FC<any> = ({}) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const [imgError, setImgError] = useState(false);

	const { roleManager, deleteManager, open, setOpen } = useManagers({
		page: 1,
		query: '',
		period: '',
	});
	const allManager = useAppSelector((state) => state.staffs.allManagers);
	const selectedManagers = useAppSelector(
		(state) => state.staffs.selectedManagers
	);

	//   Комментарий
	const staffsDiv = () => {
		if (selectedManagers?.length === 1) {
			return (
				<ManagerCard>
					<UpSide>
						<ManagerRow justifyContent='center'>
							<ManagerCol>
								<ImageWrap>
									{selectedManagers[0].logo.startsWith('https://') ? (
										<Img
											src={selectedManagers[0].logo}
											effect='blur'
											height='100%'
											width='100%'
											// onError={(e: any) => (e?.target?.src = `${NoPhoto}`)}
										/>
									) : (
										<Logo />
									)}
								</ImageWrap>
							</ManagerCol>
							<ManagerCol>
								<BarTitle>{selectedManagers[0].firstName}</BarTitle>
								<BarText>
									{dayjs(selectedManagers[0].createdAt).format('DD.MM.YYYY')}
								</BarText>
							</ManagerCol>
						</ManagerRow>
						<Break />
						<ManagerRow justifyContent='flex-start'>
							<ManagerCol>
								<CommentText>{t('comment')}</CommentText>
							</ManagerCol>
						</ManagerRow>
						<Break height={10} />
						<ManagerRow justifyContent='flex-start'>
							<CommentContent>{selectedManagers[0].comment}</CommentContent>
						</ManagerRow>
						<Break />
						<ManagerRow justifyContent='center'>
							<ManagerCol>
								<Button
									endIcon={<EditIcon />}
									buttonStyle={{
										bgcolor: 'transparent',
										color: '#606EEA',
									}}
									onClick={() => {
										dispatch(setOpenEditManager(true));
									}}
								>
									{t('edit')}
								</Button>
							</ManagerCol>
						</ManagerRow>
						<Break height={21} />
						<ManagerRow justifyContent='center'>
							<Button
								buttonStyle={{
									bgcolor: 'rgba(96, 110, 234, 0.1)',
									color: '#606EEA',
								}}
								onClick={() => {
									roleManager.mutate(selectedManagers[0].id);
									dispatch(setOpenManager(true));
									dispatch(setStepManager(2));
									dispatch(setManagerId(selectedManagers[0].id));
								}}
								endIcon={<RoleIcon />}
							>
								{t('change_access')}
							</Button>
						</ManagerRow>
					</UpSide>

					<DownSide>
						<ManagerRow justifyContent='space-between'>
							<Button
								buttonStyle={{
									bgcolor: '#fff',
									color: '#FF5E68',
								}}
								onClick={() => {
									setOpen(true);
								}}
								startIcon={<DeleteIcon />}
							>
								Удалить менеджера
							</Button>
						</ManagerRow>
					</DownSide>
				</ManagerCard>
			);
		} else if (selectedManagers?.length > 1) {
			return (
				<ManagerCard>
					<UpSide>
						<ManagerRow>
							<ManagerCol>
								<BarNormalText>
									Выбрано {selectedManagers?.length}
								</BarNormalText>
							</ManagerCol>
							<ManagerCol>
								<RippleEffect
									onClick={() => {
										dispatch(setSelectedManagers([]));
									}}
								>
									<ExitIcon />
								</RippleEffect>
							</ManagerCol>
						</ManagerRow>

						<ManagerCollection>
							{selectedManagers.map((item: any, index: number) => {
								return (
									<ButtonKeyWord>
										{item?.firstName}
										<IconButton
											onClick={() => {
												let filteredItem = selectedManagers?.filter(
													(it: any) => it.id !== item.id
												);
												dispatch(setSelectedManagers(filteredItem));
											}}
										>
											<DeleteIc color='#C4C4C4' />
										</IconButton>
									</ButtonKeyWord>
								);
							})}
						</ManagerCollection>

						<Break height={20} />

						<ManagerRow justifyContent='center'>
							<ManagerCol>
								<Button
									buttonStyle={{
										bgcolor: '#fff',
										color: '#3492FF',
									}}
									onClick={() => {
										dispatch(setSelectedManagers(allManager));
									}}
								>
									Выбрать всех менеджеров
								</Button>
							</ManagerCol>
						</ManagerRow>
						<Break height={10} />

						<ManagerRow justifyContent='center'>
							<ManagerCol>
								<Button
									buttonStyle={{
										bgcolor: '#fff',
										color: '#3492FF',
									}}
									onClick={() => {
										dispatch(setSelectedManagers([]));
									}}
								>
									Снять выделение
								</Button>
							</ManagerCol>
						</ManagerRow>
					</UpSide>
					<DownSide>
						<ManagerRow>
							<ManagerCol>
								<ManagerRow justifyContent='space-between'>
									<Button
										buttonStyle={{
											bgcolor: '#fff',
											color: '#FF5E68',
										}}
										onClick={() => {
											setOpen(true);
										}}
										startIcon={<DeleteIcon />}
									>
										Удалить менеджеров
									</Button>
								</ManagerRow>
							</ManagerCol>
						</ManagerRow>
					</DownSide>
				</ManagerCard>
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
							{selectedManagers.length === 1
								? `Вы уверены что хотите удалить менеджера?`
								: `Вы уверены что хотите удалить менеджеров?`}
						</BarTitle>
						<Break height={15} />
						<ManagerCollection>
							{selectedManagers.length > 1
								? selectedManagers.map((item: any, index: number) => {
										return (
											<ButtonKeyWord key={index}>
												{item?.firstName}
												<IconButton
													onClick={() => {
														let filteredItem = selectedManagers?.filter(
															(it: any) => it.id !== item.id
														);
														dispatch(setSelectedManagers(filteredItem));
													}}
												>
													<DeleteIc color='#C4C4C4' />
												</IconButton>
											</ButtonKeyWord>
										);
								  })
								: selectedManagers.map((item: any) => {
										return <BarText>{item?.firstName}</BarText>;
								  })}
						</ManagerCollection>
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
							disabled={deleteManager.isLoading}
							onClick={() => {
								deleteManager.mutate(
									selectedManagers.map((item: any) => item.id)
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

export default ManagerBar;

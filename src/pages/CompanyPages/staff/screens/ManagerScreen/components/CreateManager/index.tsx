import { useEffect } from 'react';
import { IProps } from './types';
import { Controller } from 'react-hook-form';
import Input from 'components/Custom/Input';
import { Form, FormRow, FormCol, Break, ModalHead, ModalTitle } from './style';
import useStaff from 'pages/CompanyPages/staff/hooks/useStaff';
import useManagers from 'pages/CompanyPages/staff/hooks/useManagers';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FormProps } from './types';
import Modal from 'components/Custom/Modal';
import {
	ModalAction,
	ModalBody,
	ModalContent,
	ModalMain,
} from '../../../CashierScreen/style';
import Radio from 'components/Custom/Radio';
import { IconButton } from '@material-ui/core';
import MultiSelect from 'components/Custom/MultiSelect';
import Button from 'components/Custom/Button';
import { setOpenManager, setStepManager } from 'services/redux/Slices/staffs';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { ReactComponent as NextIcon } from 'assets/icons/sign_tick.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/IconsInfo/save.svg';
import { ReactComponent as Market } from 'assets/icons/SideBar/ilmarket.svg';
import RoleTable from './components/RoleTable';
import useRoles from './components/RoleTable/useRoles';
import { inputPhoneNumber } from 'utilities/inputFormat';

const CreateManager = ({ openManager }: IProps) => {
	const stepManager = useAppSelector((state) => state.staffs.stepManager);
	const selectedRole = useAppSelector((state) => state.staffs.selectedRole);
	const { roles } = useRoles();
	const { branches } = useStaff();

	const { saveRoleManager, modified, setModified, createManager } = useManagers(
		{
			page: 1,
			query: '',
			period: '',
		}
	);

	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		getValues,
		formState: { errors, isValid, isSubmitSuccessful },
	} = useForm<FormProps>({
		mode: 'onChange',
		shouldFocusError: true,
		reValidateMode: 'onChange',
	});

	const onSave = (data: FormProps) => {
		console.log(data, 'data');
		createManager.mutate({
			comment: data.comment,
			firstName: data.firstName,
			lastName: data.lastName,
			storeId: data.storeId?.value,
			telNumber: `+998${data.telNumber}`,
			roleId: 2,
		});
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			setTimeout(() => {
				reset({
					comment: '',
					firstName: '',
					lastName: '',
					storeId: '',
					telNumber: '+998',
				});
			}, 4000);
		}
	}, [isSubmitSuccessful, reset]);

	const tel: any = getValues();

	let checkPhone = inputPhoneNumber({
		value: tel?.telNumber,
	});

	useEffect(() => {
		if (getValues('telNumber') === undefined) {
			setValue('telNumber', '');
		} else {
			setValue('telNumber', checkPhone.newString);
		}
	}, [checkPhone.check, watch('telNumber')]);

	return (
		<Modal open={openManager}>
			{/* first step */}
			{stepManager === 1 && (
				<Form onSubmit={handleSubmit(onSave)}>
					<ModalContent>
						<ModalHead>
							<ModalTitle>{t('adding_manager')}</ModalTitle>
							<IconButton
								onClick={() => {
									dispatch(setOpenManager(false));
									dispatch(setStepManager(1));
								}}
							>
								<ExitIcon />
							</IconButton>
						</ModalHead>
						<ModalBody>
							<FormRow>
								<FormCol>
									<Controller
										control={control}
										name='firstName'
										rules={{ required: true }}
										render={({ field }) => (
											<Input
												label={t('manager_name')}
												error={errors.firstName ? true : false}
												message={t('requiredField')}
												type='string'
												field={field}
												margin={{
													laptop: '20px 0 25px',
												}}
											/>
										)}
									/>
								</FormCol>
								<Break width={25} />
								<FormCol>
									<Controller
										control={control}
										name='lastName'
										rules={{ required: true }}
										render={({ field }) => (
											<Input
												label={t('manager_lastName')}
												error={errors.lastName ? true : false}
												message={t('requiredField')}
												type='string'
												field={field}
												margin={{
													laptop: '20px 0 25px',
												}}
											/>
										)}
									/>
								</FormCol>
							</FormRow>
							<FormRow>
								<Controller
									name='telNumber'
									control={control}
									defaultValue=''
									rules={{
										required: true,
									}}
									render={({ field }) => {
										return (
											<Input
												label={t('phoneNumber')}
												error={errors.telNumber ? true : false}
												message={t('requiredField')}
												type='string'
												field={field}
												fullWidth={true}
												margin={{
													laptop: '20px 0 25px',
												}}
												inputStyle={{ inpadding: '0 20px 0 0' }}
												maxLength={9}
												IconStart={<div className='inputstyle'>+998</div>}
											/>
										);
									}}
								/>
							</FormRow>
							<FormRow>
								<Controller
									control={control}
									name='storeId'
									rules={{
										required: true,
									}}
									render={({ field }) => {
										return (
											<MultiSelect
												icon={<Market />}
												selectStyle={{
													bgcolor: '#eff0fd',
													border: 'none',
													placeholdercolor: '#223367',
													inpadding: '2px 10px 2px 60px',
													placewieght: '500',
												}}
												iconleft={'20px'}
												icondowncolor='#C4C4C4'
												options={branches}
												isMulti={false}
												label={t('choose_branch')}
												placeholder={t('choose_branch')}
												margin={{
													laptop: '20px 0 25px',
												}}
												message={t('requiredField')}
												error={errors.storeId ? true : false}
												field={field}
												isClearable={false}
											/>
										);
									}}
								/>
							</FormRow>
							<FormRow>
								<Controller
									control={control}
									name='comment'
									render={({ field }) => {
										return (
											<Input
												label={t('comment')}
												type='string'
												field={field}
												fullWidth={true}
												minRows={10}
												multiline={true}
												margin={{
													laptop: '20px 0 25px',
												}}
											/>
										);
									}}
								/>
							</FormRow>
						</ModalBody>
						<ModalAction>
							<Button
								buttonStyle={{
									bgcolor: 'white',
									color: '#223367',
								}}
								onClick={() => {
									dispatch(setOpenManager(false));
									dispatch(setStepManager(1));
								}}
								startIcon={<CancelIcon />}
							>
								{t('cancel')}
							</Button>

							<Button
								disabled={!isValid || createManager.isLoading}
								type='submit'
								startIcon={<NextIcon />}
							>
								{t('next')}
							</Button>
						</ModalAction>
					</ModalContent>
				</Form>
			)}

			{/* second step */}
			{stepManager === 2 && (
				<ModalMain>
					<ModalHead>
						<ModalTitle>Настройки доступа</ModalTitle>
						<IconButton
							onClick={() => {
								dispatch(setOpenManager(false));
								dispatch(setStepManager(1));
							}}
						>
							<ExitIcon />
						</IconButton>
					</ModalHead>
					<ModalBody>
						{/* tables  */}
						<RoleTable />
					</ModalBody>
					<ModalAction justifyContent='center' mTop={25}>
						<Button
							buttonStyle={{
								bgcolor: 'white',
								color: '#223367',
							}}
							onClick={() => {
								dispatch(setOpenManager(false));
								dispatch(setStepManager(1));
							}}
							startIcon={<CancelIcon />}
						>
							{t('cancel')}
						</Button>

						<Button
							onClick={() => {
								dispatch(setOpenManager(false));
								dispatch(setStepManager(1));
								if (selectedRole.length > 0) {
									saveRoleManager.mutate(
										selectedRole.map((item: any) => item?.value)
									);
								} else {
									saveRoleManager.mutate(roles.map((item: any) => item?.value));
								}
							}}
							startIcon={<SaveIcon />}
						>
							{t('save')}
						</Button>
					</ModalAction>
				</ModalMain>
			)}
		</Modal>
	);
};

export default CreateManager;

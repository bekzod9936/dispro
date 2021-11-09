import { IProps, FormProps } from './types';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from 'components/Custom/Button';
import Modal from 'components/Custom/Modal';
import {
	ModalAction,
	ModalBody,
	ModalContent,
	ModalHead,
	ModalTitle,
} from '../../../CashierScreen/style';
import { IconButton } from '@material-ui/core';
import MultiSelect from 'components/Custom/MultiSelect';
import Input from 'components/Custom/Input';
import { Form, FormRow, FormCol, Break } from './style';
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/IconsInfo/save.svg';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setOpenEditManager } from 'services/redux/Slices/staffs';
import useStaff from 'pages/CompanyPages/staff/hooks/useStaff';
import useManagers from 'pages/CompanyPages/staff/hooks/useManagers';
import { useEffect } from 'react';

const EditManager = ({ openEdit }: IProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { branches } = useStaff();

	const selectedManagers = useAppSelector(
		(state) => state.staffs.selectedManagers
	);

	const { editManager } = useManagers({
		page: 1,
		query: '',
		period: '',
	});

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm<FormProps>({
		mode: 'onChange',
		shouldFocusError: true,
		reValidateMode: 'onChange',
	});

	const onSave = (data: FormProps) => {
		console.log(data, 'data form');
		editManager.mutate({
			id: selectedManagers[0].id,
			storeId: data.storeId?.value,
			firstName: data.firstName,
			lastName: data.lastName,
			comment: data.comment,
			telNumber: data.telNumber,
		});
	};

	useEffect(() => {
		if (selectedManagers?.length) {
			let firstname = selectedManagers[0].firstName.split(' ')[0];
			let choseBranch: any = branches.find(
				(item: any) => item.value == selectedManagers[0].storeId
			);
			setValue('firstName', firstname);
			setValue('lastName', selectedManagers[0].lastName);
			setValue('comment', selectedManagers[0].comment);
			setValue('telNumber', selectedManagers[0].telNumber);
			setValue('storeId', choseBranch?.value);
		}
	}, [selectedManagers]);

	return (
		<Modal open={openEdit}>
			<Form onSubmit={handleSubmit(onSave)}>
				<ModalContent>
					<ModalHead>
						<ModalTitle>{t('editing_manager')}</ModalTitle>
						<IconButton
							onClick={() => {
								dispatch(setOpenEditManager(false));
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
											defaultValue={'+998'}
											maxLength={13}
											field={field}
											fullWidth={true}
											margin={{
												laptop: '20px 0 25px',
											}}
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
								dispatch(setOpenEditManager(false));
							}}
							startIcon={<CancelIcon />}
						>
							{t('cancel')}
						</Button>

						<Button
							disabled={!isValid || editManager.isLoading}
							type='submit'
							startIcon={<SaveIcon />}
						>
							{t('save')}
						</Button>
					</ModalAction>
				</ModalContent>
			</Form>
		</Modal>
	);
};

export default EditManager;

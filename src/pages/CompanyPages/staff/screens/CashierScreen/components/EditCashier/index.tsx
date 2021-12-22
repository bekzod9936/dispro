import { IProps, FormProps } from './types';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from 'components/Custom/Button';
import Modal from 'components/Custom/Modal';
import { useLocation } from 'react-router-dom';
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
import { ReactComponent as Market } from 'assets/icons/SideBar/ilmarket.svg';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setOpenEditCashier } from 'services/redux/Slices/staffs';
import useStaff from 'pages/CompanyPages/staff/hooks/useStaff';
import useCashiers from 'pages/CompanyPages/staff/hooks/useCashiers';
import { useEffect } from 'react';
import { inputPhoneNumber } from 'utilities/inputFormat';

const EditCashier = ({ openEdit, refetch }: IProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { branches } = useStaff();
	const { pathname, state }: any = useLocation();
	const selectedCashiers = useAppSelector(
		(state) => state.staffs.selectedCashiers
	);
	const cashierId: any = state?.id;

	const { staffData } = useAppSelector((state) => state.staffs);

	const { editCashier } = useCashiers({
		page: 1,
		query: '',
		period: '',
	});

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		getValues,
		formState: { errors, isValid },
	} = useForm<FormProps>({
		mode: 'onChange',
		shouldFocusError: true,
		reValidateMode: 'onChange',
	});

	const storeName = [
		{
			id: selectedCashiers?.length ? selectedCashiers[0].stores[0].id : null,
		},
	];

	const onSave = async (data: FormProps) => {
		console.log('data', data);
		if (selectedCashiers?.length) {
			await editCashier.mutate({
				id: selectedCashiers[0].id,
				storeIds: [data.storeIds[0].value],
				firstName: data.firstName,
				lastName: data.lastName,
				comment: data.comment,
				telNumber: data.telNumber,
				staffRoleId: 3,
			});
		} else {
			await editCashier.mutate({
				id: cashierId,
				storeIds: [data.storeIds[0].value],
				firstName: data?.firstName,
				lastName: data?.lastName,
				comment: data?.comment,
				telNumber: data?.telNumber,
				staffRoleId: 3,
			});
		}
		refetch &&
			setTimeout(() => {
				refetch();
			}, 1500);
	};

	useEffect(() => {
		if (selectedCashiers?.length) {
			let firstname = selectedCashiers[0].firstName.split(' ')[0];

			const tel: string = String(selectedCashiers[0].telNumber).slice(4);
			setValue('firstName', firstname);
			setValue('lastName', selectedCashiers[0].lastName);
			setValue('comment', selectedCashiers[0].comment);
			setValue('telNumber', tel);
			setValue('storeIds', getStoreName(storeName[0]?.id));
		} else {
			let firstname = staffData.firstName;
			const tel: string = String(staffData.telNumber).slice(4);
			setValue('firstName', firstname);
			setValue('lastName', staffData.lastName);
			setValue('comment', staffData.comment);
			setValue('telNumber', tel);
			if (staffData.storeIds) {
				setValue('storeIds', getStoreName(staffData?.storeIds[0]));
			}
		}
	}, [selectedCashiers, staffData]);

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

	const getStoreName = (storeIds: any) => {
		let branch: any;

		if (branches?.length) {
			branch = [
				{
					label: branches.find((item: any) => item.value === storeIds)?.label,
					value: branches.find((item: any) => item.value === storeIds)?.value,
				},
			];
		} else {
			branch = '';
		}
		return branch;
	};

	return (
		<Modal open={openEdit}>
			<Form onSubmit={handleSubmit(onSave)}>
				<ModalContent>
					<ModalHead>
						<ModalTitle>{t('editing_cashier')}</ModalTitle>
						<IconButton
							onClick={() => {
								dispatch(setOpenEditCashier(false));
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
											maxLength='20'
											label={t('cashier_name')}
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
											maxLength='20'
											label={t('cashier_lastName')}
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
											disabled={true}
											label={t('phoneNumber')}
											error={errors.telNumber ? true : false}
											message={t('requiredField')}
											type='string'
											defaultValue={'+998'}
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
								name='storeIds'
								defaultValue={getStoreName(storeName[0]?.id)}
								rules={{
									required: true,
								}}
								render={({ field }) => {
									return (
										<MultiSelect
											isDisabled={true}
											defaultValue={getStoreName(storeName[0]?.id)}
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
											error={errors.storeIds ? true : false}
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
											maxLength='100'
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
								dispatch(setOpenEditCashier(false));
							}}
							startIcon={<CancelIcon />}
						>
							{t('cancel')}
						</Button>

						<Button
							disabled={!isValid || editCashier.isLoading}
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

export default EditCashier;

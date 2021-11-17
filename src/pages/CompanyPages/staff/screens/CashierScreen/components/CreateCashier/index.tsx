import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Custom/Modal';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import MultiSelect from 'components/Custom/MultiSelect';
import { Form, FormRow, FormCol, Break, ModalHead, ModalTitle } from './style';
import { FormProps } from './types';
import { ModalContent, ModalBody, ModalAction } from '../../style';
import { useAppDispatch } from 'services/redux/hooks';
import { setOpenCash } from 'services/redux/Slices/staffs';
import { ReactComponent as SaveIcon } from 'assets/icons/IconsInfo/save.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';
import { ReactComponent as Market } from 'assets/icons/SideBar/ilmarket.svg';
import useCashiers from '../../../../hooks/useCashiers';
import useStaff from '../../../../hooks/useStaff';
import { setTimeout } from 'timers';
import { IconButton } from '@material-ui/core';
import { inputPhoneNumber } from 'utilities/inputFormat';

interface IProps {
	openCash: boolean;
}

const CreateCashier = ({ openCash }: IProps) => {
	const { createCash } = useCashiers({
		page: 1,
		query: '',
		period: '',
	});

	const { branches } = useStaff();
	//   const [branches, setBranches] = useState([]);
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
		createCash.mutate({
			comment: data.comment,
			firstName: data.firstName,
			lastName: data.lastName,
			storeId: data.storeId?.value,
			telNumber: `+998${data.telNumber}`,
			roleId: 3,
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
		<Modal open={openCash}>
			<Form onSubmit={handleSubmit(onSave)}>
				<ModalContent>
					<ModalHead>
						<ModalTitle>{t('adding_cashier')}</ModalTitle>
						<IconButton
							onClick={() => {
								dispatch(setOpenCash(false));
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
								defaultValue={''}
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
								dispatch(setOpenCash(false));
							}}
							startIcon={<CancelIcon />}
						>
							{t('cancel')}
						</Button>

						<Button
							disabled={!isValid || createCash.isLoading}
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

export default CreateCashier;

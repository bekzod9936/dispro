import { useState } from 'react';
import { IProps, FormProps } from './types';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import {
	ModalAction,
	ModalBody,
	ModalContent,
	ModalHead,
	ModalTitle,
	ImageBlock,
	Container,
	Text,
	Header,
	UploadButton,
	ErrorMessage,
	EditLogo,
} from './style';
import { IconButton } from '@material-ui/core';
import MultiSelect from 'components/Custom/MultiSelect';
import Input from 'components/Custom/Input';
import { Form, FormRow, FormCol, Break } from './style';
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/IconsInfo/save.svg';
import { ReactComponent as Market } from 'assets/icons/SideBar/ilmarket.svg';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setOpenEditManager } from 'services/redux/Slices/staffs';
import useStaff from 'pages/CompanyPages/staff/hooks/useStaff';
import useManagers from 'pages/CompanyPages/staff/hooks/useManagers';
import { useEffect } from 'react';
import { inputPhoneNumber } from 'utilities/inputFormat';
import { useUploadImage } from 'pages/CompanyPages/staff/hooks/useUploadIMage';
import { UploadImage, DeleteIcon } from 'assets/icons/proposals/ProposalsIcons';
import Spinner from 'components/Helpers/Spinner';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import StaffCropCustomModal from 'components/Custom/StaffCropImageModal';

const EditManager = ({ openEdit }: IProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { branches } = useStaff();
	const selectedManagers = useAppSelector(
		(state) => state.staffs.selectedManagers
	);
	const mLogo = selectedManagers ? selectedManagers[0]?.logo : null;
	const [imgError, setImgError] = useState(false);
	const [logo, setLogo] = useState(mLogo);
	const [file, setFile] = useState('');
	const [isCropVisible, setIsCropVisible] = useState(false);

	useEffect(() => {
		setLogo(mLogo);
	}, [mLogo]);

	const { editManager } = useManagers({
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
		register,
		formState: { errors, isValid },
	} = useForm<FormProps>({
		mode: 'onChange',
		shouldFocusError: true,
		reValidateMode: 'onChange',
	});

	const storeName = [
		{
			label: selectedManagers?.length
				? selectedManagers[0]?.stores[0]?.name
				: null,
			value: selectedManagers?.length
				? selectedManagers[0]?.stores[0]?.id
				: null,
		},
	];

	const onSave = (data: FormProps) => {
		console.log(`data.storeIds[0].value`, data.storeIds);
		editManager.mutate({
			logo: logo,
			id: selectedManagers[0].id,
			storeIds: [data.storeIds[0].value],
			firstName: data.firstName,
			lastName: data.lastName,
			comment: data.comment,
			telNumber: data.telNumber,
			staffRoleId: 2,
		});
	};

	useEffect(() => {
		if (selectedManagers?.length) {
			let firstname = selectedManagers[0].firstName.split(' ')[0];
			const tel: string = String(selectedManagers[0].telNumber).slice(4);
			setValue('firstName', firstname);
			setValue('lastName', selectedManagers[0].lastName);
			setValue('comment', selectedManagers[0].comment);
			setValue('telNumber', tel);
			setValue('storeIds', storeName);
		}
	}, [selectedManagers]);

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

	const { handleUpload, deleteImage, setLoading, isLoading } = useUploadImage(
		setLogo,
		setImgError
	);

	const handleDelete = () => {
		setFile('');
		setLogo('');
		deleteImage(logo);
	};
	const handleUploadImg = (data: any) => {
		setFile(data.target.files[0]);
		setIsCropVisible(true);
	};

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
									name='logo'
									rules={{ required: false }}
									render={({ field }) => (
										<Container>
											<Text>Фотографии</Text>
											{imgError && !isLoading && (
												<div>
													<Header>
														<p>
															{t(
																' Можно загрузить фотографию JPG или PNG, минимальное разрешение 400*400рх, размер не более 3Мбайт.'
															)}
														</p>
													</Header>
													<UploadButton>
														<label htmlFor='uploadImg'>Загрузить фото</label>
														<input
															accept='image/*'
															{...register('logo', { required: false })}
															onChange={handleUploadImg}
															type='file'
															id='uploadImg'
														/>
														<UploadImage />
													</UploadButton>
													{errors.logo && (
														<ErrorMessage>{t('requiredField')}</ErrorMessage>
													)}
												</div>
											)}
											{isLoading && (
												<div style={{ width: '100%', height: 140 }}>
													<Spinner size={30} />
												</div>
											)}

											{file && (
												<StaffCropCustomModal
													setIsLoading={setLoading}
													handleUpload={handleUpload}
													setFile={setFile}
													setIsCropVisible={setIsCropVisible}
													open={isCropVisible}
													src={file}
												/>
											)}
											{!imgError && (
												<ImageBlock>
													<EditLogo
														src={logo}
														alt='logo'
														onError={() => {
															setImgError(true);
														}}
													/>
													<DeleteIcon onClick={handleDelete} />
												</ImageBlock>
											)}
										</Container>
									)}
								/>
							</FormCol>
						</FormRow>
						<FormRow>
							<FormCol>
								<Controller
									control={control}
									name='firstName'
									rules={{ required: true, pattern: /^[a-zA-Zа-яА-Я-ёЁ]*$/ }}
									render={({ field }) => (
										<Input
											maxLength='20'
											label={t('manager_name')}
											error={errors.firstName ? true : false}
											message={
												errors.firstName?.type === 'pattern'
													? 'Вводить только буквы'
													: t('requiredField')
											}
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
									rules={{ required: true, pattern: /^[a-zA-Zа-яА-Я-ёЁ]*$/ }}
									render={({ field }) => (
										<Input
											maxLength='20'
											label={t('manager_lastName')}
											error={errors.lastName ? true : false}
											message={
												errors.lastName?.type === 'pattern'
													? 'Вводить только буквы'
													: t('requiredField')
											}
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
								rules={{
									required: true,
								}}
								defaultValue={storeName}
								render={({ field }) => {
									return (
										<MultiSelect
											isDisabled={true}
											defaultValue={storeName}
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

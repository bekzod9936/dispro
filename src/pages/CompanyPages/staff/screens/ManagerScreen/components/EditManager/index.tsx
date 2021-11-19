import { useState } from 'react';
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
	ImageBlock,
	Container,
	Text,
	Header,
	UploadButton,
	ErrorMessage,
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
import CropCustomModal from 'components/Custom/CropImageModal';

const EditManager = ({ openEdit }: IProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { branches } = useStaff();
	const [logo, setLogo] = useState('');
	const [file, setFile] = useState('');
	const [isCropVisible, setIsCropVisible] = useState(false);
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
		watch,
		getValues,
		register,
		formState: { errors, isValid },
	} = useForm<FormProps>({
		mode: 'onChange',
		shouldFocusError: true,
		reValidateMode: 'onChange',
	});

	const onSave = (data: FormProps) => {
		console.log(data, 'data form');
		editManager.mutate({
			logo: logo,
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
			const tel: string = String(selectedManagers[0].telNumber).slice(4);
			setValue('logo', selectedManagers?.logo);
			setValue('firstName', firstname);
			setValue('lastName', selectedManagers[0].lastName);
			setValue('comment', selectedManagers[0].comment);
			setValue('telNumber', tel);
			setValue('storeId', selectedManagers[0].storeId);
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

	const { handleUpload, deleteImage, setLoading, isLoading } =
		useUploadImage(setLogo);

	const handleDelete = () => {
		setFile('');
		setLogo('');
		deleteImage(logo);
	};
	const handleUploadImg = (data: any) => {
		setFile(data.target.files[0]);
		setIsCropVisible(true);
	};
	console.log('file1', file);

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
											{!isLoading && !logo && (
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
															{...register('logo', { required: true })}
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
											{logo && (
												<ImageBlock>
													<ImageLazyLoad
														objectFit='contain'
														src={logo}
														alt='logo'
													/>
													<DeleteIcon onClick={handleDelete} />
												</ImageBlock>
											)}
											{file && (
												<CropCustomModal
													setIsLoading={setLoading}
													handleUpload={handleUpload}
													setFile={setFile}
													setIsCropVisible={setIsCropVisible}
													open={isCropVisible}
													src={file}
												/>
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

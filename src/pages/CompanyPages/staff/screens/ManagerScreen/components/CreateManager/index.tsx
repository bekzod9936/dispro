import { useEffect, useState, useRef } from 'react';
import { IProps } from './types';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from 'components/Custom/Input';
import { Form, FormRow, FormCol, Break, ModalHead, ModalTitle } from './style';
import useStaff from 'pages/CompanyPages/staff/hooks/useStaff';
import useManagers from 'pages/CompanyPages/staff/hooks/useManagers';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { FormProps } from './types';
import Button from 'components/Custom/Buttons/Button';
import Modal from 'components/Custom/Modal';
import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import {
	ModalAction,
	ModalBody,
	ModalContent,
	ModalMain,
	UploadButton,
	Header,
	ErrorMessage,
	ImageBlock,
	Container,
	Text,
	ButtonWrap,
} from './style';
import MultiSelect from 'components/Custom/MultiSelect';
import { setOpenManager, setStepManager } from 'services/redux/Slices/staffs';
import { ReactComponent as NextIcon } from 'assets/icons/sign_tick.svg';
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/IconsInfo/save.svg';
import { ReactComponent as Market } from 'assets/icons/SideBar/ilmarket.svg';

import Radio from 'components/Custom/Radio';
import { IconButton } from '@material-ui/core';

import RoleTable from './components/RoleTable';
import useRoles from './components/RoleTable/useRoles';
import { inputPhoneNumber } from 'utilities/inputFormat';
import { useUploadImage } from 'pages/CompanyPages/staff/hooks/useUploadIMage';
import Title from 'components/Custom/Title';
import { UploadImage, DeleteIcon } from 'assets/icons/proposals/ProposalsIcons';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import StaffCropCustomModal from 'components/Custom/StaffCropImageModal';
import Spinner from 'components/Helpers/Spinner';

const CreateManager = ({ openManager }: IProps) => {
	const stepManager = useAppSelector((state) => state.staffs.stepManager);
	const selectedRole = useAppSelector((state) => state.staffs.selectedRole);
	const { permissionsRole } = useRoles();
	const { branches } = useStaff();
	const [logo, setLogo] = useState('');
	const [imgError, setImgError] = useState(false);
	const [file, setFile] = useState('');

	const [managerId, setManagerId] = useState<null | number>(null);
	const [isCropVisible, setIsCropVisible] = useState(false);
	const {
		saveRoleManager,
		modified,
		setModified,
		createManager,
		deleteManager,
	} = useManagers({
		page: 1,
		query: '',
		period: '',
	});

	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		getValues,
		register,
		setError,
		formState: { errors, isValid, isSubmitSuccessful },
	} = useForm<FormProps>({
		mode: 'onChange',
		shouldFocusError: true,
		reValidateMode: 'onChange',
	});
	const resetData = {
		logo: '',

		comment: '',
		firstName: '',
		lastName: '',
		storeIds: '',
		telNumber: '+998',
	};

	const onSave = (data: FormProps) => {
		console.log(data, 'data');
		createManager.mutate(
			{
				logo: logo,
				comment: data.comment,
				firstName: data.firstName,
				lastName: data.lastName,
				storeIds: [data.storeIds?.value],
				telNumber: `+998${data.telNumber}`,
				roleId: 2,
			},
			{
				onSuccess: (data: any) => {
					setManagerId(data.data.data.id);
					setLogo('');
					reset(resetData);
				},
				onError: () => {
					setError('telNumber', {
						type: 'duplicate',
						message: '???????????????? ?? ?????????? ?????????????? ?????? ????????????????????',
					});
				},
			}
		);
	};

	const handleClose = () => {
		dispatch(setOpenManager(false));
		dispatch(setStepManager(1));
		// deleteManager.mutate(managerId);
	};
	// useEffect(() => {
	// 	if (isSubmitSuccessful) {
	// 		setTimeout(() => {
	// 			reset({
	// 				logo: '',
	// 				comment: '',
	// 				firstName: '',
	// 				lastName: '',
	// 				storeId: '',
	// 				telNumber: '+998',
	// 			});
	// 		}, 4000);
	// 	}
	// }, [isSubmitSuccessful, reset]);

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

		setValue('logo', '');
	};

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
									setLogo('');
									reset(resetData);
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
												<Text>????????????????????</Text>
												{!isLoading && !logo && (
													<div>
														<Header>
															<p>
																{t(
																	' ?????????? ?????????????????? ???????????????????? JPG ?????? PNG, ?????????????????????? ???????????????????? 400*400????, ???????????? ???? ?????????? 3??????????.'
																)}
															</p>
														</Header>
														<UploadButton>
															<label htmlFor='uploadImg'>
																<span>?????????????????? ????????</span>
																<UploadImage />
															</label>
															<input
																accept='image/*'
																{...register('logo', { required: false })}
																onChange={handleUploadImg}
																type='file'
																id='uploadImg'
															/>
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
														<img
															src={logo}
															alt='logo'
															onError={() => {
																setImgError(true);
															}}
														/>
														<DeleteIcon onClick={handleDelete} />
													</ImageBlock>
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
										rules={{ required: true, pattern: /^[a-zA-Z??-????-??-????]*$/ }}
										render={({ field }) => (
											<Input
												maxLength='20'
												label={t('manager_name')}
												error={errors.firstName ? true : false}
												message={
													errors.firstName?.type === 'pattern'
														? '?????????????? ???????????? ??????????'
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
										rules={{ required: true, pattern: /^[a-zA-Z??-????-??-????]*$/ }}
										render={({ field }) => (
											<Input
												maxLength='20'
												label={t('manager_lastName')}
												error={errors.lastName ? true : false}
												message={
													errors.lastName?.type === 'pattern'
														? '?????????????? ???????????? ??????????'
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
									defaultValue=''
									rules={{
										required: true,
									}}
									render={({ field }) => {
										return (
											<Input
												label={t('phoneNumber')}
												error={errors.telNumber ? true : false}
												message={
													errors?.telNumber?.message || t('requiredField')
												}
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
									name='storeIds'
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
												inputStyle={{
													inpadding: '15px 25px',
												}}
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
									dispatch(setOpenManager(false));
									dispatch(setStepManager(1));
									setLogo('');
									reset(resetData);
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
						<ModalTitle>?????????????????? ??????????????</ModalTitle>
						<ButtonWrap>
							<IconButton onClick={handleClose}>
								<ExitIcon />
							</IconButton>
						</ButtonWrap>
					</ModalHead>
					<ModalBody>
						{/* tables  */}
						<RoleTable handleClose={handleClose} />
					</ModalBody>
				</ModalMain>
			)}
		</Modal>
	);
};

export default CreateManager;

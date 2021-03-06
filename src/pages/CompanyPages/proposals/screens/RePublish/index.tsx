import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import {
  DangerIcon,
  DeleteIcon,
  GoBackIcon,
  MobileCancelIcon,
  PhoneIcon,
  PlusIcon,
  PublishIcon,
  SaveIcon,
  UploadImage,
} from 'assets/icons/proposals/ProposalsIcons';
import Button from 'components/Custom/Buttons/Button';
import CustomToggle from 'components/Custom/CustomToggleSwitch';
import Input from 'components/Custom/Input';
import MultiSelect from 'components/Custom/MultiSelect';
import Title from 'components/Custom/Title';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
  AgeBlock,
  AgeWrapper,
  Container,
  DownSide,
  ErrorMessage,
  Form,
  Header,
  ImageBlock,
  LeftSide,
  MobileHeader,
  RightSide,
  UploadButton,
  UpSide,
  Wrapper,
} from './style';
import CropCustomModal from 'components/Custom/CropImageModal/index';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { updateCoupon, postCoupon } from 'services/queries/proposalQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { RootState } from 'services/redux/store';
import { resetCurrentCoupon } from 'services/redux/Slices/proposals/proposals';
import { days } from '../Coupons/constants';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import { useUploadImage } from '../Coupons/hooks/useUploadIMage';
import { PreviewModal } from '../../components/PreviewModal';
import { Buttons, IconWrapper, PreviewMessage } from '../Coupons/style';
import { SetDate } from '../Coupons/components/SetDate';
import Modal from 'components/Custom/Modal';
import { useFetchCategories } from '../UpdateCoupon/useFetchCategories';
import { getWeekDays } from '../../utils/getValidDate';
import InputFormat from 'components/Custom/InputFormat';
import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import Spinner from 'components/Helpers/Spinner';
import { LeaveModal } from '../../components/LeaveModal';

const RePublish = () => {
  const { currentCoupon } = useAppSelector(
    (state: RootState) => state.proposals
  );
  const { t } = useTranslation();
  const [file, setFile] = React.useState<string>('');
  const [isCoupon, setIsCoupon] = React.useState<boolean>(true);
  const [image, setImage] = React.useState<string>(currentCoupon.image);
  const [coupon, setCoupon] = React.useState<any>();
  const [chooseDate, setChooseDate] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isCropVisible, setIsCropVisible] = React.useState<boolean>(false);
  const history = useHistory();
  const [categories, setCategories] = React.useState<any>({
    defaults: [],
    categories: [],
  });
  const [leave, setLeave] = React.useState(false);
  const [publish, setPublish] = React.useState<boolean>(false);
  const { handleUpload, deleteImage, isLoading } = useUploadImage(setImage);
  const { width } = useWindowWidth();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    setError,
    formState: { errors, isValid },
    control,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });
  const [previewModal, setPreviewModal] = React.useState<boolean>(false);
  const [optionalFields, setOptionalFields] = React.useState({
    age: !currentCoupon.ageUnlimited,
    days:
      !!currentCoupon.settings &&
      currentCoupon?.settings?.weekDays?.length !== 7,
    time:
      !!currentCoupon.settings &&
      !(
        currentCoupon?.settings?.time?.from === '00:00' &&
        currentCoupon?.settings?.time?.to === '23:59'
      ),
  });
  const handleBack = () => {
    dispatch(resetCurrentCoupon());
    history.goBack();
  };

  const handleOpenBlock = (e: any, payload: string) => {
    setOptionalFields((prev: any) => ({
      ...prev,
      [payload]: e.target.checked,
    }));
  };

  const { mutate } = useMutation(({ id, data }: any) => updateCoupon(id, data));

  React.useEffect(() => {
    const res = history.location.pathname.includes('coupon');
    setIsCoupon(res);
  }, []);

  const _ = useFetchCategories(setCategories, currentCoupon.categoryIds);

  const onSave = async (data: any) => {
    const validData = {
      title: data.name,
      price: data.cost,
      description: data.description,
      count: data.amount,
      value: data.percent.toString().split(' ').join(''),
      currencyId: 1,
      ageFrom: optionalFields.age ? data.ageLimit : null,
      ageUnlimited: !!!data.ageLimit || !optionalFields.age,
      categoryIds: data.categories.map((el: any) => el.id),
      companyId: 18,
      id: currentCoupon.id,
      image: image,
      type: currentCoupon.type,
      ageTo: null,
      settings: {
        weekDays:
          optionalFields.days && data?.days?.length
            ? data.days.map((el: any) => el.id)
            : [0, 1, 2, 3, 4, 5, 6],
        time: {
          from: optionalFields.time && data?.timeFrom ? data.timeFrom : '00:00',
          to: optionalFields.time && data?.timeTo ? data.timeTo : '23:59',
        },
      },
    };
    await postCoupon(validData);
    setTimeout(() => history.goBack(), 1000);
    dispatch(resetCurrentCoupon());
  };

  const onPublish = (data: any) => {
    setChooseDate(true);
    setCoupon({
      title: data.name,
      count: data.amount,
      ageUnlimited: !!!data.ageLimit || !optionalFields.age,
      price: data.cost,
      value: data.percent.toString().split(' ').join(''),
      type: isCoupon ? '2' : '1',
      currencyId: 1,
      categoryIds: data.categories.map((el: any) => el.id),
      companyId: 18,
      image: image,
      ageFrom: optionalFields.age ? data.ageLimit || null : null,
      ageTo: null,
      description: data.description,
      settings: {
        weekDays:
          optionalFields.days && data?.days?.length
            ? data.days.map((el: any) => el.id)
            : [0, 1, 2, 3, 4, 5, 6],
        time: {
          from: optionalFields.time && data?.timeFrom ? data.timeFrom : '00:00',
          to: optionalFields.time && data?.timeTo ? data.timeTo : '23:59',
        },
      },
    });
  };

  const handleUploadImg = (data: any) => {
    if (
      data.target.files[0].type == 'image/jpeg' ||
      data.target.files[0].type == 'image/png'
    ) {
      setFile(data.target.files[0]);
      setIsCropVisible(true);
    } else {
      setError('image', {
        message: '?????????? ?????????????????? ???????????????????? ?? ?????????????? JPG ?????? PNG',
      });
    }
    setValue('image', null);
  };

  const handleDelete = () => {
    deleteImage(image);
    setImage('');
    clearErrors('image');
  };

  React.useEffect(() => {
    if (currentCoupon.title === '') {
      handleBack();
    }
  }, []);

  React.useEffect(() => {
    setValue('categories', categories.defaults);
  }, [categories.defaults]);

  return (
    <Wrapper>
      {width > 1000 && (
        <div
          style={{ display: 'flex', marginBottom: 30, alignItems: 'center' }}
        >
          <GoBackIcon
            onClick={handleBack}
            style={{ marginRight: '25px', cursor: 'pointer' }}
          />
          <Title>???????????????????????????? {isCoupon ? '????????????' : '??????????????????????'}</Title>
        </div>
      )}
      {width > 600 ? (
        <Modal open={chooseDate}>
          <SetDate
            coupon={coupon}
            handleClose={() => setChooseDate(false)}
            handleUpdate={mutate}
          />
        </Modal>
      ) : (
        <FullModal open={chooseDate}>
          <SetDate
            coupon={coupon}
            handleClose={() => setChooseDate(false)}
            handleUpdate={mutate}
          />
        </FullModal>
      )}
      <LeaveModal
        open={leave}
        handleBack={handleBack}
        setLeave={setLeave}
        message={`???????????????????????????? ${isCoupon ? '????????????' : '??????????????????????'}`}
      />
      <PreviewModal
        price={watch('cost')}
        isCoupon={isCoupon}
        value={watch('percent')}
        image={image}
        open={previewModal}
        handleClose={() => setPreviewModal(false)}
        ageFrom={watch('ageLimit')}
      />
      <Form onSubmit={publish ? handleSubmit(onPublish) : handleSubmit(onSave)}>
        {width <= 1000 && (
          <MobileHeader>
            <GoBackIcon onClick={handleBack} style={{ cursor: 'pointer' }} />
            <Title>???????????????????????????? {isCoupon ? '????????????' : '??????????????????????'}</Title>
          </MobileHeader>
        )}
        <UpSide>
          <Container>
            <LeftSide>
              <Title>????????????????????</Title>
              {!isLoading && !image && (
                <div style={{ marginBottom: 30 }}>
                  <Header>
                    <p>
                      ?????????? ?????????????????? ???????????????????? JPG ?????? PNG, ??????????????????????
                      ???????????????????? 400*400????, ???????????? ???? ?????????? 3??????????.
                    </p>
                  </Header>
                  <UploadButton>
                    <label htmlFor='uploadImg'>?????????????????? ????????</label>
                    <input
                      {...register('image', { required: true })}
                      onChange={handleUploadImg}
                      type='file'
                      id='uploadImg'
                    />
                    <UploadImage />
                  </UploadButton>
                  {errors.image && (
                    <ErrorMessage>
                      {errors.image?.message || t('requiredField')}
                    </ErrorMessage>
                  )}
                </div>
              )}
              {isLoading && (
                <div style={{ width: '100%', height: 140 }}>
                  <Spinner size={30} />
                </div>
              )}
              {image && (
                <ImageBlock>
                  <ImageLazyLoad objectFit='contain' src={image} alt='logo' />
                  <DeleteIcon onClick={handleDelete} />
                </ImageBlock>
              )}
              {file && (
                <CropCustomModal
                  isCoupon={isCoupon}
                  handleUpload={handleUpload}
                  setFile={setFile}
                  setIsCropVisible={setIsCropVisible}
                  open={isCropVisible}
                  src={file}
                  coupon
                />
              )}

              <Controller
                name='name'
                control={control}
                defaultValue={currentCoupon.title}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    error={!!errors.name}
                    message={t('requiredField')}
                    field={field}
                    maxLength='100'
                    defaultValue={currentCoupon.title}
                    label='????????????????'
                  />
                )}
              />
              <Controller
                name='percent'
                control={control}
                defaultValue={currentCoupon.value}
                rules={{
                  required: true,
                  min: isCoupon ? 1 : 1000,
                }}
                render={({ field }) => {
                  if (isCoupon)
                    return (
                      <InputFormat
                        field={field}
                        max='100'
                        defaultValue={currentCoupon.value}
                        error={!!errors.percent}
                        message={
                          parseInt(watch('percent')) < 1
                            ? '?????????????????????? ??????????????: 1'
                            : t('requiredField')
                        }
                        label={`?????????????? % ????????????`}
                        margin={{ laptop: '35px 0' }}
                      />
                    );
                  else
                    return (
                      <InputFormat
                        field={field}
                        type='string'
                        max='10000000'
                        defaultValue={currentCoupon.value?.toString()}
                        error={!!errors.percent}
                        message={
                          parseInt(watch('percent')) < 1000
                            ? '?????????????????????? ??????????: 1000'
                            : t('requiredField')
                        }
                        label={'?????????????? ?????????? ??????????????????????'}
                        margin={{ laptop: '35px 0' }}
                      />
                    );
                }}
              />
              <Controller
                name='amount'
                control={control}
                rules={{
                  required: true,
                  min: 5,
                }}
                defaultValue={currentCoupon.count}
                render={({ field }) => (
                  <InputFormat
                    max='5000'
                    error={!!errors.amount}
                    message={
                      parseInt(watch('amount')) < 5
                        ? '?????????????????????? ????????????????????: 5'
                        : t('requiredField')
                    }
                    field={field}
                    defaultValue={currentCoupon.count}
                    label='????????????????????'
                  />
                )}
              />
              <Controller
                name='description'
                control={control}
                defaultValue={currentCoupon.description}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    field={field}
                    margin={{ laptop: '35px 0' }}
                    label='????????????????'
                    type='textarea'
                    message={t('requiredField')}
                    error={!!errors.description}
                    multiline={true}
                    defaultValue={currentCoupon.description}
                    inputStyle={{
                      height: {
                        desktop: 120,
                        laptop: 90,
                        mobile: 60,
                        planshet: 120,
                      },
                      inpadding: '10px 15px',
                    }}
                  />
                )}
              />
              <Controller
                name='categories'
                control={control}
                defaultValue={categories.defaults}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <MultiSelect
                    isMulti={true}
                    error={!!errors.categories}
                    message={t('requiredField')}
                    field={field}
                    defaultValue={categories.defaults}
                    label='???????????????? ??????????????????'
                    options={categories.categories}
                    margin={{ laptop: '0 0 35px 0' }}
                  />
                )}
              />
              <Controller
                name='cost'
                control={control}
                rules={{
                  required: true,
                  min: 1000,
                }}
                defaultValue={currentCoupon.price}
                render={({ field }) => (
                  <InputFormat
                    field={field}
                    error={!!errors.cost}
                    defaultValue={currentCoupon.price}
                    message={
                      parseInt(watch('cost')) < 1000
                        ? '?????????????????????? ????????: 1000'
                        : t('requiredField')
                    }
                    label={isCoupon ? '???????? ????????????' : '???????? ??????????????????????'}
                    margin={{ laptop: '25px 0 35px 0' }}
                  />
                )}
              />
            </LeftSide>
            <RightSide>
              <AgeWrapper>
                <AgeBlock>
                  <h6>???????????????? ???????????????????? ??????????????????????</h6>
                  <CustomToggle
                    checked={optionalFields.age}
                    onChange={(e: any) => handleOpenBlock(e, 'age')}
                  />
                </AgeBlock>
                {optionalFields.age && (
                  <Controller
                    name='ageLimit'
                    control={control}
                    defaultValue={currentCoupon.ageFrom || ''}
                    render={({ field }) => (
                      <InputFormat
                        field={field}
                        max='100'
                        maxLength='2'
                        IconStart={<PlusIcon style={{ marginLeft: '20px' }} />}
                        label='???????????????????? ??????????????????????'
                      />
                    )}
                  />
                )}
              </AgeWrapper>
              <AgeWrapper>
                <AgeBlock>
                  <h6>?????? ???????????????? {isCoupon ? '????????????' : '??????????????????????'}</h6>
                  <CustomToggle
                    checked={optionalFields.days}
                    onChange={(e: any) => handleOpenBlock(e, 'days')}
                  />
                </AgeBlock>
                {optionalFields.days && (
                  <Controller
                    name='days'
                    control={control}
                    defaultValue={
                      getWeekDays(currentCoupon?.settings?.weekDays) || days
                    }
                    render={({ field }) => (
                      <MultiSelect
                        error={errors.days}
                        message={t('requiredField')}
                        defaultValue={
                          getWeekDays(currentCoupon?.settings?.weekDays) || days
                        }
                        isMulti
                        field={field}
                        options={days}
                        label='?????????????? ??????'
                      />
                    )}
                  />
                )}
              </AgeWrapper>
              <AgeWrapper>
                <AgeBlock>
                  <h6>?????????? ???????????????? {isCoupon ? '????????????' : '??????????????????????'}</h6>
                  <CustomToggle
                    checked={optionalFields.time}
                    onChange={(e: any) => handleOpenBlock(e, 'time')}
                  />
                </AgeBlock>
                {optionalFields.time && (
                  <div style={{ display: 'flex' }}>
                    <Controller
                      control={control}
                      name='timeFrom'
                      defaultValue={currentCoupon?.settings?.time?.from}
                      render={({ field }) => (
                        <Input
                          error={errors.timeFrom}
                          message={t('requiredField')}
                          margin={{ laptop: '0 25px 0 0' }}
                          type='time'
                          max={watch('timeTo')}
                          defaultValue={currentCoupon?.settings?.time?.from}
                          field={field}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name='timeTo'
                      defaultValue={currentCoupon?.settings?.time?.to}
                      render={({ field }) => (
                        <Input
                          error={errors.timeTo}
                          message={t('requiredField')}
                          defaultValue={currentCoupon?.settings?.time?.to}
                          type='time'
                          field={field}
                          min={watch('timeFrom')}
                        />
                      )}
                    />
                  </div>
                )}
              </AgeWrapper>
              {width > 1000 && (
                <>
                  {isValid ? (
                    <Button
                      margin={{ laptop: '40px 0 0 0' }}
                      onClick={() => setPreviewModal(true)}
                      buttonStyle={{ bgcolor: '#ffffff', color: '#606EEA' }}
                      endIcon={<PhoneIcon />}
                    >
                      ???????????????? ????????????
                    </Button>
                  ) : (
                    <PreviewMessage>
                      <DangerIcon />
                      <p>
                        ?????????????????? ?????? ???????????????????????? ???????? ?????????? ???????????????????? ??????
                        ?????????? ?????????? ???????????????????????? ?? ??????????????????????
                      </p>
                    </PreviewMessage>
                  )}
                </>
              )}
              {width <= 600 && (
                <Buttons>
                  <div className='upside'>
                    <Button
                      onClick={() => setLeave(true)}
                      endIcon={<MobileCancelIcon />}
                      buttonStyle={{
                        bgcolor: 'rgba(96, 110, 234, 0.1)',
                        color: '#606EEA',
                      }}
                      margin={{ mobile: '0 8px 8px 0' }}
                    >
                      {t('cancel')}
                    </Button>
                    <Button
                      onClick={() => setPublish(true)}
                      type='submit'
                      endIcon={
                        <IconWrapper>
                          <PublishIcon />
                        </IconWrapper>
                      }
                    >
                      {t('publish')}
                    </Button>
                  </div>
                  <Button
                    onClick={() => setPublish(false)}
                    type='submit'
                    endIcon={<SaveIcon />}
                    buttonStyle={{
                      bgcolor: 'rgba(96, 110, 234, 0.1)',
                      color: '#606EEA',
                    }}
                    margin={{ mobile: '8px 0 0 0' }}
                  >
                    {t('saveToDrafts')}
                  </Button>
                </Buttons>
              )}
            </RightSide>
          </Container>
        </UpSide>
        <DownSide>
          <Button
            margin={{ planshet: '0 0 0 20px' }}
            onClick={() => setLeave(true)}
            startIcon={width > 1000 ? <CancelIcon /> : <MobileCancelIcon />}
            buttonStyle={
              width > 1000
                ? { color: '#223367', bgcolor: '#ffffff' }
                : { color: '#606EEA', bgcolor: 'rgba(96, 110, 234, 0.1)' }
            }
          >
            ????????????????
          </Button>
          <Button
            onClick={() => setPublish(true)}
            type='submit'
            margin={{ laptop: '0 25px' }}
            startIcon={<PublishIcon />}
          >
            ????????????????????????
          </Button>
          <Button
            onClick={() => setPublish(false)}
            type='submit'
            buttonStyle={{
              color: '#606EEA',
              bgcolor: 'rgba(96, 110, 234, 0.1)',
            }}
            startIcon={<SaveIcon />}
          >
            ??????????????????
          </Button>
        </DownSide>
      </Form>
    </Wrapper>
  );
};
export default RePublish;

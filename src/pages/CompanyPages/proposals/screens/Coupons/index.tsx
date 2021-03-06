import { CancelIcon } from 'assets/icons/ClientsPageIcons/ClientIcons';
import {
  DangerIcon,
  DeleteIcon,
  GoBackIcon,
  MobileCancelIcon,
  MobileUploadPhotoIcon,
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
  Buttons,
  Container,
  DownSide,
  ErrorMessage,
  Form,
  Header,
  IconWrapper,
  ImageBlock,
  LeftSide,
  MobileHeader,
  PreviewMessage,
  RightSide,
  UploadButton,
  UpSide,
  Wrapper,
} from './style';
import { useUploadImage } from './hooks/useUploadIMage';
import CropCustomModal from 'components/Custom/CropImageModal/index';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { postCoupon } from 'services/queries/proposalQuery';
import Modal from 'components/Custom/Modal';
import { SetDate } from './components/SetDate';
import { days } from './constants';
import ImageLazyLoad from 'components/Custom/ImageLazyLoad/ImageLazyLoad';
import { useAppDispatch } from 'services/redux/hooks';
import { setSaving } from 'services/redux/Slices/proposals/proposals';
import { PreviewModal } from '../../components/PreviewModal';
import Spinner from 'components/Helpers/Spinner';
import { useFetchCategories } from './hooks/useFetchCategories';
import InputFormat from 'components/Custom/InputFormat';
import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import { LeaveModal } from '../../components/LeaveModal';
interface IOptionFields {
  age: boolean;
  days: boolean;
  time: boolean;
}

export interface ICoupon {
  ageFrom: string | null;
  ageTo: string | null;
  ageUnlimited: boolean;
  categoryIds: number[];
  companyId: number;
  count: string;
  currencyId: number;
  description: string;
  image: string;
  price: string;
  title: string;
  type: string;
  value: string;
  id: number;
}

const initialData: ICoupon = {
  ageFrom: null,
  ageTo: null,
  ageUnlimited: true,
  categoryIds: [],
  companyId: 18,
  count: '',
  currencyId: 1,
  description: '',
  image: '',
  price: '',
  title: '',
  type: '1',
  value: '',
  id: 0,
};

const Coupons = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isCoupon, setIsCoupon] = React.useState<boolean>(false);
  const [coupon, setCoupon] = React.useState<ICoupon>(initialData);
  const [period, setPeriod] = React.useState<boolean>(false);
  const [image, setImage] = React.useState('');
  const [publish, setPublish] = React.useState(false);
  const [categories, setCategories] = React.useState<any>();
  const { width } = useWindowWidth();
  const { handleUpload, deleteImage, setLoading, isLoading } =
    useUploadImage(setImage);
  const [file, setFile] = React.useState('');
  const [previewModal, setPreviewModal] = React.useState<boolean>(false);
  const [isCropVisible, setIsCropVisible] = React.useState(false);
  const [leave, setLeave] = React.useState<boolean>(false);
  const [optionalFields, setOptionalFields] = React.useState<IOptionFields>({
    age: false,
    days: false,
    time: false,
  });
  const { mutate } = useMutation((data: any) => postCoupon(data));
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const isCoupon = history.location.pathname.includes('coupon');
    setIsCoupon(isCoupon);
  }, []);

  const handleOpenBlock = (e: any, action: 'age' | 'time' | 'days') => {
    setOptionalFields((prev: IOptionFields) => ({
      ...prev,
      [action]: e.target.checked,
    }));
  };

  const _ = useFetchCategories(setCategories);

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

  const onPublish = (data: any) => {
    setPeriod(true);
    setCoupon((prev: ICoupon) => ({
      ...prev,
      ageFrom: data.ageLimit || null,
      ageTo: null,
      ageUnlimited: !optionalFields.age || !data.ageLimit,
      categoryIds: data.categories.map((el: any) => el.id),
      companyId: 18,
      count: data.amount.toString().split(' ').join(''),
      currencyId: 1,
      description: data.description,
      image: image,
      price: data.cost.toString().split(' ').join(''),
      title: data.name,
      type: isCoupon ? '2' : '1',
      value: data.percent.toString().split(' ').join(''),
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
    }));
  };

  const handleDelete = () => {
    setFile('');
    setImage('');
    deleteImage(image);
    clearErrors('image');
  };

  const handleBack = () => {
    history.goBack();
  };

  const onSave = async (data: any) => {
    const validData = {
      title: data.name,
      price: data.cost.toString().split(' ').join(''),
      description: data.description,
      count: data.amount.toString().split(' ').join(''),
      value: data.percent.toString().split(' ').join(''),
      currencyId: 1,
      ageFrom: optionalFields.age ? data.ageLimit : null,
      ageUnlimited: !optionalFields.age || !data.ageLimit,
      categoryIds: data.categories.map((el: any) => el.id),
      companyId: 18,
      image: image,
      type: isCoupon ? '2' : '1',
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

    mutate(validData);
    setTimeout(() => history.goBack(), 1000);
    dispatch(setSaving(true));
  };

  console.log(errors);

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
          <Title>???????????????? {isCoupon ? '????????????' : '??????????????????????'}</Title>
        </div>
      )}
      {width > 600 ? (
        <Modal open={period}>
          <SetDate
            handlePost={mutate}
            handleClose={() => setPeriod(false)}
            coupon={coupon}
          />
        </Modal>
      ) : (
        <FullModal open={period}>
          <SetDate
            coupon={coupon}
            handleClose={() => setPeriod(false)}
            handlePost={mutate}
          />
        </FullModal>
      )}
      <LeaveModal
        message={`???????????????? ${isCoupon ? '????????????' : '??????????????????????'}`}
        open={leave}
        setLeave={setLeave}
        handleBack={handleBack}
      />
      {width > 1000 && (
        <PreviewModal
          price={watch('cost')}
          ageFrom={watch('ageLimit')}
          open={previewModal}
          isCoupon={isCoupon}
          description={watch('description')}
          value={watch('percent')}
          image={image}
          handleClose={() => setPreviewModal(false)}
        />
      )}
      <Form onSubmit={publish ? handleSubmit(onPublish) : handleSubmit(onSave)}>
        <UpSide>
          {width <= 1000 && (
            <MobileHeader>
              <GoBackIcon onClick={handleBack} style={{ cursor: 'pointer' }} />
              <Title>???????????????? {isCoupon ? '????????????' : '??????????????????????'}</Title>
            </MobileHeader>
          )}
          <Container>
            <LeftSide>
              <Title padding={{ planshet: '0' }}>????????????????????</Title>
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
                  coupon
                  setIsLoading={setLoading}
                  isCoupon={isCoupon}
                  handleUpload={handleUpload}
                  setFile={setFile}
                  setIsCropVisible={setIsCropVisible}
                  open={isCropVisible}
                  src={file}
                />
              )}

              <Controller
                name='name'
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    maxLength='100'
                    error={!!errors.name}
                    message={t('requiredField')}
                    field={field}
                    label='????????????????'
                  />
                )}
              />
              <Controller
                name='percent'
                control={control}
                rules={{
                  required: true,
                  min: isCoupon ? 1 : 1000,
                }}
                render={({ field }) => {
                  if (isCoupon)
                    return (
                      <InputFormat
                        field={field}
                        label={'?????????????? % ????????????'}
                        error={!!errors.percent}
                        max='100'
                        margin={{ laptop: '35px 0' }}
                        message={
                          parseInt(watch('percent')) < 1
                            ? '?????????????????????? ??????????????: 1%'
                            : t('requiredField')
                        }
                      />
                    );
                  else
                    return (
                      <InputFormat
                        field={field}
                        max='10000000'
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
                render={({ field }) => (
                  <InputFormat
                    field={field}
                    max='5000'
                    error={!!errors.amount}
                    message={
                      parseInt(watch('amount')) < 5
                        ? '?????????????????????? ????????????????????: 5'
                        : t('requiredField')
                    }
                    label={'????????????????????'}
                    margin={{ laptop: '35px 0' }}
                  />
                )}
              />
              <Controller
                name='description'
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    field={field}
                    // maxLength={250}
                    margin={{ laptop: '35px 0' }}
                    label='????????????????'
                    type='textarea'
                    message={t('requiredField')}
                    error={!!errors.description}
                    multiline
                    inputStyle={{
                      inpadding: '10px 15px',
                      height: {
                        desktop: 120,
                        laptop: 90,
                        mobile: 60,
                        planshet: 120,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name='categories'
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <MultiSelect
                    isMulti={true}
                    error={!!errors.categories}
                    message={t('requiredField')}
                    field={field}
                    label='???????????????? ??????????????????'
                    options={categories}
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
                render={({ field }) => (
                  <InputFormat
                    field={field}
                    max='10000000'
                    error={!!errors.cost}
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
                    onChange={(e: any) => handleOpenBlock(e, 'age')}
                  />
                </AgeBlock>
                {optionalFields.age && (
                  <Controller
                    name='ageLimit'
                    control={control}
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
                    onChange={(e: any) => handleOpenBlock(e, 'days')}
                  />
                </AgeBlock>
                {optionalFields.days && (
                  <Controller
                    name='days'
                    control={control}
                    render={({ field }) => (
                      <MultiSelect
                        field={field}
                        isMulti={true}
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
                    onChange={(e: any) => handleOpenBlock(e, 'time')}
                  />
                </AgeBlock>
                {optionalFields.time && (
                  <div style={{ display: 'flex' }}>
                    <Controller
                      control={control}
                      name='timeFrom'
                      // rules={{
                      //   max: watch("timeTo")?.split(":")[0]
                      // }}
                      render={({ field }) => (
                        <Input
                          max={watch('timeTo')}
                          margin={{
                            laptop: '0 25px 0 0',
                            mobile: '0 12px 0 0',
                          }}
                          type='time'
                          field={field}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name='timeTo'
                      // rules={{
                      //   min: watch("timeFrom")?.split(":")[0]
                      // }}
                      render={({ field }) => (
                        <Input
                          min={watch('timeFrom')}
                          type='time'
                          field={field}
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
            {width > 1000 ? t('saveToDrafts') : '??????????????????'}
          </Button>
        </DownSide>
      </Form>
    </Wrapper>
  );
};

export default Coupons;

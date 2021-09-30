import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../../components/Custom/Input';
import Button from '../../../../components/Custom/Button';
import Links from './Links';
import {
  Container,
  UpSide,
  LeftSide,
  RightSide,
  WrapHeader,
  FIcon,
  IIcon,
  TIcon,
  TWIcon,
  VKIcon,
  WTIcon,
  VIcon,
  WrapCurrency,
  ArrowIcon,
  WrapArrow,
  TextAreaIcon,
  WrapArea,
  PhotoLoadingIcon,
  TrashIcon,
  WrapLoading,
  LabelLoading,
  Img,
  PhotoWrap,
  WrapTrash,
  Form,
  DownSide,
  WrapButton,
  SaveIcon,
  CloseIcon,
} from './style';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import { useMutation, useQuery } from 'react-query';
import {
  deletePhoto,
  fetchCategories,
  uploadPhoto,
} from '../../../../services/queries/InfoQueries';
import Spinner from '../../../../components/Custom/Spinner';
import Resizer from 'react-image-file-resizer';
import { Text, Title } from '../style';
import MultiSelect from '../../../../components/Custom/MultiSelect';

interface FormProps {
  phoneNumber?: string;
  companyLink?: string;
  link?: string;
  title?: string;
  direction?: string;
  keywords?: string;
  description?: string;
  categories?: any[];
}

interface optionProps {
  option?: any[];
  values?: any[];
}

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState('');
  const [options, setOptions] = useState<optionProps>({
    option: [],
    values: [],
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setValue('categories', options.values);
  }, [options.values]);

  const companyInfo = useAppSelector((state) => state.partner.companyInfo);
  const [links, setLinks] = useState(companyInfo?.socialLinks);
  let companyId: any = localStorage.getItem('companyId');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    watch,
    reset,
  } = useForm<FormProps>({
    mode: 'onBlur',
    shouldFocusError: true,
  });

  useEffect(() => {
    const subscription = watch((value: any) => {
      if (value?.categories.length === 2) {
        setOptions({ values: value.categories, option: value.categories });
      }
      if (value?.categories.length < 2) {
        setOptions({ values: value.categories, option: categories });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch(['categories'])]);

  const SocilaLinks = [
    {
      Icon: FIcon,
      title: 'Facebook',
      value: links[3]?.value,
    },
    {
      Icon: IIcon,
      title: 'Instagram',
      value: links[2]?.value,
    },
    {
      Icon: TIcon,
      title: 'Telegram',
      value: links[0]?.value,
    },
    {
      Icon: TWIcon,
      title: 'Twitter',
      value: links[1]?.value,
    },
    {
      Icon: VKIcon,
      title: ' VKontakte',
      value: links[6]?.value,
    },
    {
      Icon: WTIcon,
      title: 'WhatsApp',
      value: links[4]?.value,
    },
    {
      Icon: VIcon,
      title: 'Viber',
      value: links[5]?.value,
    },
  ];

  const photoDelete = useMutation(() => {
    setLogo('');
    photoUpLoad.reset();
    return deletePhoto({ body: companyInfo.logo });
  });

  const handlePhotoDelete = () => {
    photoDelete.mutate();
  };

  const dataURIToBlob = (dataURI: any) => {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  };

  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        'png',
        100,
        0,
        (uri: any) => {
          resolve(uri);
        },
        'base64',
        400,
        400
      );
    });

  const formData = new FormData();
  const photoUpLoad = useMutation((v: any) => uploadPhoto({ body: v }));

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const image = await resizeFile(file);
    const newFile = dataURIToBlob(image);

    await formData.append('itemId', companyId);
    await formData.append('fileType', 'companyLogo');
    await formData.append('file', newFile, 'logo.png');
    await photoUpLoad.mutate(formData, {
      onSuccess: (data) => setLogo(data?.data?.data?.link),
    });
  };

  const handleInfoSubmit = (e: any) => {
    console.log(e, 'dddd');
  };

  const response = useQuery(['categories'], fetchCategories, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      const newData = data?.data?.data;
      let option: any = [];
      let values: any = [];

      for (let i = 0; i < newData?.length; i++) {
        if (
          newData[i]?.id === companyInfo?.categories[0] ||
          companyInfo?.categories[1] === newData[i]?.id
        ) {
          values.push({ value: newData[i]?.id, label: newData[i].name });
        }
        option.push({ value: newData[i]?.id, label: newData[i].name });
      }
      setCategories(option);
      if (values.length === 2) {
        setOptions({ values: values, option: values });
      }
      if (values.length < 2) {
        setOptions({ values: values, option: option });
      }
    },
  });

  return (
    <Form>
      <UpSide>
        <Container id='submit-info' onSubmit={handleSubmit(handleInfoSubmit)}>
          <LeftSide>
            <WrapHeader>
              <Title>{t('logo')}</Title>
              <WrapLoading>
                {companyInfo.logo ? null : (
                  <Text weight='normal' color='#C4C4C4'>
                    {t('logo_text')}
                  </Text>
                )}
                <input
                  accept='image/*'
                  style={{ display: 'none' }}
                  id='photoloading'
                  type='file'
                  onChange={handleUpload}
                />
                {companyInfo.logo || logo ? (
                  photoDelete.isLoading ? (
                    <Spinner />
                  ) : photoDelete.isSuccess && logo === '' ? (
                    <LabelLoading htmlFor='photoloading'>
                      {t('upload_photo')} <PhotoLoadingIcon />
                    </LabelLoading>
                  ) : (
                    <PhotoWrap onClick={handlePhotoDelete}>
                      <Img
                        src={logo !== '' ? logo : companyInfo.logo}
                        alt='logo'
                        onLoad={(e) => console.log(e)}
                      />
                      <WrapTrash>
                        <TrashIcon />
                      </WrapTrash>
                    </PhotoWrap>
                  )
                ) : (
                  <LabelLoading htmlFor='photoloading'>
                    {t('upload_photo')} <PhotoLoadingIcon />
                  </LabelLoading>
                )}
              </WrapLoading>
            </WrapHeader>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              defaultValue={companyInfo.name}
              render={({ field }) => (
                <Input
                  label={t('title')}
                  error={errors.title ? true : false}
                  message={t('requiredField')}
                  type='string'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              )}
            />
            <Controller
              name='direction'
              control={control}
              rules={{ required: true }}
              defaultValue={companyInfo.annotation}
              render={({ field }) => (
                <Input
                  label={t('company_direction')}
                  error={errors.direction ? true : false}
                  message={t('requiredField')}
                  type='string'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              )}
            />
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              defaultValue={companyInfo.description}
              render={({ field }) => (
                <Input
                  label={t('description')}
                  error={errors.description ? true : false}
                  message={t('requiredField')}
                  type='textarea'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                  multiline={true}
                  inputStyle={{
                    height: { mobile: 70, laptop: 90, desktop: 120 },
                  }}
                  IconEnd={
                    <WrapArea>
                      <TextAreaIcon />
                    </WrapArea>
                  }
                />
              )}
            />

            <WrapCurrency>
              <span>{t('currency')}</span>
              <div>UZS (Uzbekistan sum)</div>
            </WrapCurrency>
            <Controller
              name='categories'
              control={control}
              rules={{ required: true }}
              defaultValue={options.values}
              render={({ field }) => (
                <MultiSelect
                  isLoading={response.isLoading}
                  options={options.option}
                  isMulti={true}
                  label={t('chose_categories')}
                  margin={{
                    laptop: '20px 0',
                  }}
                  message={t('requiredField')}
                  error={errors.keywords ? true : false}
                  field={field}
                  isClearable={false}
                />
              )}
            />
            <Controller
              name='keywords'
              control={control}
              rules={{ required: true }}
              defaultValue={companyInfo.keyWords}
              render={({ field }) => (
                <Input
                  label={t('keywords')}
                  error={errors.keywords ? true : false}
                  message={t('requiredField')}
                  type='string'
                  field={field}
                  margin={{
                    laptop: '20px 0',
                  }}
                  IconEnd={
                    <WrapArrow>
                      <ArrowIcon />
                    </WrapArrow>
                  }
                />
              )}
            />
          </LeftSide>
          <RightSide>
            <Title>{t('phone')}</Title>
            <Text>{t('maincompanynumber')}</Text>
            <Controller
              name='phoneNumber'
              control={control}
              rules={{ required: true, maxLength: 13, minLength: 13 }}
              defaultValue={companyInfo.telNumber}
              render={({ field }) => (
                <Input
                  label={t('phoneNumber')}
                  error={errors.phoneNumber ? true : false}
                  message={t('requiredField')}
                  type='tel'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              )}
            />
            <Title>{t('companyLink')}</Title>
            <Text>{t('companyLink_text')}</Text>
            <Controller
              name='companyLink'
              control={control}
              rules={{ required: true }}
              defaultValue=''
              render={({ field }) => (
                <Input
                  label={t('linkName')}
                  error={errors.companyLink ? true : false}
                  message={t('requiredField')}
                  type='string'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              )}
            />
            <Controller
              name='link'
              control={control}
              rules={{ required: true }}
              defaultValue=''
              render={({ field }) => (
                <Input
                  label={t('link')}
                  error={errors.link ? true : false}
                  message={t('requiredField')}
                  type='string'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              )}
            />
            <Title>{t('socialLinks')}</Title>
            <div style={{ display: 'block' }}>
              {SocilaLinks.map((v) => (
                <Links {...v} />
              ))}
            </div>
          </RightSide>
        </Container>
      </UpSide>
      <DownSide>
        <div>
          <WrapButton mobile={true}>
            <Button
              tcolor='#606EEA'
              bgcolor='rgba(96, 110, 234, 0.1)'
              onClick={() => setOpen(true)}
              weight='500'
              margin='0 10px 0 0'
              form='submit-info'
              type='submit'
            >
              {t('logout')}
              <CloseIcon mobile={true} />
            </Button>
          </WrapButton>
          <Button
            shadow='0px 4px 9px rgba(96, 110, 234, 0.46)'
            radius={14}
            minWidth={100}
            minHeight={40}
            maxHeight={50}
            maxWidth={140}
            fontSize={{ max: 17, min: 14 }}
            weight='500'
            margin='20px 0 20px 0'
          >
            <SaveIcon />
            {t('save')}
          </Button>
        </div>
      </DownSide>
    </Form>
  );
};

export default Main;

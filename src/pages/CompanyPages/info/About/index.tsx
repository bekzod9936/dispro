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
import LogoDef from '../../../../assets/icons/SideBar/logodefault.png';
import partnerApi from '../../../../services/interceptors/companyInterceptor';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';

interface FormProps {
  telNumber?: string;
  companyLink?: string;
  link?: string;
  name?: string;
  annotation?: string;
  keywords?: string;
  description?: string;
  categories?: any[];
  socialLinks?: { name?: string; value?: string }[];
  logo?: string;
}

interface optionProps {
  option?: any[];
  values?: any[];
}

interface socialProps {
  name?: string;
  value?: any;
}

const Main = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<optionProps>({
    option: [],
    values: [],
  });

  const [categories, setCategories] = useState([]);
  const [social, setSocial]: any = useState([
    {
      Icon: FIcon,
      name: 'Facebook',
      value: '',
    },
    {
      Icon: IIcon,
      name: 'Instagram',
      value: '',
    },
    {
      Icon: TIcon,
      name: 'Telegram',
      value: '',
    },
    {
      Icon: TWIcon,
      name: 'Twitter',
      value: '',
    },
    {
      Icon: VKIcon,
      name: 'Vkontakte',
      value: '',
    },
    {
      Icon: WTIcon,
      name: 'WhatsApp',
      value: '',
    },
    {
      Icon: VIcon,
      name: 'Viber',
      value: '',
    },
  ]);

  const companyInfo = useAppSelector((state) => state.partner.companyInfo);

  const [links, setLinks] = useState([
    {
      name: 'Facebook',
      value: '',
    },
    {
      name: 'Instagram',
      value: '',
    },
    {
      name: 'Telegram',
      value: '',
    },
    {
      name: 'Twitter',
      value: '',
    },
    {
      name: 'Vkontakte',
      value: '',
    },
    {
      name: 'WhatsApp',
      value: '',
    },
    {
      name: 'Viber',
      value: '',
    },
  ]);

  const [logo, setLogo] = useState(companyInfo.logo);
  let companyId: any = localStorage.getItem('companyId');

  useEffect(() => {
    const newLinks = links.map((v: any) => {
      const link = companyInfo?.socialLinks?.find(
        (i: any) => i.name === v.name
      );
      return {
        name: v.name,
        value: link?.value || '',
      };
    });
    const newSocial = social.map((v: any) => {
      const link = companyInfo?.socialLinks?.find(
        (i: any) => i.name === v.name
      );
      return {
        ...v,
        value: link?.value || '',
      };
    });
    setLinks(newLinks);
    setSocial(newSocial);
    setValue('socialLinks', newLinks);
  }, [companyInfo?.socialLinks]);

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

  useEffect(() => {
    setValue('categories', options.values);
  }, [options.values]);

  useEffect(() => {
    setValue('logo', logo);
  }, [logo]);

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
  const photoUpLoad = useMutation((v: any) => uploadPhoto({ body: v }), {
    retry: 1,
  });

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const image = await resizeFile(file);
    const newFile = await dataURIToBlob(image);

    await formData.append('itemId', companyId);
    await formData.append('fileType', 'companyLogo');
    await formData.append('file', newFile, 'logo.png');
    await photoUpLoad.mutate(formData, {
      onSuccess: (data) => {
        setLogo(data?.data?.data?.link);
      },
      onError: (error) => console.log(error),
    });
  };

  const infoSubData = useMutation((v: any) =>
    partnerApi.put('/directory/company', v, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('companyToken')}`,
      },
    })
  );

  const handleInfoSubmit = (v: any) => {
    const category = v.categories.map((v: any) => v.value);
    infoSubData.mutate(
      {
        annotation: v?.annotation,
        categories: category,
        companyId: +companyId,
        currencyId: 1,
        description: v?.description,
        isHalol: true,
        isKosher: false,
        keyWords: v?.keywords,
        linkEnable: false,
        links: [],
        logo: v?.logo,
        name: v?.name,
        socialLinks: v?.socialLinks,
        telNumber: v?.telNumber,
      },
      {
        onSuccess: (data) => {
          console.log(data, 'info');
          if (Cookies.get('compnayState') === 'new') {
            history.push('/info/address');
          }
        },
      }
    );
  };

  const handleSocialChange = ({ name, value }: socialProps) => {
    const newLinks = links?.map((v: any) => {
      const a = name === v?.name ? true : false;
      return {
        ...v,
        value: a ? value : v?.value,
      };
    });
    setLinks(newLinks);
    setValue('socialLinks', newLinks);
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
          values.push({ value: newData[i]?.id, label: newData[i]?.name });
        }
        option.push({ value: newData[i]?.id, label: newData[i]?.name });
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
  if (infoSubData.isLoading) {
    return <Spinner />;
  }
  return (
    <Form onSubmit={handleSubmit(handleInfoSubmit)}>
      <UpSide>
        <Container>
          <LeftSide>
            <WrapHeader>
              <Title>{t('logo')}</Title>
              <WrapLoading>
                {logo ? null : (
                  <Text weight='normal' color='#C4C4C4'>
                    {t('logo_text')}
                  </Text>
                )}

                <input
                  accept='image/*'
                  style={{ display: 'none' }}
                  id='logo1'
                  type='file'
                  onChange={handleUpload}
                />
                {logo ? (
                  photoDelete.isLoading ? (
                    <Spinner />
                  ) : photoDelete.isSuccess && logo === '' ? (
                    <LabelLoading htmlFor='logo1'>
                      {t('upload_photo')} <PhotoLoadingIcon />
                    </LabelLoading>
                  ) : (
                    <PhotoWrap onClick={handlePhotoDelete}>
                      <Img
                        src={logo !== '' ? logo : companyInfo.logo}
                        alt='logo'
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = LogoDef;
                        }}
                      />
                      <WrapTrash>
                        <TrashIcon />
                      </WrapTrash>
                    </PhotoWrap>
                  )
                ) : (
                  <LabelLoading htmlFor='logo1'>
                    {t('upload_photo')} <PhotoLoadingIcon />
                  </LabelLoading>
                )}
              </WrapLoading>
            </WrapHeader>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              defaultValue={companyInfo.name}
              render={({ field }) => (
                <Input
                  label={t('title')}
                  error={errors.name ? true : false}
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
              name='annotation'
              control={control}
              rules={{ required: true }}
              defaultValue={companyInfo.annotation}
              render={({ field }) => (
                <Input
                  label={t('company_direction')}
                  error={errors.annotation ? true : false}
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
                    laptop: '20px 0 25px',
                  }}
                  message={t('requiredField')}
                  error={errors.categories ? true : false}
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
              name='telNumber'
              control={control}
              rules={{ required: true, maxLength: 13, minLength: 13 }}
              defaultValue={companyInfo.telNumber}
              render={({ field }) => (
                <Input
                  label={t('phoneNumber')}
                  error={errors.telNumber ? true : false}
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
              rules={{ required: false }}
              defaultValue=''
              render={({ field }) => (
                <Input
                  label={t('linkName')}
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
              rules={{ required: false }}
              defaultValue=''
              render={({ field }) => (
                <Input
                  label={t('link')}
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
              {social?.map((v: any) => (
                <Links key={v.name} {...v} onChange={handleSocialChange} />
              ))}
            </div>
          </RightSide>
        </Container>
      </UpSide>
      <DownSide>
        <div>
          <WrapButton mobile={true}>
            <Button
              onClick={() => setOpen(true)}
              type='submit'
              buttonStyle={{
                color: '#606EEA',
                bgcolor: 'rgba(96, 110, 234, 0.1)',
                weight: 500,
              }}
              margin={{
                laptop: '10px 10px 0 0',
              }}
            >
              {t('logout')}
              <CloseIcon mobile={true} />
            </Button>
          </WrapButton>
          <Button
            type='submit'
            buttonStyle={{
              shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
              weight: 500,
            }}
            margin={{
              laptop: '10px 0 0',
            }}
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

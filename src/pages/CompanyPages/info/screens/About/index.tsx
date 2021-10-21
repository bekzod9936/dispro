import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import Links from './Links';
import { useAppDispatch } from 'services/redux/hooks';
import Spinner from 'components/Custom/Spinner';
import { Text, Title } from '../../style';
import MultiSelect from 'components/Custom/MultiSelect';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import useLayout from '../../../../../components/Layout/useLayout';
import { IconButton } from '@material-ui/core';
import { setAddressAdd } from 'services/redux/Slices/infoSlice';
import useInfoPage from '../useInfoPage';
import useAbout from './useAbout';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
  PhotoWrap,
  WrapTrash,
  Form,
  DownSide,
  WrapButton,
  SaveIcon,
  CloseIcon,
  WebLink,
  WrapWebLink,
  WebValue,
  WrapKeyWords,
  ButtonKeyWord,
  DeleteIcon,
} from './style';

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
  links?: [];
}
interface socialProps {
  name?: string;
  value?: any;
}

const Main = () => {
  const { response, data } = useInfoPage();
  const [filled, setFilled] = useState<any>(false);
  const {
    resCategory,
    resDelete,
    resUpLoad,
    resinfoSubData,
    handleUpload,
    category,
    handlePhotoDelete,
    upload,
  } = useAbout({ logo: data.logo });
  const { resHeader } = useLayout();

  const history = useHistory();
  const { t } = useTranslation();
  const [, setOpen] = useState(false);
  const [defMulti, setDefMulti] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [logo, setLogo] = useState<any>('');
  const [web, setWeb] = useState<any>([]);
  const [option, setOption] = useState<any[]>([]);
  const [keywords, setKeywords] = useState<any[]>([]);

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

  useEffect(() => {
    setCategories(category);
  }, [category]);

  useEffect(() => {
    setDefMulti(data.categories);
    setFilled(data?.filled);
  }, [data]);

  useEffect(() => {
    const newArr = categories.filter((v: any) => {
      const def = defMulti.find((i: any) => i === v.value);
      if (def !== undefined) {
        return def;
      }
    });
    setValue('categories', newArr);
    setOption(newArr);
  }, [defMulti, categories]);

  useEffect(() => {
    setLogo(upload);
    setValue('logo', upload);
  }, [upload]);

  useEffect(() => {
    setValue('annotation', data.annotation);
    setValue('description', data.description);
    setValue('logo', data.logo);
    setValue('telNumber', `${data.telNumber}`);
    setValue('socialLinks', data.socialLinks);
    setValue('name', data.name);
    setLogo(data.logo);
    setWeb(data.links);
    if (data?.keyWords !== '') {
      const keys: any = data?.keyWords?.split(',');
      setKeywords(keys);
    } else {
      setKeywords([]);
    }
    const newLinks = links.map((v: any) => {
      const link = data?.socialLinks?.find((i: any) => i.name === v.name);
      return {
        name: v.name,
        value: link?.value || '',
      };
    });
    const newSocial = social.map((v: any) => {
      const link = data?.socialLinks?.find((i: any) => i.name === v.name);
      return {
        ...v,
        value: link?.value || '',
      };
    });
    setLinks(newLinks);
    setSocial(newSocial);
    setValue('socialLinks', newLinks);
  }, [data]);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    watch,
    clearErrors,
  } = useForm<FormProps>({
    mode: 'onBlur',
    shouldFocusError: true,
  });

  useEffect(() => {
    const subscription = watch((value: any) => {
      setOption(value.categories);
    });
    return () => subscription.unsubscribe();
  }, [watch(['categories'])]);

  const companyId: any = localStorage.getItem('companyId');

  const handleInfoSubmit = (v: any) => {
    const category = v.categories.map((v: any) => v.value);

    resinfoSubData.mutate(
      {
        ...data,
        annotation: v.annotation,
        categories: category,
        companyId: +companyId,
        currencyId: '1',
        description: v.description,
        isHalol: true,
        keyWords: keywords.join(','),
        linkEnable: false,
        links: web,
        logo: logo,
        name: v.name,
        socialLinks: links,
        telNumber: v.telNumber,
        isKosher: false,
      },
      {
        onSuccess: () => {
          resHeader.refetch();
          response.refetch();
          history.push('/info/address');
        },
      }
    );
  };

  const handleWebDelete = (v: any) => {
    const newArr = web.filter((i: any) => {
      if (i.address === v.address && i.name === v.name) {
        return;
      } else {
        return i;
      }
    });
    setWeb(newArr);
  };

  const handleKeyDelete = (v: any) => {
    const newArr = keywords.filter((i: any) => {
      if (i === v) {
        return;
      } else {
        return i;
      }
    });
    setKeywords(newArr);
  };

  const handleWebLink = () => {
    if (getValues('companyLink') === '') {
      setError('companyLink', { shouldFocus: true });
    } else {
      clearErrors('companyLink');
    }
    if (getValues('link') === '') {
      setError('link', { shouldFocus: true });
    } else {
      clearErrors('link');
    }
    if (getValues('companyLink') !== '' && getValues('link') !== '') {
      setWeb([
        ...web,
        {
          name: getValues('companyLink'),
          address: getValues('link'),
          enable: false,
        },
      ]);
      setValue('link', '');
      setValue('companyLink', '');
    }
  };

  const handleKeywords = () => {
    if (getValues('keywords') === '') {
      setError('keywords', { shouldFocus: true });
    } else {
      clearErrors('keywords');
      setKeywords([...keywords, getValues('keywords')]);
      setValue('keywords', '');
    }
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

  if (resinfoSubData.isLoading || response.isLoading || response.isFetching) {
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
                {response.isLoading ? (
                  <Spinner />
                ) : logo ? (
                  resDelete.isLoading ? (
                    <Spinner />
                  ) : resDelete.isSuccess && logo === '' ? (
                    <LabelLoading htmlFor='logo1'>
                      {t('upload_photo')} <PhotoLoadingIcon />
                    </LabelLoading>
                  ) : (
                    <PhotoWrap
                      onClick={async () => {
                        await handlePhotoDelete();
                        await setLogo('');
                      }}
                    >
                      <LazyLoadImage
                        alt='image'
                        src={logo}
                        height='100%'
                        width='100%'
                        style={{
                          objectFit: 'scale-down',
                          borderRadius: '14px',
                        }}
                        effect='blur'
                      />
                      <WrapTrash>
                        <TrashIcon />
                      </WrapTrash>
                    </PhotoWrap>
                  )
                ) : resUpLoad.isLoading ? (
                  <Spinner />
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
              render={({ field }) => (
                <MultiSelect
                  isLoading={resCategory.isLoading || response.isLoading}
                  options={option?.length < 2 ? category : []}
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
              rules={{ required: false }}
              defaultValue=''
              render={({ field }) => (
                <Input
                  label={t('keywords')}
                  error={errors.keywords ? true : false}
                  message={t('requiredField')}
                  type='string'
                  field={field}
                  margin={{
                    laptop: '20px 0 15px',
                  }}
                  inputStyle={{
                    border:
                      getValues('keywords') !== ''
                        ? '1px solid #606EEA'
                        : '1px solid #C2C2C2',
                  }}
                  IconEnd={
                    <WrapArrow
                      onClick={handleKeywords}
                      bgcolor={getValues('keywords') !== ''}
                      style={{ cursor: 'pointer' }}
                    >
                      <ArrowIcon />
                    </WrapArrow>
                  }
                />
              )}
            />
            <WrapKeyWords>
              {keywords?.map((v: any) => {
                return (
                  <ButtonKeyWord>
                    {v}
                    <IconButton onClick={() => handleKeyDelete(v)}>
                      <DeleteIcon color='#C4C4C4' />
                    </IconButton>
                  </ButtonKeyWord>
                );
              })}
            </WrapKeyWords>
          </LeftSide>
          <RightSide>
            <Title>{t('phone')}</Title>
            <Text>{t('maincompanynumber')}</Text>
            <Controller
              name='telNumber'
              control={control}
              rules={{ required: true, maxLength: 13, minLength: 13 }}
              defaultValue='+998'
              render={({ field }) => (
                <Input
                  label={t('phoneNumber')}
                  error={errors.telNumber ? true : false}
                  message={t('requiredField')}
                  type='text'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                  maxLength={13}
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
                  message={t('requiredField')}
                  error={errors.companyLink ? true : false}
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
                  inputStyle={{
                    border:
                      getValues('keywords') !== ''
                        ? '1px solid #606EEA'
                        : '1px solid #C2C2C2',
                  }}
                  message={t('requiredField')}
                  error={errors.link ? true : false}
                  IconEnd={
                    <WrapArrow
                      style={{ cursor: 'pointer' }}
                      onClick={handleWebLink}
                      bgcolor={getValues('link') !== ''}
                    >
                      <ArrowIcon />
                    </WrapArrow>
                  }
                />
              )}
            />
            {web?.length > 0 ? <Title>{t('companyLink')}</Title> : null}
            {web?.map((v: any) => (
              <>
                <WrapWebLink key={v.address}>
                  <WebLink>{v?.name}</WebLink>
                  <WebValue>
                    <a href='v?.address'>({v?.address})</a>
                    <IconButton onClick={() => handleWebDelete(v)}>
                      <DeleteIcon />
                    </IconButton>
                  </WebValue>
                </WrapWebLink>
              </>
            ))}
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

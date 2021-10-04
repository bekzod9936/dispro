import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SaveIcon } from '../../../assets/icons/InfoPageIcons/InfoPageIcons';
import {
  CustomButton,
  ModalComponent,
  SectionWrapper,
} from '../../../styles/CustomStyles';
import {
  AboutSectionWrapper,
  CustomStatic,
  ScrolableWrapper,
} from './InfoPageStyes';
import { Text } from '../../../styles/CustomStyles';
import { Flex } from '../../../styles/BuildingBlocks';
import { type } from 'os';
import CustomFileUpload from './CustomFileUpload';
import CustomInput from '../../../components/Custom/CustomInput';
import { appendErrors, Controller, useForm } from 'react-hook-form';
import CustomTextArea from './CustomTextArea';
import CustomMulitpleSelect from './CustomMulitpleSelect';
import {
  Avatar,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
} from '@material-ui/core';
import partnerApi from '../../../services/interceptors/companyInterceptor';
import axios from 'axios';
import { STORAGE_URL, URL } from '../../../services/constants/config';
import {
  VKIcon,
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  WhatsAppIcon,
  ArrowIcon,
  ChumBucketIcon,
} from '../../../assets/icons/InfoPageIcons/AboutIcons';
import { useQuery } from 'react-query';
import { classicNameResolver } from 'typescript';
import { makeStyles } from '@material-ui/core';
import { COLORS } from '../../../services/Types/enums';
import InlineFilters from '../statistics/InlineFilters';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { setCompanyState } from '../../../services/redux/Slices/authSlice';
import Resizer from 'react-image-file-resizer';
import Spinner from '../../../components/Helpers/Spinner';
import Notification from '../../../components/Helpers/Notification';
import { Skeleton } from '@material-ui/lab';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CustomModal from '../../../components/Custom/CustomModal';
import { setCurrentPage } from '../../../services/redux/Slices/partnerSlice';
import { watch } from 'fs';
import { setLoyaltyProgramm } from '../../../services/redux/Slices/settingsSlice';

const useStyles = makeStyles({
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  delete: {
    visibility: 'visible',
    position: 'absolute',
    opacity: 0,
    top: '50%',
    left: '12%',
    '&:hover': {
      transform: 'scale(1.4)',
      cursor: 'pointer',
      '& $avatar': {
        filter: 'brightness(0.8)',
      },
    },
  },
  '&:hover$avatar $.delete': {
    opacity: 1,
  },
});
interface IInputArray {
  type:
    | 'file'
    | 'text'
    | 'textarea'
    | 'multipleselect'
    | 'text_withbutton'
    | 'static';
  label: string;
  aboveLabel: string;
  aboveInput: string;
  name: string;
}
const inputsArray: IInputArray[] = [
  {
    type: 'file',
    label: 'upload_photo',
    aboveLabel: 'logo_text',
    aboveInput: 'logo',
    name: 'logo',
  },
  {
    type: 'text',
    label: 'title',
    aboveLabel: '',
    aboveInput: '',
    name: 'title',
  },
  {
    type: 'text',
    label: 'company_direction',
    aboveLabel: '',
    aboveInput: '',
    name: 'company_direction',
  },
  {
    type: 'textarea',
    label: 'description',
    aboveLabel: '',
    aboveInput: '',
    name: 'description',
  },
  {
    type: 'static',
    label: 'currency',
    aboveLabel: '',
    aboveInput: '',
    name: 'currency',
  },
  {
    type: 'multipleselect',
    label: 'chose_categories',
    aboveLabel: '',
    aboveInput: '',
    name: 'categories',
  },
  {
    type: 'text_withbutton',
    label: 'keywords',
    aboveLabel: '',
    aboveInput: '',
    name: 'keywords',
  },
];

const secondColumn: IInputArray[] = [
  {
    type: 'text',
    label: 'phoneNumber',
    aboveLabel: 'phone_above_label_text',
    aboveInput: 'phone',
    name: 'phoneNumber',
  },
  {
    type: 'text',
    label: 'linkName',
    aboveLabel: 'companyLink_text',
    aboveInput: 'companyLink',
    name: 'linkName',
  },
  {
    type: 'text',
    label: 'link',
    aboveLabel: '',
    aboveInput: '',
    name: 'link',
  },
];
interface IProps {
  currentFilial: any;
  setSection: any;
}

const fetchCategories = () => {
  const res = partnerApi.get('/directory/category');
  return res;
};

const dataURIToBlob = (dataURI: any) => {
  const splitDataURI = dataURI.split(',');
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

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

const AboutSection: React.FC<IProps> = ({ currentFilial, setSection }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [keywordsError, setKeywordsError] = useState(false);
  const [hover, setHover] = useState<boolean>(false);

  const response = useQuery(['categories'], fetchCategories, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      setOptions(data.data.data);
    },
  });

  const [options, setOptions] = useState<any>([]);
  const socialLinks = [
    { name: 'Telegram', Icon: <TelegramIcon />, vaue: '' },
    { name: 'Twitter', Icon: <TwitterIcon />, vaue: '' },
    { name: 'Instagram', Icon: <InstagramIcon />, vaue: '' },
    { name: 'Facebook', Icon: <FacebookIcon />, vaue: '' },
    { name: 'WhatsApp', Icon: <WhatsAppIcon />, vaue: '' },
    { name: 'Viber', Icon: <ViberIcon />, vaue: '' },
    { name: 'Vkontakte', Icon: <VKIcon />, vaue: '' },
  ];
  const [logo, setLogo] = useState<any>('');
  let companyId: any = localStorage.getItem('companyId');
  let companyToken = localStorage.getItem('companyToken');
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm();
  const [socialLinksState, setSociaLinksState] = useState<any>([]);
  const [presentationalSocialLinks, setPresentationalSocialLinks] =
    useState<any>(socialLinks);
  const [values, setValues] = useState<any>([]);
  const [keywords, setKeywords] = useState<any>([]);
  const [keywordField, setKeywordField] = useState('');
  const [logoStatus, setLogoStatus] = useState('');
  const [requestError, setRequestError] = useState<any>(null);
  const [imageLoaded, setImageLoaded] = useState('notLoaded');
  const [categoriesError, setCategoriesError] = useState(false);

  const [linkText, setLinkText] = useState('');
  const [addlink, setAddLink] = useState('');
  const formData = new FormData();
  const onFormSubmit = async (data: any) => {
    if (!keywords.length) {
      setKeywordsError(true);
      return;
    }
    if (data.categories?.length < 2 || !data.categories) {
      // setCategoriesError(true);
      setError('categories', { type: 'min2', shouldFocus: true });
      return;
    }
    // await partnerApi.put('/directory/company', {
    //   annotation: data.company_direction,
    //   categories: data.categories || values,
    //   companyId: +companyId,
    //   currencyId: 1,
    //   description: data.description,
    //   isHalol: true,
    //   isKosher: false,
    //   keyWords: keywords?.join(','),
    //   linkEnable: false,
    //   links: [{ name: data.linkName, address: data.link, enable: true, id: 0 }],
    //   logo: logo || '',
    //   name: data.title,

    //   socialLinks: socialLinksState,
    //   telNumber: data.phoneNumber,
    // });
    setSection('address');
  };

  useEffect(() => {
    if (watch('categories')?.length > 1) {
      clearErrors('categories');
    }
    if (watch('categories')?.length < 2) {
      setError('categories', { type: 'min2' });
    }
  }, [watch('categories')]);

  const handleKeywordsClose = (item: any) => {
    let copy = [...keywords];

    let filtered = copy.filter((value: any, index: number) => {
      return index != item;
    });

    setKeywords(filtered);
  };
  console.log(logo, 'logo');

  const handleDeleteLogo = async () => {
    setLogoStatus('deleting');
    try {
      await axios.delete(`${STORAGE_URL}/company`, {
        data: {
          links: [logo],
        },
        headers: {
          authorization: 'Bearer ' + companyToken,
          langId: 1,
        },
      });
      setRequestError('successDelete');
      setHover(false);
      setLogoStatus('static');
      setLogo('');
    } catch (err) {
      setRequestError('errorDelete');
    }
  };

  useEffect(() => {
    let copy = [...presentationalSocialLinks];
    if (currentFilial.currencyId) {
      setLogo(currentFilial.logo);

      setValue('title', currentFilial?.name, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('description', currentFilial?.description, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('link', currentFilial?.links[0]?.address, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('linkName', currentFilial?.links[0]?.name, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('phoneNumber', currentFilial?.telNumber, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('company_direction', currentFilial?.annotation, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('keywords', currentFilial?.keyWords, {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setValue("categories", currentFilial.categories, { shouldValidate: true, shouldDirty: true })
      // setSociaLinksState(currentFilial.socialLinks);
      setValues(currentFilial.categories);
      setKeywords(currentFilial?.keyWords.split(','));
      copy.forEach((item, index) => {
        item.value = currentFilial.socialLinks[index]?.value;
      });
      setPresentationalSocialLinks(copy);
    }
  }, [currentFilial]);

  const handleFileUploadChange = async (e: any) => {
    setLogoStatus('uploading');
    const file = e.target.files[0];
    const image = await resizeFile(file);

    const newFile = dataURIToBlob(image);
    formData.append('itemId', companyId);
    formData.append('fileType', 'companyLogo');
    formData.append('file', newFile, 'logo.png');
    try {
      const response = await axios.post(
        `${STORAGE_URL}/company/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: 'Bearer ' + companyToken,
            langId: 1,
          },
        }
      );
      setRequestError('successUpload');
      setLogoStatus('static');
      setLogo(response.data.data.link);
    } catch (err) {
      setRequestError('errorUpload');
    }
  };
  const handleAddKeywordClick = () => {
    if (keywordField.length) {
      setKeywords([...keywords, keywordField]);
      setKeywordField('');
      setKeywordsError(false);
    }
  };

  useEffect(() => {
    if (!logo) {
      setImageLoaded('notLoaded');
    }
  }, [logo]);
  const handleConnect = (name: any) => {
    setAddLink(name);
  };
  const handleSaveLink = () => {
    let copy = [...presentationalSocialLinks];
    let second = [...presentationalSocialLinks];
    let found = copy.find((item: any) => item.name === addlink);
    let foundIndex = copy.findIndex((item) => item.name === addlink);
    let secondIndex = second.findIndex((item) => item.name === addlink);
    second[secondIndex].value = linkText;
    found.value = linkText;

    copy.splice(foundIndex, 1, found);
    setPresentationalSocialLinks(second);
    setSociaLinksState(copy);
    setLinkText('');
    setAddLink('');
  };
  return (
    <>
      <AboutSectionWrapper>
        {response?.data?.data && currentFilial && options.length && (
          <form onSubmit={handleSubmit(onFormSubmit)} style={{ width: '100%' }}>
            <ScrolableWrapper
              style={{
                padding: '50px 40px',
                height: '1200px',
                boxSizing: 'border-box',
              }}
              id='scrollableWrapper'
            >
              <div
                style={{
                  display: 'flex',
                  height: '65vh',
                  justifyContent: 'start',
                  alignItems: 'flex-start',
                  overflowY: 'scroll',
                  flexDirection: 'row',
                }}
              >
                <Flex
                  flexDirection='column'
                  alignItems='center'
                  width='50%'
                  margin='0px 0px 200px 0px'
                >
                  {inputsArray.map((item: any) => {
                    if (item.type === 'file') {
                      if (!logo && logoStatus === 'static') {
                        return (
                          <CustomFileUpload
                            aboveInput={item.aboveInput}
                            aboveLabel={item.aboveLabel}
                            label={item.label}
                            onChange={handleFileUploadChange}
                          />
                        );
                      } else if (
                        logoStatus === 'deleting' ||
                        logoStatus === 'uploading'
                      ) {
                        return (
                          <div>
                            <Spinner />
                          </div>
                        );
                      } else {
                        return (
                          <div style={{ width: '85%' }}>
                            <div style={{ marginBottom: '10px' }}>
                              <Text fontSize='18px'>{t('logo')}</Text>
                            </div>
                            <div
                              style={{
                                position: 'relative',
                                width: 'fit-content',
                              }}
                            >
                              <div
                                style={{
                                  width: 'auto',
                                  height: 'auto',
                                  position: 'relative',
                                }}
                              >
                                {imageLoaded === 'notLoaded' && (
                                  <Skeleton
                                    width='150px'
                                    height='150px'
                                    style={{
                                      borderRadius: '14px',
                                      position: 'absolute',
                                      zIndex: 200,
                                    }}
                                  />
                                )}

                                <LazyLoadImage
                                  onMouseOutCapture={() => {
                                    setHover(false);
                                  }}
                                  onMouseOver={() => {
                                    setHover(true);
                                  }}
                                  src={logo}
                                  onLoadCapture={() => {
                                    setImageLoaded('loaded');
                                  }}
                                  style={{
                                    borderRadius: '14px',
                                    width: '150px',
                                    height: '150px',
                                    filter: hover
                                      ? 'brightness(0.6)'
                                      : 'brightness(1)',
                                  }}
                                />
                              </div>
                              <div
                                onClick={handleDeleteLogo}
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  opacity: hover ? 1 : 0,
                                }}
                                onMouseOver={() => setHover(true)}
                              >
                                <ChumBucketIcon />
                              </div>
                            </div>
                          </div>
                        );
                      }
                    } else if (item.type === 'text') {
                      return (
                        <>
                          <Controller
                            control={control}
                            name={item?.name}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => {
                              return (
                                <CustomInput
                                  flexStyle={{ width: '85%' }}
                                  style={{ width: '100%' }}
                                  field={field}
                                  fieldState={fieldState}
                                  label={item.label}
                                  aboveInput={item.aboveInput}
                                  aboveLabel={item.aboveLabel}
                                />
                              );
                            }}
                          />
                          {errors[item.name]?.type === 'required' && (
                            <div style={{ width: '80%', alignSelf: 'start' }}>
                              <Text
                                marginLeft='10%'
                                fontSize='12px'
                                fontWeight={400}
                                color='red'
                              >
                                {t('requiredField')}
                              </Text>
                            </div>
                          )}
                        </>
                      );
                    } else if (item.type === 'textarea') {
                      return (
                        <Controller
                          control={control}
                          name={item.name}
                          rules={{ required: true }}
                          render={({ field, fieldState }) => {
                            return (
                              <CustomTextArea
                                fieldState={fieldState}
                                field={field}
                                label={item.label}
                              />
                            );
                          }}
                        />
                      );
                    } else if (item.type === 'multipleselect') {
                      return (
                        <>
                          <Controller
                            control={control}
                            name={item.name}
                            //   rules={{ required: true }}

                            render={({ field, fieldState }) => {
                              return (
                                <CustomMulitpleSelect
                                  //style = {{border : }}

                                  fieldState={fieldState}
                                  field={field}
                                  options={options}
                                  label={item.label}
                                />
                              );
                            }}
                          />
                          {errors.categories?.type === 'min2' ? (
                            <div style={{ width: '85%' }}>
                              <Text
                                fontSize='12px'
                                fontWeight={300}
                                color='red'
                              >
                                {t('choseAtLeastTwo')}
                              </Text>
                            </div>
                          ) : null}
                        </>
                      );
                    } else if (item.type === 'static') {
                      return (
                        <div style={{ width: '85%', marginTop: '25px' }}>
                          <label htmlFor='static'>
                            <Text
                              fontSize='16px'
                              fontWeight={700}
                              color='#c7c7c7'
                            >
                              {t(item.label)}
                            </Text>
                          </label>
                          <CustomStatic id='static'>
                            {t('Uzbkeistan(UZS)')}
                          </CustomStatic>
                        </div>
                      );
                    } else if (item.type === 'text_withbutton') {
                      return (
                        <Controller
                          name={item.name}
                          control={control}
                          render={({ field }) => {
                            return (
                              <div style={{ width: '85%', marginTop: '25px' }}>
                                <InputLabel
                                  style={{ marginBottom: '10px' }}
                                  htmlFor='text_withbutton'
                                >
                                  <Text
                                    fontSize='16px'
                                    fontWeight={700}
                                    color='#C2C2C2'
                                  >
                                    {t(item.label)}
                                  </Text>
                                </InputLabel>
                                <Input
                                  disableUnderline
                                  onChange={(e) =>
                                    setKeywordField(e.target.value)
                                  }
                                  value={keywordField}
                                  style={{
                                    padding: '15px 0px 15px 20px',
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    border: !keywordsError
                                      ? '1px solid #c4c4c4'
                                      : '1px solid red',
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                  }}
                                  endAdornment={
                                    <InputAdornment
                                      position='end'
                                      style={{ height: '100%', margin: '0px' }}
                                    >
                                      <div
                                        onClick={handleAddKeywordClick}
                                        style={{
                                          background: COLORS.purple,
                                          cursor: 'pointer',
                                          width: '80px',
                                          height: '62px',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <ArrowIcon />
                                      </div>
                                    </InputAdornment>
                                  }
                                />
                                {keywords.length ? (
                                  <InlineFilters
                                    filterItems={keywords}
                                    handleClose={handleKeywordsClose}
                                  />
                                ) : null}
                                {keywordsError ? (
                                  <Text
                                    fontSize='13px'
                                    fontWeight={400}
                                    color='red'
                                  >
                                    {t('requiredField')}
                                  </Text>
                                ) : null}
                              </div>
                            );
                          }}
                        />
                      );
                    }
                  })}
                </Flex>
                <Flex
                  flexDirection='column'
                  alignItems='flex-start'
                  width='50%'
                  margin='0px 0px 0px 30px'
                >
                  {secondColumn.map((item: any) => {
                    if (item?.type === 'text') {
                      return (
                        <Controller
                          control={control}
                          name={item.name}
                          render={({ field }) => {
                            return (
                              <CustomInput
                                field={field}
                                label={item.label}
                                aboveInput={item.aboveInput}
                                aboveLabel={item.aboveLabel}
                              />
                            );
                          }}
                        />
                      );
                    }
                  })}
                  <div style={{ marginTop: '25px' }}>
                    <Text>{t('socialLinks')}</Text>
                  </div>
                  <div
                    style={{
                      width: '85%',
                      justifyContent: 'space-between',
                      marginTop: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {presentationalSocialLinks.map(
                      ({ Icon, name, value }: any) => {
                        return (
                          <Flex
                            justifyContent='space-between'
                            width='100%'
                            alignItems='center'
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                              }}
                            >
                              <div
                                style={{
                                  background: '#606EEA',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '45px',
                                  height: '50px',
                                  borderRadius: '14px',
                                  margin: '10px',
                                }}
                              >
                                {Icon}
                              </div>
                              <Text marginLeft='10px'>{name}</Text>
                            </div>
                            <div onClick={() => handleConnect(name)}>
                              <Text
                                fontSize='16px'
                                fontWeight={300}
                                color='#3492FF'
                              >
                                {value || t('connect')}
                              </Text>
                            </div>
                          </Flex>
                        );
                      }
                    )}
                  </div>
                </Flex>
              </div>
            </ScrolableWrapper>
            <div
              className='areaforsavebutton'
              style={{
                position: 'fixed',
                bottom: '-0px',
                background: 'white',
                width:
                  document
                    .getElementById('scrollableWrapper')
                    ?.getBoundingClientRect().width + 'px    ',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '90%',
                  borderTop: '1px solid #c4c4c4',
                  padding: '20px 0px',
                }}
              >
                <CustomButton>
                  <SaveIcon />
                  <Text marginLeft='15px' color='white'>
                    {t('save')}{' '}
                  </Text>
                </CustomButton>
              </div>
            </div>
          </form>
        )}
        <Notification
          open={
            requestError === 'successUpload' || requestError === 'successDelete'
          }
          handleClose={() => {
            setRequestError(null);
          }}
          message={t(requestError)}
        />
        <Notification
          open={
            requestError === 'errorUpload' || requestError === 'errorDelete'
          }
          message={t(requestError)}
          handleClose={() => {
            setRequestError(null);
          }}
        />
      </AboutSectionWrapper>
      <CustomModal open={addlink.length > 0}>
        <ModalComponent>
          <div>
            <Text>{t('enterTheLink') + ' для' + addlink}</Text>
          </div>
          <div style={{ marginTop: '15px' }}>
            <Input
              disableUnderline
              style={{
                border: '1px solid #c4c4c4',
                borderRadius: '14px',
                padding: '15px',
                width: '300px',
              }}
              onChange={(e) => setLinkText(e.target.value)}
            />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '15px',
            }}
          >
            <CustomButton onClick={handleSaveLink}>
              <SaveIcon />
              <Text marginLeft='10px' color='white'>
                {t('add')}
              </Text>
            </CustomButton>
          </div>
        </ModalComponent>
      </CustomModal>
    </>
  );
};

export default AboutSection;

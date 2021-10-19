import React, { useState } from 'react';
import { SaveIcon } from '../../../assets/icons/InfoPageIcons/InfoPageIcons';
import {
  CustomButton,
  CustomSelect,
  ModalComponent,
  SectionWrapper,
} from '../../../styles/CustomStyles';
import { AboutSectionWrapper, ScrolableWrapper } from './InfoPageStyes';
import { Text } from '../../../styles/CustomStyles';
import { useTranslation } from 'react-i18next';
import { CancelIcon } from '../../../assets/icons/ClientsPageIcons/ClientIcons';
import { setStatus } from '../../../services/redux/Slices/clientStatistics';
import { Flex } from '../../../styles/BuildingBlocks';
import { Controller, useForm } from 'react-hook-form';
import CustomInput from '../../../components/Custom/CustomInput';
import CustomTextArea from './CustomTextArea';
import CustomSelectInput from '../../../components/Custom/CustomSelectInput';
import CustomDatePicker from '../../../components/Custom/CustomDatePicker';
import moment from 'moment';
import { setDate } from 'date-fns';
import CustomFileUpload from './CustomFileUpload';
import Resizer from 'react-image-file-resizer';
import CustomReusableSelect from '../../../components/Custom/CustomReusableSelect';
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '../../../services/Types/enums';
import { Checkbox, InputLabel, makeStyles, TextField } from '@material-ui/core';
import CustomMulitpleSelect from './CustomMulitpleSelect';
import { FilialIcon } from '../../../assets/icons/NewsIcons/NewsIcons';
import axios from 'axios';
import { STORAGE_URL } from '../../../services/constants/config';
import partnerApi from '../../../services/interceptors/companyInterceptor';
import { useQuery } from 'react-query';
import CropImageModal from './CropImageModal';
import { fetchAddressInfo } from '../../../services/queries/InfoPageQueries';
import { DeleteIconWhite } from '../../../assets/icons/SettingsIcons/SettingsPageIcon';
import CustomModal from '../../../components/Custom/CustomModal';
import CustomToggle from 'components/Custom/CustomToggleSwitch';

interface IProps {
  setStatus?: any;
}

interface IFormState {
  description: string;
  title: string;
  gender: number;
  ageLimit: string | number;
  filials: [] | number[];
  text_push?: any;
}

interface IPostDataNews {
  title: string;
  startLifeTime: string;
  endLifeTime: string;
  description: string;
  ageFrom: number;
  ageUnlimited: boolean;
  couponIds: number[];
  image: string;
  genderType: number;
  pushUp: boolean;
  settings?:
    | {
        weekDays: number[];
        aroundTheClock: boolean;
        time: {
          from: string;
          to: string;
        };
        stores: any;
      }
    | {};
}

const useStyles = makeStyles({
  timepicker: {
    marginRight: '15px',
    width: '46%',
    border: '1px solid #c4c4c4',
    borderRadius: '14px',
    padding: '10px 10px',
    boxSizing: 'border-box',
  },
});

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
const CreateNews: React.FC<IProps> = ({ setStatus }) => {
  const { t } = useTranslation();
  const companyId: any = localStorage.getItem('companyId');
  const [main, setMain] = useState<any>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const { control, handleSubmit, formState: errors } = useForm<IFormState>();
  const filialOptions = [
    {
      key: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {' '}
          <FilialIcon />
          <div>
            <Text marginLeft='12px'>{t('chose_filial')}</Text>
          </div>
        </div>
      ),
      value: 1,
    },
  ];
  const [filials, setFilials] = useState<any>([...filialOptions]);

  const responseFilials = useQuery(
    ['filials'],
    () => fetchAddressInfo(+companyId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let formated = data?.data?.data
          ?.filter((item: any) => item.isMain === false)
          .map((item: any) => {
            return { key: item.address, value: item.id };
          });
        let main = data?.data?.data?.find((item: any) => {
          return item.isMain === true;
        });
        setFilials([...filialOptions, ...formated]);
        setMain([main?.id]);
      },
    }
  );
  const [isCropModalVisible, setIsCropModalIsVisible] = useState(false);
  const [file, setFile] = useState(null);
  const companyToken = localStorage.getItem('companyToken');

  const [usePushNotificationsState, setUsePushNotificationsState] =
    useState<boolean>(false);
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const reusableWidth =
    +(
      document.getElementById('scrolable_wrapper')?.getBoundingClientRect()
        ?.width || 1000
    ) - 40;

  //const [filials, setFilials] = useState<number[] | []>([]);
  const [imgLink, setImgLink] = useState<string>('');
  const [days, setDays] = useState<number[]>([]);
  const classes = useStyles();
  const [timeFrom, setTimeFrom] = useState<string>('');
  const [timeTo, setTimeTo] = useState<string>('');
  const [hover, setHover] = useState<boolean>(false);
  const [aroundTheClock, setAroundTheClock] = useState<boolean>(false);
  const handleSelectChange = (checked: any, id: number) => {
    if (checked) {
      let copy = [...days];
      copy.push(id);
      setDays(copy);
    } else {
      let copy = [...days];
      let filtered = copy.filter((item) => {
        return item !== id;
      });
      setDays(filtered);
    }
  };

  const onFormSubmit = async (data: any) => {
    if (!imgLink) {
      setImageError(true);
      // let myDiv: any = document.getElementById('scrollableDiv')
      // myDiv.animate({ scrollTop: 0 }, "fast");
      return;
    }
    setImageError(false);
    let submitingData: IPostDataNews | {} = {
      title: data.title,
      startLifeTime: fromDate,
      endLifeTime: toDate,
      description: data.description,
      ageFrom: data.ageLimit,
      ageUnlimited: false,
      couponIds: [],
      image: imgLink,
      genderType: +data.gender,
      pushUp: usePushNotificationsState,
      settings: usePushNotificationsState
        ? {
            weekDays: days,
            aroundTheClock: aroundTheClock,
            time: {
              from: timeFrom,
              to: timeTo,
            },
            stores: data.filials.value === 1 ? main : [data.filials],
          }
        : {},
    };

    try {
      await partnerApi.post('/core/news', submitingData);
      setStatus('');
    } catch (err) {}
  };

  const handlePhotoChange = async (e: any) => {
    const formData = new FormData();
    const file = e.target.files[0];
    const image = await resizeFile(file);

    const newFile = dataURIToBlob(image);
    //  formData.append('itemId', companyId);
    // formData.append('fileType', 'companyLogo');
    formData.append('file', newFile);
    try {
      const response = await axios.post(
        `${STORAGE_URL}/news/upload`,
        formData,
        {
          headers: {
            authorization: 'Bearer ' + companyToken,
            langId: 1,
          },
        }
      );
      setImgLink(response.data.data.link);
    } catch (err) {}
    // setFile(e.target.files[0]);
    // setIsCropModalIsVisible(true);
  };
  const options = [
    {
      key: t('all'),
      value: 0,
    },
    {
      key: t('male'),
      value: 1,
    },
    {
      key: t('female'),
      value: 2,
    },
  ];
  const deleteImage = async () => {
    await axios.delete(`${STORAGE_URL}/news`, {
      data: {
        links: [imgLink],
      },
      headers: {
        authorization: 'Bearer ' + companyToken,
        langId: 1,
      },
    });
    setImgLink('');
    setHover(false);
  };
  const handleUsePush = (checked: boolean) => {
    if (checked) {
      setUsePushNotificationsState(true);
    } else {
      setUsePushNotificationsState(false);
    }
  };
  const weekDays = [
    {
      name: (
        <div
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Checkbox
            checked={days.includes(1) ? true : false}
            onChange={(e: any, checked: any) => handleSelectChange(checked, 1)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />{' '}
          <Text>{t('monday')}</Text>
        </div>
      ),
      id: 0,
      key: t('monday'),
    },
    {
      name: (
        <div
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Checkbox
            checked={days.includes(2) ? true : false}
            onChange={(e: any, checked: any) => handleSelectChange(checked, 2)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />{' '}
          <Text>{t('tuesday')}</Text>
        </div>
      ),
      id: 1,
      key: t('tuesday'),
    },
    {
      name: (
        <div
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Checkbox
            checked={days.includes(3) ? true : false}
            onChange={(e: any, checked: any) => handleSelectChange(checked, 3)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />{' '}
          <Text>{t('wednesday')}</Text>
        </div>
      ),
      id: 2,
      key: t('wednesday'),
    },
    {
      name: (
        <div
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Checkbox
            checked={days.includes(4) ? true : false}
            onChange={(e: any, checked: any) => handleSelectChange(checked, 4)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />{' '}
          <Text>{t('thursday')}</Text>
        </div>
      ),
      id: 3,
      key: t('thursday'),
    },
    {
      name: (
        <div
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Checkbox
            checked={days.includes(5) ? true : false}
            onChange={(e: any, checked: any) => handleSelectChange(checked, 5)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />{' '}
          <Text>{t('friday')}</Text>
        </div>
      ),
      id: 4,
      key: t('friday'),
    },
    {
      name: (
        <div
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Checkbox
            checked={days.includes(6) ? true : false}
            onChange={(e: any, checked: any) => handleSelectChange(checked, 6)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />{' '}
          <Text>{t('saturday')}</Text>
        </div>
      ),
      id: 5,
      key: t('saturday'),
    },
    {
      name: (
        <div
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Checkbox
            checked={days.includes(7) ? true : false}
            onChange={(e: any, checked: any) => handleSelectChange(checked, 7)}
          />{' '}
          <Text>{t('sunday')}</Text>
        </div>
      ),
      id: 6,
      key: t('sunday'),
    },
  ];

  return (
    <div style={{ flexGrow: 1 }}>
      <AboutSectionWrapper
        id='scrolable_wrapper'
        style={{ boxSizing: 'border-box', position: 'relative' }}
      >
        <ScrolableWrapper style={{ padding: '30px 40px' }} id='scrollableDiv'>
          <form>
            <Flex
              width='100%'
              height='70vh'
              justifyContent='start'
              alignItems='flex-start'
              overflowY='scroll'
            >
              <Flex
                width='48%'
                alignItems='flex-start'
                flexDirection='column'
                margin='0px 0px 50px 0px'
              >
                {!imgLink ? (
                  <div>
                    <CustomFileUpload
                      aboveInput='photos'
                      aboveLabel='logo_text'
                      onChange={handlePhotoChange}
                      label='upload_photo'
                    />

                    {imageError && (
                      <Text fontSize='14px' fontWeight={400} color='red'>
                        {t('imageErrorRequired')}
                      </Text>
                    )}
                  </div>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <Text fontWeight={500} fontSize={FONT_SIZE.meduim}>
                        {t('photos')}
                      </Text>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: '55%',
                        left: '50%',
                        transform: 'translate(-55%, -50%)',
                        opacity: hover ? 1 : 0,
                        zIndex: 200,
                      }}
                      onClick={deleteImage}
                      onMouseOver={() => setHover(true)}
                    >
                      <DeleteIconWhite />
                    </div>
                    <div
                      onMouseOver={() => setHover(true)}
                      onMouseOutCapture={() => setHover(false)}
                      style={{
                        width: '280px',
                        height: '170px',
                        borderRadius: '14px',
                        objectFit: 'cover',
                        overflow: 'hidden',
                        position: 'relative',
                        filter: hover ? 'brightness(0.6)' : 'brightness(1)',
                      }}
                    >
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={imgLink}
                        alt=''
                      />
                    </div>
                  </div>
                )}
                <Controller
                  control={control}
                  name='title'
                  rules={{ required: true }}
                  render={({ field }) => {
                    return <CustomInput field={field} label='title' />;
                  }}
                />
                {errors.errors.title?.type === 'required' && (
                  <Text fontSize='14px' fontWeight={400} color='red'>
                    {t('requiredField')}
                  </Text>
                )}
                <Controller
                  control={control}
                  name='description'
                  rules={{ required: true }}
                  render={({ field }) => {
                    return <CustomTextArea field={field} label='description' />;
                  }}
                />
                {errors.errors.description?.type === 'required' && (
                  <Text fontSize='14px' fontWeight={400} color='red'>
                    {t('requiredField')}
                  </Text>
                )}

                <Flex width='86%' justifyContent='start' margin='0px'>
                  <CustomDatePicker
                    date={fromDate}
                    prefix={t('from')}
                    handleDateChange={(date: any) => {
                      setFromDate(date);
                    }}
                  />
                  <CustomDatePicker
                    prefix={t('to')}
                    date={toDate}
                    handleDateChange={(date: any) => {
                      setToDate(date);
                    }}
                  />
                </Flex>
                <div style={{ width: '100%' }}>
                  <Controller
                    control={control}
                    name='gender'
                    rules={{ required: true }}
                    render={({ field }) => {
                      return (
                        <CustomReusableSelect
                          field={field}
                          label='chose_gender'
                          options={options}
                        />
                      );
                    }}
                  />
                  {errors.errors.gender?.type === 'required' && (
                    <Text fontSize='14px' fontWeight={400} color='red'>
                      {t('requiredField')}
                    </Text>
                  )}
                </div>

                <Controller
                  control={control}
                  name='ageLimit'
                  rules={{ required: true }}
                  render={({ field }) => {
                    return <CustomInput field={field} label='ageLimit' />;
                  }}
                />
                {errors.errors.gender?.type === 'required' && (
                  <Text fontSize='14px' fontWeight={400} color='red'>
                    {t('requiredField')}
                  </Text>
                )}
              </Flex>
              <Flex
                width='48%'
                justifyContent='start'
                alignItems='flex-start'
                margin='0px'
                flexDirection='column'
              >
                <div>
                  <Text
                    fontSize={FONT_SIZE.smallPlus}
                    marginRight='15px'
                    fontWeight={400}
                    color='#c4c4c4'
                  >
                    {t('turn_on_push')}
                  </Text>
                  <CustomToggle
                    checked={usePushNotificationsState}
                    onChange={(e: any, checked: any) => {
                      handleUsePush(checked);
                    }}
                  />
                </div>
                {usePushNotificationsState && (
                  <>
                    <Controller
                      control={control}
                      name='text_push'
                      render={({ field }) => {
                        return (
                          <CustomTextArea field={field} label='text_push' />
                        );
                      }}
                    />
                    <CustomMulitpleSelect
                      nodeType
                      setValues={setDays}
                      values={days}
                      options={weekDays}
                      label='Укажите дни'
                    />

                    <div style={{ marginTop: '20px', width: '100%' }}>
                      <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                        <Text fontSize={FONT_SIZE.meduim} color='#c4c4c4'>
                          {t('point_out_time')}
                        </Text>
                      </div>
                      <div>
                        <TextField
                          type='time'
                          className={classes.timepicker}
                          InputProps={{
                            disableUnderline: true,
                          }}
                          onChange={(e) => setTimeFrom(e.target.value)}
                          variant='standard'
                          value={timeFrom}
                        />
                        <TextField
                          type='time'
                          variant='standard'
                          inputProps={{
                            classes: classes,
                          }}
                          onChange={(e) => setTimeTo(e.target.value)}
                          InputProps={{
                            disableUnderline: true,
                          }}
                          className={classes.timepicker}
                          value={timeTo}
                        />
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <Checkbox />
                        <Text fontSize={FONT_SIZE.smallPlus}>{t('24/7')}</Text>
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <Controller
                          control={control}
                          name='filials'
                          render={({ field }) => {
                            return (
                              <CustomReusableSelect
                                field={field}
                                defaultValue={1}
                                fillColor='rgba(96, 110, 234,0.1)'
                                label=''
                                options={filials}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* {<CropImageModal src={file} setIsCropModalVisible={setIsCropModalIsVisible} isCropModalVisible={isCropModalVisible} setOuterLink={setImgLink} />} */}
              </Flex>
            </Flex>
          </form>
        </ScrolableWrapper>
        <div
          className='areaforsavebutton'
          style={{
            position: 'fixed',
            bottom: '-0px',
            background: 'white',
            width: +reusableWidth + 40 + 'px',
            display: 'flex',
            justifyContent: 'center',
            margin: '0px',
            boxSizing: 'border-box',
            padding: '0px 20px',
          }}
        >
          <div
            style={{
              width: `${reusableWidth}px`,
              minWidth: `${reusableWidth}px`,
              maxWidth: `${reusableWidth}px`,
              display: 'flex',
              borderTop: '1px solid #c4c4c4',
              padding: '20px 0px',
              boxSizing: 'border-box',
              background: 'white',
            }}
          >
            <CustomButton
              disabled={imgLink ? true : false}
              background='white'
              onClick={() => {
                setStatus('');
              }}
            >
              <CancelIcon />
              <Text marginLeft='15px'>{t('cancel')} </Text>
            </CustomButton>
            <CustomButton
              onClick={() => {
                handleSubmit(onFormSubmit)();
              }}
              style={{ marginLeft: '10px' }}
            >
              <SaveIcon />
              <Text marginLeft='15px' color='white'>
                {t('save')}{' '}
              </Text>
            </CustomButton>
          </div>
        </div>
      </AboutSectionWrapper>
    </div>
  );
};

export default CreateNews;

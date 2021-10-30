import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title, Text } from '../../style';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import Spinner from 'components/Custom/Spinner';
import { IconButton } from '@material-ui/core';
import WorkingHours from './WorkingHours';
import { useMutation } from 'react-query';
import { IAddress } from 'services/models/address_model';
import YandexMap from './YandexMap';
import axios from 'axios';
import partnerApi from 'services/interceptors/companyInterceptor';
import NewCompanyNotification from './NewCompanyNotification';
import useAddress from './useAddress';
import useInfoPage from '../useInfoPage';
import useLayout from 'components/Layout/useLayout';
import {
  Container,
  Rightside,
  YandexContainer,
  Form,
  LeftSide,
  SaveIcon,
  MobileMap,
  PlusIcon,
  SearchIcon,
  WrapHeader,
  WrapClose,
  CloseIcon,
  WrapContent,
  AddressInfo,
  Text1,
  Left,
  Right,
  Number,
  AddWrap,
  WrapInput,
  ExitIcon,
  ButtonWrap,
  ButtonsWrap,
  Ul,
  Li,
  WrapAddress,
  DeleteIcon,
  WrapSearch,
  WrapLocationAddress,
  NoResult,
  Message,
} from './style';

const companyId: any = localStorage.getItem('companyId');

interface FormProps {
  address?: string;
  addressDesc?: string;
  name?: string;
  aroundTheClock?: boolean;
  telNumbers?: any;
  regionId?: number;
  id?: number;
  isMain?: boolean;
}

interface WProps {
  aroundTheClock: boolean;
  work: {
    day: number;
    dayOff: boolean;
    wHours: { from: string; to: string };
    bHours: { from: string; to: string };
    weekday: string;
  }[];
}

const Address = () => {
  const { t } = useTranslation();
  const { responseAddress, dataAddress, weeks, inntialWorkTime } = useAddress();
  const { resHeader } = useLayout({ id: companyId });
  const { response, data } = useInfoPage();
  const [workError, setWorkError] = useState<boolean>(false);
  const [fillial, setFillial] = useState<any[]>([]);
  const [searchRes, setSearchRes] = useState<IAddress[]>([]);
  const [inpuSearch, setInpuSearch] = useState<string>('');
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [yandexRef, setYandexRef] = useState<any>(null);
  const [searchAddressList, setSearchaddressList] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
  const [newComp, setNewComp] = useState(false);
  const [open, setOpen] = useState(true);
  const [palceOptions, setPalceOptions] = useState<any[]>([]);
  const [place, setPlace] = useState<any[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [mapAddress, setMapAddress] = useState({ name: '' });
  const [send, setSendDate] = useState<any>({
    aroundTheClock: false,
    work: inntialWorkTime,
  });
  const [showWork, setShowWork] = useState(false);
  const [isMain, setIsMain] = useState<boolean>(false);
  const [mapError, setMapError] = useState(false);

  const defaultTime = inntialWorkTime.map((v: any) => {
    const common = weeks.find((i: any) => i.day === v.day);
    return {
      ...v,
      weekday: common?.weekday,
    };
  });

  const [workingTime, setworkingTime] = useState<WProps>({
    aroundTheClock: false,
    work: defaultTime,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<FormProps>({
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const values = getValues();

  const fetchYandexAddressName = (lat: any, lon: any) => {
    axios
      .get(
        `https://geocode-maps.yandex.ru/1.x?apikey=6f33a62b-bf0f-4218-9613-374e77d830ab&lang=ru-RU&format=json&geocode=${lat},${lon}`
      )
      .then((res) => {
        setMapAddress({
          name: res.data.response.GeoObjectCollection.featureMember[0].GeoObject
            .metaDataProperty.GeocoderMetaData.Address.formatted,
        });

        setValue(
          'address',
          res.data.response.GeoObjectCollection.featureMember[0].GeoObject
            .metaDataProperty.GeocoderMetaData.Address.formatted
        );
      });
  };

  const onClickPlace = (e: any) => {
    const coords = e.get('coords');
    if (place?.length !== 0 || !open) {
      setPlace(coords);
      yandexRef?.setCenter(coords, 18);
      setMapError(false);
    }
  };

  const onBoundsChange = (e: any) => {
    if ((place[0] !== '' && place[1] !== '') || !edit) {
      const latAndlot = e.get('target').getCenter();
      fetchYandexAddressName(latAndlot[1], latAndlot[0]);
    }
  };

  const searchSelectedAddress = (item: any) => {
    setSearchAddress(item.GeoObject.name);
    const coordinates = item.GeoObject.Point.pos.split(' ');
    yandexRef?.setCenter([coordinates[1], coordinates[0]], 18);
    setIsSearchInputFocus(false);
  };

  const fetchYandexAddressSearch = (searchName: any) => {
    axios
      .get(
        `https://geocode-maps.yandex.ru/1.x?apikey=6f33a62b-bf0f-4218-9613-374e77d830ab&lang=ru-RU&format=json&geocode=${searchName}`
      )
      .then((res) => {
        setSearchaddressList(
          res.data.response.GeoObjectCollection.featureMember
        );
      });
  };

  useEffect(() => {
    if (!open && searchAddress !== '') {
      fetchYandexAddressSearch(searchAddress);
    }
  }, [searchAddress, open]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'telNumbers',
  });

  const handleSearch = (e: any) => {
    setInpuSearch(e.target.value);

    const searchResult = fillial.filter((v: any) => {
      return (
        v.address.toLowerCase().includes(e.target.value?.toLowerCase()) ||
        v.addressDesc.toLowerCase().includes(e.target.value?.toLowerCase()) ||
        v.name.toLowerCase().includes(e.target.value?.toLowerCase())
      );
    });

    setSearchRes(searchResult);
  };

  const handleChoosFillial = (v: any) => {
    const newNumbers = v.telNumbers.map((v: any) => {
      return { number: v };
    });
    setPlace([v?.location.lat, v?.location.lng]);
    yandexRef?.setCenter([v?.location.lat, v?.location.lng], 18);
    setOpen(false);
    setValue('id', v.id);
    setValue('name', v.name);
    setSearchAddress(v.address);
    setValue('address', v.address);
    setValue('regionId', v.regionId);
    setValue('telNumbers', newNumbers);
    setValue('addressDesc', v.addressDesc);
    setIsMain(v.isMain);
    const newData: any = workingTime.work.map((a: any) => {
      const common: any = v?.workingTime?.work?.find(
        (i: any) => i.day === a.day
      );
      return {
        day: a.day,
        dayOff: common?.dayOff || false,
        wHours: common?.wHours || { from: '', to: '' },
        bHours: common?.bHours || { from: '', to: '' },
        weekday: a.weekday,
      };
    });
    setworkingTime({
      aroundTheClock: v.workingTime.aroundTheClock,
      work: newData,
    });
    setSendDate({
      aroundTheClock: v.workingTime.aroundTheClock,
      work: v?.workingTime?.work,
    });
  };

  const handleSaveClick = () => {
    if (!send.aroundTheClock) {
      const a = send.work.filter((v: any) => {
        if (!v.dayOff) {
          if (v.wHours?.from === '' || v.wHours.to === '') {
            return { ...v };
          }
        }
      });

      setWorkError(a?.length === 0);
      if (a?.length !== 0) {
        setShowWork(true);
      } else {
        setShowWork(false);
      }
    }

    if (place[0] !== '' && place[1] !== '') {
      setMapError(false);
    } else {
      setMapError(true);
    }
  };

  const handlePluseClick = () => {
    setOpen(false);
    setMapAddress({ name: '' });
    setValue('address', '');
    yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
    setSearchAddress('');
    setValue('addressDesc', '');
    setValue('name', '');
    setValue('telNumbers', [{ number: '+998' }]);
    setEdit(true);
    setValue('regionId', 0);
    setPlace(['']);
    setworkingTime({ aroundTheClock: false, work: defaultTime });
    setIsMain(!data.filledAddress);
  };

  const addressDelete = useMutation(
    (v: any) => {
      console.log(v);
      return partnerApi.delete(`/directory/stores/${v}`);
    },
    {
      onSuccess: () => {
        responseAddress.refetch();
        setOpen(true);
        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
        setEdit(false);
        setMapAddress({ name: '' });
        setValue('id', undefined);
        setValue('name', '');
        setSearchAddress('');
        setValue('address', '');
        setValue('regionId', 0);
        setValue('telNumbers', [{ number: '+998' }]);
        setValue('addressDesc', '');
        setSendDate({ aroundTheClock: false, work: inntialWorkTime });
      },
    }
  );

  const handleDeleteFilial = () => {
    addressDelete.mutate(getValues('id'));
  };

  const getTime = (e: any) => {
    setSendDate({
      aroundTheClock: e?.aroundTheClock,
      work: e.work.map((v: any) => {
        return {
          day: v.day,
          dayOff: v.dayOff,
          wHours: v.wHours,
          bHours: v.bHours,
        };
      }),
    });
  };

  const addressPut = useMutation(
    (v: any) => {
      return partnerApi.put(`/directory/stores/${v.id}`, v);
    },
    {
      onSuccess: () => {
        setOpen(true);
        responseAddress.refetch();
        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
        setSendDate({ aroundTheClock: false, work: inntialWorkTime });
      },
    }
  );

  const addressPost = useMutation(
    (v: any) => {
      return partnerApi.post(`/directory/stores`, v);
    },
    {
      onSuccess: () => {
        setOpen(true);
        responseAddress.refetch();

        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
      },
    }
  );

  const mainPut = useMutation(
    (v: any) => {
      return partnerApi.put(`/directory/company/address`, v);
    },
    {
      onSuccess: () => {
        resHeader.refetch();
        response.refetch();
        responseAddress.refetch();
        setOpen(true);
        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
      },
    }
  );

  const mainPost = useMutation((v: any) => {
    return partnerApi.put(`/directory/company/address`, v);
  });

  useEffect(() => {
    const a = send.work.filter((v: any) => {
      if (!v.dayOff) {
        if (v.wHours?.from === '' || v.wHours.to === '') {
          return { ...v };
        }
      }
    });
    setWorkError(a?.length === 0 || send.aroundTheClock);
  }, [send]);

  useEffect(() => {
    setFillial(dataAddress);
    const newArr = dataAddress.map((v: any) => {
      return { lat: v.location.lat, lng: v.location.lng, address: v.address };
    });
    setPalceOptions(newArr);
  }, [dataAddress]);

  const handleSubmitPut = (e: any) => {
    const values = {
      isMain: e.isMain,
      address: e.address,
      addressDesc: e.addressDesc,
      regionId: 0,
      telNumbers: e.telNumbers.map((v: any) => v?.number),
      companyId: +companyId,
      location: { lat: place[0], lng: place[1] },
      workingTime: send,
      id: e.id,
    };
    if (workError && place[0] !== '' && place[1] !== '') {
      if (e.isMain) {
        mainPut.mutate({ ...values, telNumber: e.telNumbers[0]?.number });
      } else {
        addressPut.mutate({ ...values, name: e.name });
      }
    }
  };

  const handleSubmitPost = (e: any) => {
    const values = {
      address: e.address,
      addressDesc: e.addressDesc,
      regionId: 0,
      telNumbers: e.telNumbers.map((v: any) => v?.number),
      companyId: +companyId,
      location: { lat: place[0], lng: place[1] },
      workingTime: send,
      isMain: e.isMain,
    };
    if (workError && place[0] !== '' && place[1] !== '') {
      if (data.filledAddress) {
        addressPost.mutate({ ...values, name: e.name });
      } else {
        mainPost
          .mutateAsync({ ...values, telNumber: e.telNumbers[0]?.number })
          .then((data) => {
            resHeader.refetch();
            response.refetch();
            responseAddress.refetch();
            setOpen(true);
            yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
            setPlace([]);
            setNewComp(true);
          });
      }
    }
  };

  return (
    <Container>
      {open ? (
        <>
          <AddWrap>
            <WrapHeader>
              <Button
                buttonStyle={{
                  bgcolor: 'white',
                  color: '#223367',
                  weight: 500,
                  shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
                  height: {
                    mobile: 45,
                    planshet: 45,
                    laptop: 50,
                    desktop: 60,
                  },
                }}
                margin={{
                  mobile: '15px 0 0 20px',
                }}
                onClick={handlePluseClick}
              >
                <PlusIcon />
                {t('addFilial')}
              </Button>
              <WrapInput>
                <Input
                  inputStyle={{ inpadding: '0 10px', border: 'none' }}
                  placeholder={t('searchbarnches')}
                  IconStart={<SearchIcon />}
                  margin={{ laptop: '0 0 0 20px', mobile: '0 20px' }}
                  fullWidth={true}
                  onChange={handleSearch}
                  type='search'
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() =>
                    inpuSearch === '' ? setSearchFocus(false) : null
                  }
                  value={inpuSearch}
                />
              </WrapInput>
            </WrapHeader>
            <WrapContent>
              {responseAddress.isLoading || responseAddress.isFetching ? (
                <Spinner />
              ) : !searchFocus || inpuSearch === '' ? (
                fillial?.map((v: IAddress) => (
                  <AddressInfo onClick={() => handleChoosFillial(v)}>
                    <Left>
                      <Title>{t('addresscompany')}</Title>
                      <Text1>{v.address}</Text1>
                    </Left>
                    <Right>
                      {v.telNumbers.map((n: any) => (
                        <Number>{n}</Number>
                      ))}
                    </Right>
                  </AddressInfo>
                ))
              ) : searchRes.length === 0 ? (
                <NoResult>{t('noresult')}</NoResult>
              ) : (
                searchRes?.map((v: IAddress) => (
                  <AddressInfo onClick={() => handleChoosFillial(v)}>
                    <Left>
                      <Title>{t('addresscompany')}</Title>
                      <Text1>{v.address}</Text1>
                    </Left>
                    <Right>
                      {v.telNumbers.map((n: any) => (
                        <Number>{n}</Number>
                      ))}
                    </Right>
                  </AddressInfo>
                ))
              )}
              <MobileMap>
                <YandexContainer>
                  <YandexMap />
                </YandexContainer>
              </MobileMap>
            </WrapContent>
          </AddWrap>
        </>
      ) : (
        <Form
          onSubmit={
            edit
              ? handleSubmit(handleSubmitPost)
              : handleSubmit(handleSubmitPut)
          }
        >
          {open ? null : (
            <WrapClose>
              <Title>{t('newbranch')}</Title>
              <IconButton
                onClick={() => {
                  setOpen(true);
                  yandexRef?.setCenter(
                    [41.32847446609404, 69.24298268717716],
                    10
                  );
                  setPlace([]);
                  setEdit(false);
                  setMapAddress({ name: '' });
                  setValue('id', undefined);
                  setValue('name', '');
                  setSearchAddress('');
                  setValue('address', '');
                  setValue('regionId', 0);
                  setValue('telNumbers', [{ number: '+998' }]);
                  setValue('addressDesc', '');
                  setSendDate({ aroundTheClock: false, work: inntialWorkTime });
                  setShowWork(false);
                  setMapError(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </WrapClose>
          )}
          <LeftSide>
            <Title>{t('Address')}</Title>
            <Text>{t('enterLocationText')}</Text>
            <WrapAddress>
              <WrapSearch>
                <Input
                  label={t('enterLocation')}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                  onChange={(e) => {
                    setValue('address', e.target.value);
                    if (!e.target.value) setSearchaddressList([]);
                    setSearchAddress(e.target.value);
                  }}
                  onFocus={() => setIsSearchInputFocus(true)}
                  value={searchAddress}
                  autoComplete='off'
                  type='search'
                />
                <Ul
                  visable={searchAddressList.length !== 0 && isSearchInputFocus}
                >
                  {searchAddressList?.map((v: any) => (
                    <Li onClick={() => searchSelectedAddress(v)}>
                      {v?.GeoObject.name}
                    </Li>
                  ))}
                </Ul>
              </WrapSearch>
              <WrapLocationAddress>
                <Title>{t('selectedaddress')}</Title>
                <span>
                  {place[0] !== '' && place[1] !== '' ? mapAddress.name : null}
                  {mapError ? <Message>{t('showinmap')}</Message> : null}
                </span>
              </WrapLocationAddress>
            </WrapAddress>
            <MobileMap>
              <YandexContainer bcolor={mapError}>
                <YandexMap
                  onBoundsChange={onBoundsChange}
                  handleRef={(e: any) => setYandexRef(e)}
                  place={place}
                  onClickPlaceMark={onClickPlace}
                  placeOptions={palceOptions}
                />
              </YandexContainer>
            </MobileMap>
            <Title>{t('addressClarification')}</Title>
            <Text>{t('enterOrientationText')}</Text>
            <Controller
              name='addressDesc'
              control={control}
              rules={{ required: true }}
              defaultValue=''
              render={({ field }) => (
                <Input
                  label={t('enterOrientation')}
                  error={errors.addressDesc ? true : false}
                  message={t('requiredField')}
                  type='text'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              )}
            />
            {isMain ? null : (
              <>
                <Title>{t('filialName')}</Title>
                <Text>{t('enterTitleText')}</Text>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  render={({ field }) => (
                    <Input
                      label={t('enterTitle')}
                      error={errors.name ? true : false}
                      message={t('requiredField')}
                      field={field}
                      margin={{
                        laptop: '20px 0 25px',
                      }}
                    />
                  )}
                />
              </>
            )}

            <ul style={{ listStyle: 'none' }}>
              {fields.map((item, index) => {
                return (
                  <li key={item?.id}>
                    <Controller
                      name={`telNumbers.${index}.number`}
                      rules={{ required: true, maxLength: 13, minLength: 13 }}
                      control={control}
                      defaultValue={values.telNumbers?.[index]?.number}
                      render={({ field }) => (
                        <Input
                          label={t('phoneNumber')}
                          type='text'
                          field={field}
                          margin={{
                            laptop: '20px 0 10px',
                          }}
                          message={t('requiredField')}
                          error={
                            errors.telNumbers?.[index]?.number ? true : false
                          }
                          IconEnd={
                            index === 0 ? null : (
                              <IconButton
                                style={{ marginRight: '15px' }}
                                onClick={() => remove(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )
                          }
                          maxLength={13}
                        />
                      )}
                    />
                  </li>
                );
              })}
            </ul>
            <Button
              buttonStyle={{
                color: '#3492FF',
                bgcolor: 'transparent',
              }}
              onClick={() => {
                append({ number: '+998' });
              }}
              padding={{ laptop: '0' }}
              margin={{
                laptop: '10px 0 0',
              }}
            >
              {t('addPhoneNumber')}
            </Button>
            <Title>{t('workingHours')}</Title>
            <WorkingHours workingTime={workingTime} getTime={getTime} />
            {workError === false && showWork ? (
              <Message>{t('addressWorkingHours')}</Message>
            ) : null}
            <ButtonsWrap>
              <ButtonWrap>
                <Button
                  buttonStyle={{
                    bgcolor: 'rgba(96, 110, 234, 0.1)',
                    weight: '500',
                    radius: 12,
                    color: '#606EEA',
                  }}
                  margin={{
                    laptop: '20px 10px 0',
                    mobile: '10px 10px 0 0',
                  }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {t('quit')}
                  <ExitIcon />
                </Button>
              </ButtonWrap>
              <Button
                buttonStyle={{
                  shadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
                  weight: '500',
                }}
                margin={{
                  laptop: '20px 0 0',
                  mobile: '10px 0 0 0',
                }}
                type='submit'
                disabled={
                  addressPut.isLoading ||
                  mainPut.isLoading ||
                  addressPost.isLoading
                }
                onClick={handleSaveClick}
              >
                <SaveIcon />
                {t('save')}
              </Button>
              {isMain || edit ? null : (
                <Button
                  buttonStyle={{
                    shadow: '0px 4px 9px rgba(255, 94, 104, 0.46)',
                    weight: '500',
                    bgcolor: '#FF5E68',
                    color: '#FFFFFF',
                  }}
                  margin={{
                    laptop: '20px 0 0 20px',
                    mobile: '10px 0 0 10px',
                  }}
                  disabled={addressDelete.isLoading}
                  type='button'
                  onClick={handleDeleteFilial}
                >
                  {t('deletefilial')}
                </Button>
              )}
            </ButtonsWrap>
          </LeftSide>
        </Form>
      )}
      <Rightside>
        <YandexContainer bcolor={mapError}>
          <YandexMap
            onBoundsChange={onBoundsChange}
            handleRef={(e: any) => setYandexRef(e)}
            place={place}
            onClickPlaceMark={onClickPlace}
            placeOptions={palceOptions}
          />
        </YandexContainer>
      </Rightside>
      {newComp ? <NewCompanyNotification /> : null}
    </Container>
  );
};

export default Address;

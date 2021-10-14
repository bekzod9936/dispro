import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title, Text } from '../../style';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import Spinner from 'components/Custom/Spinner';
import { IconButton } from '@material-ui/core';
import WorkingHours from './WorkingHours';
import { fetchAddressInfo } from 'services/queries/InfoQueries';
import { useMutation, useQuery } from 'react-query';
import { IAddress } from 'services/models/address_model';
import YandexMap from './YandexMap';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
import {
  setAddressAdd,
  setAddressInfo,
  setWorkingTime,
} from 'services/redux/Slices/infoSlice';
import axios from 'axios';
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
} from './style';
import Cookies from 'js-cookie';
import partnerApi from 'services/interceptors/companyInterceptor';
import NewCompanyNotification from './NewCompanyNotification';

interface FormProps {
  address?: string;
  addressDesc?: string;
  name?: string;
  aroundTheClock?: boolean;
  telNumbers?: any;
  regionId?: number;
  id?: number;
}

const Address = () => {
  const { t } = useTranslation();
  const [yandexRef, setYandexRef] = useState<any>(null);
  const [searchAddressList, setSearchaddressList] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
  const [newComp, setNewComp] = useState(false);
  const infoPageSlice = useAppSelector((state) => state.infoSlice.addressAdd);
  const date = useAppSelector((state) => state.infoSlice.workingTime);
  const dataAddress = useAppSelector((state) => state.infoSlice.addressInfo);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(infoPageSlice);
  const [fillial, setFillial] = useState<IAddress[]>([]);
  const [searchRes, setSearchRes] = useState<IAddress[]>([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [inpuSearch, setInpuSearch] = useState<string>('');
  const [place, setPlace] = useState<any[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [phone, setPhone] = useState<any>([]);
  const comId: any = localStorage.getItem('companyId');
  console.log(dataAddress, 'tdd');
  const { data, isLoading, refetch } = useQuery(
    'fetchAddress',
    () => fetchAddressInfo(comId),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const fetchYandexAddressSearch = (searchName: any) => {
    axios
      .get(
        `https://geocode-maps.yandex.ru/1.x?apikey=af28acb6-4b1c-4cd1-8251-b2f67a908cac&lang=ru-RU&format=json&geocode=${searchName}`
      )
      .then((res) => {
        setSearchaddressList(
          res.data.response.GeoObjectCollection.featureMember
        );
      });
  };

  useEffect(() => {
    fetchYandexAddressSearch(searchAddress);
  }, [searchAddress]);

  const [mapAddress, setMapAddress] = useState(() => {
    let mapData: any = localStorage.getItem('map');
    if (mapData) {
      mapData = JSON.parse(mapData);
      return {
        name: mapData?.name,
      };
    } else
      return {
        name: '',
      };
  });

  const fetchYandexAddressName = (lat: any, lon: any) => {
    axios
      .get(
        `https://geocode-maps.yandex.ru/1.x?apikey=af28acb6-4b1c-4cd1-8251-b2f67a908cac&lang=ru-RU&format=json&geocode=${lat},${lon}`
      )
      .then((res) => {
        setMapAddress({
          ...mapAddress,
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
    }
  };

  const onBoundsChange = (e: any) => {
    const latAndlot = e.get('target').getCenter();
    fetchYandexAddressName(latAndlot[1], latAndlot[0]);
  };

  const searchSelectedAddress = (item: any) => {
    setSearchAddress(item.GeoObject.name);
    const coordinates = item.GeoObject.Point.pos.split(' ');
    yandexRef?.setCenter([coordinates[1], coordinates[0]], 18);
    setIsSearchInputFocus(false);
  };

  useEffect(() => {
    setFillial(data?.data?.data);
  }, [data]);

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
    defaultValues: {
      telNumbers: [...phone],
    },
  });

  const values = getValues();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'telNumbers',
  });

  useEffect(() => {
    setValue('address', dataAddress?.address);
  }, [dataAddress]);

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
    dispatch(setAddressInfo(v));
    setOpen(false);
    dispatch(setAddressAdd(false));
    setValue('address', v.address);
    setSearchAddress(v.address);
    setValue('addressDesc', v.addressDesc);
    setValue('telNumbers', newNumbers);
    setValue('name', v.name);
    setPhone(newNumbers);
    setValue('regionId', v.regionId);
    setValue('id', v.id);
  };
  const handlePluseClick = () => {
    setOpen(false);
    dispatch(setAddressAdd(false));
    dispatch(setAddressInfo(null));
    setSearchAddress('');
    setValue('addressDesc', '');
    setValue('name', '');
    setValue('telNumbers', ['+998']);
    setMapAddress({ name: '' });
    setEdit(true);
  };

  const addressPut = useMutation(
    (v: any) => {
      return partnerApi.put(`/directory/stores/${v.id}`, v);
    },
    {
      onSuccess: () => {
        setOpen(true);
        refetch();
        dispatch(setAddressAdd(true));
        dispatch(setAddressInfo(null));
        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
      },
    }
  );

  const addressPost = useMutation(
    (v: any) => {
      return partnerApi.post('/directory/stores', v);
    },
    {
      onSuccess: () => {
        setOpen(true);
        refetch();
        dispatch(setAddressAdd(true));
        dispatch(setAddressInfo(null));
        yandexRef?.setCenter([41.32847446609404, 69.24298268717716], 10);
        setPlace([]);
        setNewComp(true);
      },
    }
  );

  const handleSubmitPut = (e: any) => {
    const values = {
      ...e,
      telNumber: e.telNumbers[0],
      companyId: comId,
      location: { lat: place[0], lng: place[1] },
      workingTime: date,
    };
    addressPut.mutate(values);
  };

  const handleSubmitPost = (e: any) => {
    const values = {
      ...e,
      telNumber: e.telNumbers[0],
      companyId: comId,
      location: { lat: place[0], lng: place[1] },
      workingTime: date,
    };
    addressPost.mutate(values);
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
              {isLoading ? (
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
            !edit
              ? handleSubmit(handleSubmitPut)
              : handleSubmit(handleSubmitPost)
          }
        >
          {open ? null : (
            <WrapClose>
              <Title>{t('newbranch')}</Title>
              <IconButton
                onClick={() => {
                  setOpen(true);
                  dispatch(setAddressAdd(true));
                  dispatch(setAddressInfo(null));
                  yandexRef?.setCenter(
                    [41.32847446609404, 69.24298268717716],
                    10
                  );
                  setPlace([]);
                  setEdit(false);
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
                <span>{mapAddress.name}</span>
              </WrapLocationAddress>
            </WrapAddress>
            <MobileMap>
              <YandexContainer>
                <YandexMap />
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
                  type='string'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              )}
            />
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
                  type='string'
                  field={field}
                  margin={{
                    laptop: '20px 0 25px',
                  }}
                />
              )}
            />

            <ul style={{ listStyle: 'none' }}>
              {fields.map((item, index) => {
                return (
                  <li key={item?.id}>
                    <Controller
                      name={`telNumbers.${index}`}
                      rules={{ required: true, maxLength: 13, minLength: 13 }}
                      control={control}
                      defaultValue={
                        !edit ? values.telNumbers?.[index].number : '+998'
                      }
                      render={({ field }) => (
                        <Input
                          label={t('phoneNumber')}
                          type='string'
                          field={field}
                          margin={{
                            laptop: '20px 0 10px',
                          }}
                          message={t('requiredField')}
                          error={errors.telNumbers?.[index] ? true : false}
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
                append('+998');
              }}
              padding={{ laptop: '0' }}
              margin={{
                laptop: '10px 0 0',
              }}
            >
              {t('addPhoneNumber')}
            </Button>
            <Title>{t('workingHours')}</Title>
            <WorkingHours />
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
                    dispatch(setAddressAdd(true));
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
              >
                <SaveIcon />
                {t('save')}
              </Button>
            </ButtonsWrap>
          </LeftSide>
        </Form>
      )}
      <Rightside>
        <YandexContainer>
          <YandexMap
            onBoundsChange={onBoundsChange}
            handleRef={(e: any) => setYandexRef(e)}
            place={place}
            onClickPlaceMark={onClickPlace}
          />
        </YandexContainer>
      </Rightside>
      {newComp && Cookies.get('companyState') === 'new' ? (
        <NewCompanyNotification />
      ) : null}
    </Container>
  );
};

export default Address;

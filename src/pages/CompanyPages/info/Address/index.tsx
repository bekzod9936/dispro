import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  YMaps,
  ZoomControl,
  GeolocationControl,
  SearchControl,
  Placemark,
  Map,
} from 'react-yandex-maps';
import { Title, Text } from '../style';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../../../components/Custom/Input';
import Button from '../../../../components/Custom/Button';
import Spinner from '../../../../components/Custom/Spinner';
import {
  Container,
  Rightside,
  MapYandex,
  Label,
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
  Img,
  WrapInput,
  ExitIcon,
  ButtonWrap,
  ButtonsWrap,
  Ul,
  Li,
  WrapAddress,
} from './style';
import { Checkbox, IconButton } from '@material-ui/core';
import WorkingHours from './WorkingHours';
import { fetchAddressInfo } from '../../../../services/queries/InfoQueries';
import { useQuery } from 'react-query';
import { IAddress } from '../../../../services/models/address_model';
import location from '../../../../assets/icons/IconsInfo/location.png';
import YandexMap from './YandexMap';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../services/redux/hooks';
import {
  setAddressAdd,
  setAddressInfo,
} from '../../../../services/redux/Slices/infoSlice';
import axios from 'axios';

interface FormProps {
  address?: string;
  addressDesc?: string;
  telNumber?: string;
  name?: string;
  aroundTheClock?: boolean;
}

const Address = () => {
  const { t } = useTranslation();
  const [coords, setCoords] = useState([]);
  const [yandexRef, setYandexRef] = useState<any>(null);
  const [searchAddressList, setSearchaddressList] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);

  const infoPageSlice = useAppSelector((state) => state.infoSlice.addressAdd);
  const dataAddress = useAppSelector((state) => state.infoSlice.addressInfo);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(infoPageSlice);
  const [fillial, setFillial] = useState<IAddress[]>([]);
  const [searchRes, setSearchRes] = useState<IAddress[]>([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [inpuSearch, setInpuSearch] = useState<string>('');
  const [place, setPlace] = useState<any[]>([]);
  const [editAddress, setEditAddress] = useState([]);

  const comId: any = localStorage.getItem('companyId');

  const { data, isLoading } = useQuery(
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
        `https://geocode-maps.yandex.ru/1.x?apikey=6f33a62b-bf0f-4218-9613-374e77d830ab&lang=en_US&format=json&geocode=${searchName}`
      )
      .then((res) => {
        setSearchaddressList(
          res.data.response.GeoObjectCollection.featureMember.slice(0)
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
        `https://geocode-maps.yandex.ru/1.x?apikey=6f33a62b-bf0f-4218-9613-374e77d830ab&lang=en_US&format=json&geocode=${lat},${lon}`
      )
      .then((res) => {
        setMapAddress({
          ...mapAddress,
          name: res.data.response.GeoObjectCollection.featureMember[0].GeoObject
            .name,
        });
      });
  };

  const onClickMap = (e: any) => {
    const coords = e.get('coords');
    console.log(e.events, 'ssss');
    if (place?.length !== 0) {
      setPlace(coords);
      fetchYandexAddressName(coords[0], coords[1]);
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
    setPlace([v?.location.lat, v?.location.lng]);
    yandexRef?.setCenter([v?.location.lat, v?.location.lng], 18);
    dispatch(setAddressInfo(v));
    setOpen(false);
    dispatch(setAddressAdd(false));
    setValue('address', v.address);
    setSearchAddress(v.address);
    setValue('addressDesc', v.addressDesc);
    console.log(v, 'address');
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
                onClick={() => {
                  setOpen(false);
                  dispatch(setAddressAdd(false));
                  dispatch(setAddressInfo(null));
                  setSearchAddress('');
                  setValue('addressDesc', '');
                }}
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
              ) : searchRes.length === 0 ||
                !searchFocus ||
                inpuSearch === '' ? (
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
        <Form>
          {open ? null : (
            <WrapClose>
              <Title>{t('newbranch')}</Title>
              <IconButton
                onClick={() => {
                  setOpen(true);
                  dispatch(setAddressAdd(true));
                  dispatch(setAddressInfo(null));
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
              <Title>{t('selectedaddress')}</Title>
              <Text></Text>
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
                  error={errors.address ? true : false}
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
            <Controller
              name='telNumber'
              control={control}
              rules={{ required: true }}
              defaultValue=''
              render={({ field }) => (
                <Input
                  label={t('phoneNumber')}
                  error={errors.telNumber ? true : false}
                  message={t('requiredField')}
                  type='string'
                  field={field}
                  margin={{
                    laptop: '20px 0 10px',
                  }}
                />
              )}
            />
            <Button
              buttonStyle={{
                color: '#3492FF',
                bgcolor: 'transparent',
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
            onClick={onClickMap}
          />
        </YandexContainer>
      </Rightside>
    </Container>
  );
};

export default Address;

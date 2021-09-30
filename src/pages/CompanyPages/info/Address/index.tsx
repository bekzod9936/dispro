import React, { useState } from 'react';
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
} from './style';
import { Checkbox, IconButton } from '@material-ui/core';
import WorkingHours from './WorkingHours';
import { fetchAddressInfo } from '../../../../services/queries/InfoQueries';
import { useQuery } from 'react-query';
import { IAddress } from '../../../../services/models/address_model';
import location from '../../../../assets/icons/IconsInfo/location.png';
import YandexMap from './YandexMap';

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
  const [open, setOpen] = useState(true);
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

  const addresses: IAddress[] = data?.data?.data;
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
  // const handleOnClick = (e: any) => {
  //   const coords = e.get('coords');
  //   setCoords(coords);
  // };

  // const handleLoad = (ymaps: any) => {
  //   const suggestView = new ymaps.SuggestView('maplocation');
  // };

  return (
    <Container>
      {open ? (
        <>
          <AddWrap>
            <WrapHeader>
              <Button
                bgcolor='white'
                tcolor='#223367'
                weight='500'
                shadow='0px 4px 4px rgba(0, 0, 0, 0.04)'
                radius={14}
                fontSize={{ min: 14, max: 18 }}
                maxWidth={250}
                width='250px'
                minHeight={40}
                maxHeight={60}
                onClick={() => setOpen(false)}
              >
                <PlusIcon />
                {t('addFilial')}
              </Button>
              <Input
                inputStyle={{ inpadding: '0 10px', border: 'none' }}
                placeholder={t('searchbarnches')}
                IconStart={<SearchIcon />}
                margin={{ laptop: '0 20px 0 20px' }}
              />
            </WrapHeader>
            <WrapContent>
              {isLoading ? (
                <Spinner />
              ) : (
                addresses?.map((v: IAddress) => (
                  <AddressInfo>
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
            </WrapContent>
          </AddWrap>
          {/* <MobileMap>
            <YandexContainer>
              <YMaps>
                <MapYandex
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  defaultState={{ center: [41.311081, 69.240562], zoom: 10 }}
                />
              </YMaps>
            </YandexContainer>
          </MobileMap> */}
        </>
      ) : (
        <Form>
          {open ? null : (
            <WrapClose>
              <Title>{t('newbranch')}</Title>
              <IconButton onClick={() => setOpen(true)}>
                <CloseIcon />
              </IconButton>
            </WrapClose>
          )}
          <LeftSide>
            <Title>{t('Address')}</Title>
            <Text>{t('enterLocationText')}</Text>
            <Controller
              name='address'
              control={control}
              rules={{ required: true }}
              defaultValue=''
              render={({ field }) => (
                <Input
                  label={t('enterLocation')}
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
            {/* <MobileMap>
              <YandexContainer>
                <YMaps>
                  <MapYandex
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    defaultState={{ center: [41.311081, 69.240562], zoom: 10 }}
                  />
                </YMaps>
              </YandexContainer>
            </MobileMap> */}
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
            <Button tcolor='#3492FF' bgcolor='transparent'>
              {t('addPhoneNumber')}
            </Button>
            <Title>{t('workingHours')}</Title>
            <Controller
              name='aroundTheClock'
              rules={{ required: false }}
              control={control}
              render={({ field }) => (
                <Checkbox {...field} id='aroundTheClock' color='primary' />
              )}
            />
            <Label htmlFor='aroundTheClock'>{t('24/7')}</Label>
            <WorkingHours />
            <Button
              shadow='0px 4px 9px rgba(96, 110, 234, 0.46)'
              radius={14}
              minWidth={100}
              minHeight={40}
              maxHeight={50}
              maxWidth={140}
              fontSize={{ max: 17, min: 14 }}
              weight='500'
              margin='20px 0 0'
            >
              <SaveIcon />
              {t('save')}
            </Button>
          </LeftSide>
        </Form>
      )}

      <Rightside>
        {/* <div className='ymaps-2-1-79-search__layout'>
          <input
            type='text'
            onChange={(e: any) => console.log(e.target.value)}
            id='maplocation'
            className='ymaps-2-1-79-searchbox-input__input'
          />
          <button className='ymaps-2-1-79-searchbox-button-text'>sss</button>
        </div> */}

        <YandexContainer>
          <YandexMap />
        </YandexContainer>
      </Rightside>
    </Container>
  );
};

export default Address;

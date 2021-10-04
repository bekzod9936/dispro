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
  WrapInput,
  ExitIcon,
  ButtonWrap,
  ButtonsWrap,
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
import { setAddressAdd } from '../../../../services/redux/Slices/infoSlice';

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
  const infoPageSlice = useAppSelector((state) => state.infoSlice.addressAdd);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(infoPageSlice);
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
                />
              </WrapInput>
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
                }}
              >
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

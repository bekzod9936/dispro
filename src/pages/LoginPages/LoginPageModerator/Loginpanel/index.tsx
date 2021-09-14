import React, { useEffect, useState } from 'react';
import {
  Container,
  MainWrap,
  Version,
  Header,
  Title,
  Body,
  Text,
  Message,
  WrapTime,
  Time,
  SmsNumber,
  Content,
  WrapContent,
  Form,
  WrapButton,
  LogInContentWrap,
  LogInWrap,
} from './style';
import DisIcon from '../../../../assets/icons/DisIcon';
import { useTranslation } from 'react-i18next';
import Select from '../../../../components/Custom/Select';
import Button from '../../../../components/Custom/Button';
import Input from '../../../../components/Custom/Input';
import { DownIcon } from '../../../../assets/icons/LoginPage/LoginPageIcons';
import { useForm, Controller } from 'react-hook-form';
import { logIn, signIn } from '../../../../services/queries/LoginQueries';
import { useHistory } from 'react-router';
import { useMutation } from 'react-query';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import {
  setLogIn,
  setProceedAuth,
} from '../../../../services/redux/Slices/authSlice';
import { inputPhoneNumber, inputSms } from '../../../../utilities/inputFormat';

interface FormProps {
  role: string;
  phoneNumber: string;
  smsCode: string;
}

interface PropLog {
  role: number;
  phoneNumber: string;
  smsCode: string;
}

interface PropSign {
  role: number;
  phoneNumber: string;
}

export const LoginPanel = () => {
  const { t } = useTranslation();
  const [disable, setDisable] = useState(true);
  const proceedAuth = useAppSelector((state) => {
    return state.auth.proceedAuth;
  });

  const refetchList = useAppSelector((state) => {
    return state.auth.refetch;
  });

  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState('');
  const history = useHistory();
  const [time, setTime] = useState(60);
  const [fetch, setFetch] = useState(false);
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

  const values = getValues();

  let startTimer = () => {
    if (time <= 0) {
      return;
    }
    const timer = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    if (fetch) {
      startTimer();
    }
  }, [time, fetch]);

  let checkPhone = inputPhoneNumber({
    value: values?.phoneNumber,
  });

  useEffect(() => {
    if (values?.phoneNumber === undefined) {
      setValue('phoneNumber', '+998');
    } else {
      setValue('phoneNumber', checkPhone.newString);
    }
  }, [checkPhone.check, watch('phoneNumber')]);

  let checkSms = inputSms({
    value: values?.smsCode,
  });

  useEffect(() => {
    if (values?.smsCode === undefined) {
      setValue('smsCode', '');
    } else {
      setValue('smsCode', checkSms.newString);
    }
  }, [checkSms.check, watch('smsCode')]);

  watch(['role', 'phoneNumber']);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value?.role !== undefined && value?.phoneNumber?.length === 13) {
        setDisable(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const logRes = useMutation((values: PropSign) =>
    signIn({ role: values?.role, phoneNumber: values?.phoneNumber })
  );

  const onSubmit = (values: any) => {
    logRes.mutate(values, {
      onSuccess: (data) => {
        dispatch(setProceedAuth(true));
        const number = data.data.data.telNumber;
        const privateNumber = `+${number.substr(0, 3)} ${number.substr(
          3,
          2
        )} *** ** ${number.substr(10, 2)}`;
        setPhone(privateNumber);
        setFetch(true);
      },
    });
  };

  const smsRes = useMutation((values: PropLog) =>
    logIn({
      role: values.role,
      phoneNumber: values.phoneNumber,
      smsCode: values.smsCode,
    })
  );

  const onSubmitSms = (values: any) => {
    smsRes.mutate(values, {
      onSuccess: (data) => {
        setTime(0);
        localStorage.setItem(
          'partner_access_token',
          data.data.data.accessToken
        );
        localStorage.setItem(
          'partner_refresh_token',
          data.data.data.refreshToken
        );
        dispatch(setLogIn(data.data.data));
        refetchList();
        if (data.data.data.status === 'old') {
          history.push('/partner/company');
        } else {
          history.push('/partner/registration');
        }
      },
    });
  };

  const handleBack = () => {
    dispatch(setProceedAuth(false));
    setTime(60);
    setFetch(false);
    setValue('phoneNumber', '+998');
    setValue('role', '');
    setValue('smsCode', '');
    setDisable(true);
    setError('smsCode', {
      message: t('requiredField'),
      type: 'required',
    });
    reset();
    localStorage.removeItem('partner_access_token');
    localStorage.removeItem('partner_refresh_token');
  };
  const handleReSend = () => {
    logRes.mutate(
      {
        role: Number(values?.role),
        phoneNumber: values?.phoneNumber,
      },
      {
        onSuccess: (data) => {
          const number = data.data.data.telNumber;
          const privateNumber = `+${number.substr(0, 3)} ${number.substr(
            3,
            2
          )} *** ** ${number.substr(10, 2)}`;
          setPhone(privateNumber);
          setFetch(true);
          setTime(60);
        },
      }
    );

    setFetch(false);
    setTime(0);
  };

  return (
    <Container>
      <MainWrap>
        <Header>
          <Version>v1.0.130</Version>
          <Title>
            <DisIcon />
            {proceedAuth ? t('disadmin') : t('discount')}
          </Title>
        </Header>
        <Body>
          <Text fontSize={22} weight='bold' marginB={10}>
            {proceedAuth ? t('enterAssertCode') : t('welcome')}
          </Text>
          {!proceedAuth && <Text marginB={20}> {t('enterData')}</Text>}
          <Form
            onSubmit={
              proceedAuth ? handleSubmit(onSubmitSms) : handleSubmit(onSubmit)
            }
          >
            {proceedAuth ? (
              <WrapContent>
                <Content>
                  <Controller
                    name='smsCode'
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 4,
                      minLength: 4,
                    }}
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        border='1px solid #C2C2C2'
                        radius={14}
                        width='100%'
                        minWidth={290}
                        height='60px'
                        minHeight={45}
                        maxHeight={60}
                        margin='20px 0 0'
                        label={t('assertCode')}
                        lmarginbottom={10}
                        type='string'
                        field={field}
                        max={4}
                        autoFocus={true}
                        error={errors.smsCode ? true : false}
                        endAdornment={
                          <WrapTime time={time}>
                            <Time time={time}>{time}</Time>
                          </WrapTime>
                        }
                      />
                    )}
                  />
                  {errors.smsCode && <Message>{t('requiredField')}</Message>}
                  {time === 0 && <Message>{t('wrongsmscode')}</Message>}
                  {time === 0 && (
                    <Button
                      bgcolor='transparent'
                      tcolor='#3492FF'
                      fontSize={{ min: 14, max: 16 }}
                      width='fit-content'
                      onClick={handleReSend}
                      disabled={logRes.isLoading}
                    >
                      {t('resend')}
                    </Button>
                  )}
                  <SmsNumber time={time}>
                    {t('smsphone')}
                    {phone}
                  </SmsNumber>
                </Content>
                <Content>
                  <WrapButton>
                    <Button
                      width='100%'
                      height='60px'
                      bgcolor='#606EEA'
                      radius={12}
                      tcolor='#FFFFFF'
                      minWidth={290}
                      minHeight={45}
                      maxHeight={60}
                      fontSize={{ max: 18, min: 16 }}
                      shadow='0px 19px 30px rgba(96, 110, 234, 0.35)'
                      type='submit'
                      disabled={smsRes.isLoading}
                    >
                      {t('enter')}
                    </Button>
                  </WrapButton>
                  <Button
                    width='100%'
                    height='fit-content'
                    bgcolor='transparent'
                    tcolor='#606EEA'
                    fontSize={{ max: 18, min: 16 }}
                    onClick={handleBack}
                  >
                    {t('back')}
                  </Button>
                </Content>
              </WrapContent>
            ) : (
              <LogInWrap>
                <LogInContentWrap>
                  <Controller
                    name='role'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        width='100%'
                        minWidth={290}
                        height='60px'
                        minHeight={45}
                        maxHeight={60}
                        radius={14}
                        border='1px solid #C2C2C2'
                        label={t('staffRole')}
                        options={[
                          { id: 2, value: t('admin') },
                          { id: 5, value: t('manager') },
                        ]}
                        weight='500'
                        Icon={DownIcon}
                        paddingLeft={25}
                        lmarginbottom={10}
                        field={field}
                        error={errors.role ? true : false}
                        message={<Message>{t('requiredField')}</Message>}
                      />
                    )}
                  />
                  <Controller
                    name='phoneNumber'
                    control={control}
                    rules={{ required: true, maxLength: 13, minLength: 13 }}
                    defaultValue='+998'
                    render={({ field }) => (
                      <Input
                        border={'1px solid #C2C2C2'}
                        radius={14}
                        width='100%'
                        minWidth={290}
                        height='60px'
                        minHeight={45}
                        maxHeight={60}
                        margin='20px 0 0'
                        label={t('phoneNumber')}
                        lmarginbottom={10}
                        type='tel'
                        max={13}
                        field={field}
                        error={errors.phoneNumber ? true : false}
                        message={
                          <Message>
                            <div>{t('phoneLength')}</div>
                            <div>{t('tryagain')}</div>
                          </Message>
                        }
                      />
                    )}
                  />
                </LogInContentWrap>
                <Button
                  width='100%'
                  height='60px'
                  bgcolor='#606EEA'
                  margin='45px 0 0'
                  radius={12}
                  tcolor='#FFFFFF'
                  minWidth={290}
                  minHeight={45}
                  maxHeight={60}
                  fontSize={{ max: 18, min: 16 }}
                  shadow='0px 19px 30px rgba(96, 110, 234, 0.35)'
                  type='submit'
                  disabled={disable || logRes.isLoading}
                >
                  {t('next')}
                </Button>
              </LogInWrap>
            )}
          </Form>
        </Body>
      </MainWrap>
    </Container>
  );
};

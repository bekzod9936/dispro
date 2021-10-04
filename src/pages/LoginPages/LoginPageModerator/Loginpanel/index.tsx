import React, { useEffect, useState } from 'react';
import DisIcon from '../../../../assets/icons/DisIcon';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/Custom/NButton';
import { useForm, Controller } from 'react-hook-form';
import { logIn, signIn } from '../../../../services/queries/LoginQueries';
import { useHistory } from 'react-router';
import { useMutation } from 'react-query';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import {
  setCompanyState,
  setLogIn,
  setProceedAuth,
} from '../../../../services/redux/Slices/authSlice';
import { inputPhoneNumber, inputSms } from '../../../../utilities/inputFormat';
import Input from '../../../../components/Custom/Input';
import MultiSelect from '../../../../components/Custom/MultiSelect';
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
interface FormProps {
  role: { value?: string; label?: string };
  phoneNumber: string;
  smsCode: string;
}

interface PropLog {
  role: { value?: string; label?: string };
  phoneNumber: string;
  smsCode: string;
}

interface PropSign {
  role: { value?: string; label?: string };
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
      console.log(value, 'ddd');
      if (
        value?.role?.value !== undefined &&
        value?.role?.value !== '' &&
        value?.phoneNumber?.length === 13
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch(['role', 'phoneNumber'])]);

  const logRes = useMutation((values: PropSign) =>
    signIn({
      role: Number(values?.role?.value),
      phoneNumber: values?.phoneNumber,
    })
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
      role: Number(values.role?.value),
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
        dispatch(setCompanyState(data.data.data.status));
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
    setValue('role', { value: '' });
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
        role: values?.role,
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
                        label={t('assertCode')}
                        error={errors.smsCode ? true : false}
                        type='string'
                        field={field}
                        margin={{
                          laptop: '20px 0 0',
                        }}
                        IconEnd={
                          <WrapTime time={time}>
                            <Time time={time}>{time}</Time>
                          </WrapTime>
                        }
                        autoFocus={true}
                        maxLength={4}
                      />
                    )}
                  />
                  {errors.smsCode && <Message>{t('requiredField')}</Message>}
                  {time === 0 && <Message>{t('wrongsmscode')}</Message>}
                  {time === 0 && (
                    <Button
                      buttonStyle={{
                        color: '#3492FF',
                        bgcolor: 'transparent',
                      }}
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
                      buttonStyle={{
                        shadow: '0px 19px 30px rgba(96, 110, 234, 0.35)',
                        radius: 12,
                        fontSize: {
                          laptop: 17,
                          desktop: 18,
                          mobile: 16,
                          planshet: 16,
                        },
                      }}
                      type='submit'
                      disabled={smsRes.isLoading}
                      fullWidth={true}
                    >
                      {t('enter')}
                    </Button>
                  </WrapButton>
                  <Button
                    buttonStyle={{
                      bgcolor: 'transparent',
                      color: '#606EEA',
                      fontSize: {
                        laptop: 17,
                        desktop: 18,
                        mobile: 16,
                        planshet: 16,
                      },
                    }}
                    onClick={handleBack}
                    width={{ width: '100%' }}
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
                      <MultiSelect
                        label={t('staffRole')}
                        options={[
                          { value: '2', label: t('admin') },
                          { value: '5', label: t('manager') },
                        ]}
                        field={field}
                        error={errors.role ? true : false}
                        message={t('requiredField')}
                        placeholder=''
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
                        label={t('phoneNumber')}
                        error={errors.phoneNumber ? true : false}
                        message={
                          <Message>
                            <div>{t('phoneLength')}</div>
                            <div>{t('tryagain')}</div>
                          </Message>
                        }
                        type='tel'
                        field={field}
                        margin={{
                          planshet: '20px 0 0',
                          laptop: '20px 0 0',
                          desktop: '20px 0 40px',
                        }}
                        maxLength={13}
                      />
                    )}
                  />
                </LogInContentWrap>
                <Button
                  buttonStyle={{
                    radius: 12,
                    fontSize: {
                      laptop: 17,
                      desktop: 18,
                      mobile: 16,
                      planshet: 16,
                    },
                    shadow: '0px 19px 30px rgba(96, 110, 234, 0.35)',
                  }}
                  type='submit'
                  disabled={disable || logRes.isLoading}
                  width={{ width: '100%' }}
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

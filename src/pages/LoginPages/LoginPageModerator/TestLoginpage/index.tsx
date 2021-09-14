import React, { useState } from 'react';
import {
  Container,
  LeftSide,
  RightSide,
  Img,
  Wrapper,
  Text,
  TextWrap,
  WrapSelect,
  ImgLogo,
  Title,
  WrapButton,
  WButton,
  WLogo,
} from './style';
import { useTranslation } from 'react-i18next';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/hooks';
import { useHistory, useRouteMatch } from 'react-router';
import { setProceedAuth } from '../../../../services/redux/Slices/authSlice';
import SamWalton from '../../../../assets/images/SamWalton.png';
import jackMa from '../../../../assets/images/JackMa.png';
import Select from '../../../../components/Custom/Select';
import { RuFlagIcons } from '../../../../assets/icons/LoginPage/LoginPageIcons';
import { EnFlagIcons } from '../../../../assets/icons/LoginPage/LoginPageIcons';
import { UzFlagIcons } from '../../../../assets/icons/LoginPage/LoginPageIcons';
import { LoginPanel } from '../Loginpanel/index';
import { Arrow } from '../../../../assets/icons/LoginPage/LoginPageIcons';
import {
  Left,
  LeftBack,
} from '../../../../assets/icons/LoginPage/LoginPageIcons';
import logo from '../../../../assets/icons/logo_mobile.svg';
import Button from '../../../../components/Custom/Button';

const TestLoginpage = ({ children }: any) => {
  const { t } = useTranslation();
  const match = useRouteMatch();
  const history = useHistory();
  const proceedAuth = useAppSelector((state) => state.auth.proceedAuth);

  const dispatch = useAppDispatch();
  const [display, setDisplay] = useState(false);

  const handleChange = (v: any) => {
    localStorage.setItem('language', v);
  };

  const handleBack = () => {
    if (match.path.includes('/partner/company')) {
      localStorage.removeItem('partner_access_token');
      localStorage.removeItem('partner_refresh_token');
      history.push('/');
    }
    if (proceedAuth) {
      dispatch(setProceedAuth(false));
    }
  };

  setTimeout(() => setDisplay(!display), 5000);

  return (
    <Container>
      <LeftSide>
        <Wrapper display={display}>
          <Img src={jackMa} alt='JackMa' />
          <Text fontSize={25}>{t('JackMaWords')}</Text>
          <TextWrap>
            <div>
              <Text fontSize={18} weight='bold'>
                &mdash; {t('JackMa')}
              </Text>
            </div>
            <div>
              <Text weight='300'>{t('JackMaInfo')}</Text>
            </div>
          </TextWrap>
        </Wrapper>
        <Wrapper display={!display}>
          <Img src={SamWalton} alt='SamWalton' />
          <Text fontSize={25}>{t('SamWaltonWords')}</Text>
          <TextWrap>
            <div>
              <Text fontSize={18} weight='bold'>
                &mdash; {t('SamWalton')}
              </Text>
            </div>
            <div>
              <Text weight='300'>{t('SamWaltonInfo')}</Text>
            </div>
          </TextWrap>
        </Wrapper>
      </LeftSide>
      <RightSide>
        <WrapSelect
          justify={localStorage.getItem('partner_access_token') ? true : false}
        >
          <WLogo>
            {localStorage.getItem('partner_access_token') !== null && (
              <>
                <WButton onClick={handleBack}>
                  <LeftBack />
                </WButton>
                <WrapButton>
                  <Button
                    fontSize={{ max: 18 }}
                    tcolor='#223367'
                    weight='500'
                    radius='70px 14px 14px 14px'
                    bgcolor='rgba(96, 110, 234, 0.1)'
                    width='130px'
                    height='45px'
                    onClick={handleBack}
                  >
                    <Left /> {t('back')}
                  </Button>
                </WrapButton>
              </>
            )}
            <Title>
              <ImgLogo src={logo} alt='logo' />
              {t('discount')}
            </Title>
          </WLogo>
          <Select
            onChange={handleChange}
            width='fit-content'
            minWidth={200}
            height='70px'
            minHeight={45}
            maxHeight={60}
            radius={46}
            bgcolor='transparent'
            border='1px solid #223367'
            tcolor='#223367'
            defaultValue={localStorage.getItem('language') || 'ru'}
            options={[
              {
                id: 'ru',
                value: (
                  <>
                    <RuFlagIcons />
                    {t('russian')}
                  </>
                ),
              },
              {
                id: 'uz',
                value: (
                  <>
                    <UzFlagIcons />
                    {t('uzbek')}
                  </>
                ),
              },
              {
                id: 'en',
                value: (
                  <>
                    <EnFlagIcons />
                    {t('english')}
                  </>
                ),
              },
            ]}
            Icon={Arrow}
            paddingLeft={20}
          />
        </WrapSelect>
        {children ? children : <LoginPanel />}
      </RightSide>
    </Container>
  );
};

export default TestLoginpage;

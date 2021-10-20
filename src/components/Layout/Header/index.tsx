import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Popover from '../../Custom/Popover';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import Button from '../../Custom/Button';
import { useHistory } from 'react-router';
import Modal from '../../Custom/Modal';
import LogoDef from '../../../assets/icons/SideBar/logodefault.png';
import { IconButton } from '@material-ui/core';
import Input from '../../Custom/Input';
import LangSelect from '../../LangSelect';
import Logo from '../../../assets/icons/SideBar/logo.png';
import Cookies from 'js-cookie';
import { setCompanyInfo } from '../../../services/redux/Slices/partnerSlice';
import {
  Container,
  SearchIcon,
  ArrowIcon,
  BellIcon,
  DepositIcon,
  ShieldIcon,
  Badge,
  BadgeContent,
  Wrap,
  Title,
  Text,
  Content,
  Img,
  LogOutIcon,
  Name,
  TextCompany,
  WrapPop,
  Type,
  MarketIcon,
  HeadPhoneIcon,
  Link,
  ModelContent,
  ModelTitle,
  LogOutWhiteIcon,
  CloseIcon,
  ModalWrap,
  Wrapper,
  Wrarning,
  WranningIcon,
  WrapInput,
  WrapLang,
  WrapLogo,
  TitleLogo,
  LogoIcon,
} from './style';
import useLayout from '../useLayout';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { headerData } = useLayout();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const companyInfo = useAppSelector((state) => state.partner.companyInfo);

  return (
    <>
      {Cookies.get('compnayState') === 'new' ||
      !headerData?.filled ||
      !headerData?.filledAddress ? (
        <Wrarning>
          <WranningIcon />
          {t('newcompanywarning')}
        </Wrarning>
      ) : (
        <Container>
          <WrapLogo>
            <LogoIcon src={Logo} alt='logo' />
            <TitleLogo>DIS-COUNT</TitleLogo>
          </WrapLogo>
          <Wrapper>
            <WrapInput>
              <Input
                inputStyle={{
                  border: 'none',
                  height: {
                    mobile: 40,
                    laptop: 45,
                    desktop: 55,
                  },
                  radius: 35,
                  bgcolor: '#F4F4F4',
                  outpadding: '0 5px 0 20px',
                  inpadding: '0 0 0 10px',
                  placeholdercolor: '#AAAAAA',
                }}
                placeholder={t('search')}
                width={{
                  minwidth: 50,
                  maxwidth: 390,
                }}
                IconStart={<SearchIcon />}
              />
            </WrapInput>

            <Wrap>
              <DepositIcon />
              <Title>
                {t('deposit')} <Text>3 750 000 UZS</Text>
              </Title>
            </Wrap>
            <Wrap>
              <ShieldIcon />
              <Title>
                {t('limit')} <Text>100 000 UZS</Text>
              </Title>
            </Wrap>
          </Wrapper>
          <Wrapper>
            <IconButton>
              <SearchIcon mobile={true} />
            </IconButton>
            <IconButton style={{ margin: '0 10px' }}>
              <Badge>
                <BadgeContent>12</BadgeContent>
                <BellIcon />
              </Badge>
            </IconButton>
            <WrapLang>
              <LangSelect border='1px solid #F0F0F0' />
            </WrapLang>

            <Popover
              click={
                <Button
                  buttonStyle={{
                    bgcolor: 'transparent',
                  }}
                >
                  <Img
                    src={headerData.logo === '' ? LogoDef : companyInfo.logo}
                    size='small'
                    alt='logo'
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = LogoDef;
                    }}
                  />
                  <WrapPop>
                    <Name fontSize={16}>{companyInfo.name}</Name>
                    <TextCompany>{t('myCompany')}</TextCompany>
                  </WrapPop>
                  <ArrowIcon marginLeft={true} />
                </Button>
              }
              openBgColor='rgba(96, 110, 234, 0.1)'
              radius={14}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              popoverStyle={{ marginTop: '20px' }}
            >
              <Content>
                <Img
                  src={headerData.logo === '' ? LogoDef : companyInfo.logo}
                  size='large'
                  alt='logo'
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = LogoDef;
                  }}
                />
                <Name fontSize={18}>{companyInfo.name}</Name>
                <Type>Компания прошла подерацию</Type>
                <Button
                  buttonStyle={{
                    bgcolor: 'rgba(96, 110, 234, 0.1)',
                    color: '#606EEA',
                  }}
                  onClick={() => history.push('/info')}
                  fullWidth={true}
                  padding={{
                    laptop: '0',
                    desktop: '0',
                  }}
                >
                  {t('directinfo')}
                  <MarketIcon />
                </Button>
                <Button
                  buttonStyle={{
                    bgcolor: 'white',
                    color: '#606EEA',
                    weight: 500,
                  }}
                  margin={{
                    laptop: '0 0 30px',
                  }}
                  onClick={() => history.push('/')}
                >
                  {t('supportcall')}
                  <HeadPhoneIcon />
                </Button>
                <WrapLang mobile={true}>
                  <LangSelect border='1px solid #F0F0F0' />
                </WrapLang>
                <Link href='/'>{t('policy')}</Link>
                <Link href='/'>{t('conditions')}</Link>
                <Button
                  buttonStyle={{
                    bgcolor: 'white',
                    color: '#223367',
                    weight: 500,
                  }}
                  margin={{
                    laptop: '30px 0 0',
                  }}
                  onClick={() => setOpen(true)}
                >
                  {t('logout')}
                  <LogOutIcon />
                </Button>
                <Modal onClose={(v: boolean) => setOpen(v)} open={open}>
                  <ModelContent>
                    <ModelTitle>{t('sureleave')}</ModelTitle>
                    <ModalWrap>
                      <Button
                        buttonStyle={{
                          bgcolor: 'white',
                          color: '#223367',
                          weight: 500,
                        }}
                        margin={{
                          laptop: '0 30px 0 0',
                        }}
                        onClick={() => setOpen(false)}
                      >
                        <CloseIcon />
                        {t('cancel')}
                      </Button>
                      <Button
                        buttonStyle={{
                          color: 'white',
                          bgcolor: '#606EEA',
                        }}
                        onClick={() => {
                          setOpen(true);
                          localStorage.removeItem('companyId');
                          localStorage.removeItem('companyToken');
                          history.push('/partner/company');
                          dispatch(setCompanyInfo({}));
                        }}
                      >
                        {t('logout')}
                        <LogOutWhiteIcon />
                      </Button>
                    </ModalWrap>
                  </ModelContent>
                </Modal>
              </Content>
            </Popover>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default Header;

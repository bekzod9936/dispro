import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import Popover from '../../Custom/Popover';
import { useAppSelector } from '../../../services/redux/hooks';
import Button from '../../Custom/Button';
import { useHistory } from 'react-router';
import Modal from '../../Custom/Modal';
import LogoDef from '../../../assets/icons/SideBar/logodefault.png';
import { IconButton } from '@material-ui/core';
import Input from '../../Custom/Input';
import LangSelect from '../../LangSelect';
import Logo from '../../../assets/icons/SideBar/logo.png';

const Header = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const companyInfo = useAppSelector((state) => state.partner.companyInfo);
  const companyState = useAppSelector((state) => state.auth.companyState);

  return (
    <>
      {companyState === 'new' ? (
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
                  bgcolor='transparent'
                  height='50px'
                  radius={14}
                  maxWidth={220}
                >
                  <Img
                    src={companyInfo.logo === '' ? LogoDef : companyInfo.logo}
                    size='small'
                    alt='logo'
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
                  src={companyInfo.logo === '' ? LogoDef : companyInfo.logo}
                  size='large'
                  alt='logo'
                />
                <Name fontSize={18}>{companyInfo.name}</Name>
                <Type>Компания прошла подерацию</Type>
                <Button
                  bgcolor='rgba(96, 110, 234, 0.1)'
                  tcolor='#606EEA'
                  radius={14}
                  width='100%'
                  margin='25px 0 15px'
                  height='50px'
                  onClick={() => history.push('/info')}
                  maxWidth={290}
                  minWidth={220}
                  maxHeight={50}
                  minHeight={40}
                >
                  {t('directinfo')}
                  <MarketIcon />
                </Button>
                <Button
                  bgcolor='white'
                  tcolor='#606EEA'
                  weight='500'
                  fontSize={{ max: 18, min: 14 }}
                  margin='0 0 30px'
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
                  tcolor='#223367'
                  bgcolor='white'
                  onClick={() => setOpen(true)}
                  margin='30px 0 0'
                  weight='500'
                >
                  {t('logout')}
                  <LogOutIcon />
                </Button>
                <Modal onClose={(v: boolean) => setOpen(v)} open={open}>
                  <ModelContent>
                    <ModelTitle>{t('sureleave')}</ModelTitle>
                    <ModalWrap>
                      <Button
                        tcolor='#223367'
                        bgcolor='white'
                        onClick={() => setOpen(false)}
                        margin='0 30px 0 0'
                        height='50px'
                      >
                        <CloseIcon />
                        {t('cancel')}
                      </Button>
                      <Button
                        tcolor='white'
                        bgcolor='#606EEA'
                        onClick={() => {
                          setOpen(true);
                          localStorage.removeItem('companyId');
                          localStorage.removeItem('companyToken');
                          history.push('/partner/company');
                        }}
                        width='140px'
                        height='50px'
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

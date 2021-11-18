import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Popover from '../../Custom/Popover';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import Button from '../../Custom/Button';
import { useHistory } from 'react-router';
import Modal from '../../Custom/Modal';
import LogoDef from 'assets/icons/SideBar/logodefault.png';
import { IconButton } from '@material-ui/core';
import Input from '../../Custom/Input';
import LangSelect from '../../LangSelect';
import Logo from 'assets/icons/SideBar/logo.png';
import { setCompanyInfo } from 'services/redux/Slices/partnerSlice';
import useLayout from '../useLayout';
import { setInfoData, initialState } from 'services/redux/Slices/info/info';
import useSocket from './useSocket';
import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import { numberWithNew } from 'services/utils';
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
  WrapInput,
  WrapLang,
  WrapLogo,
  TitleLogo,
  LogoIcon,
  PName,
  Close1Icon,
  WrapClose,
  WrapperIcon,
} from './style';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { width } = useWindowWidth();
  const [modal, setModal] = useState(false);
  const companyId = localStorage.getItem('companyId');
  const { resLimit } = useLayout({ id: companyId });

  const accountsBalance = useAppSelector((state) => state.info.balance);
  const accountsLimit = useAppSelector((state) => state.info.limit);

  const history = useHistory();
  const [open, setOpen] = useState(false);

  const infoData = useAppSelector((state) => state.info.data);
  const socket = useAppSelector((state) => state.feedbackPost.socket);

  useSocket();

  const logocontent = (
    <Content>
      <Img
        src={infoData?.logo === '' ? LogoDef : infoData?.logo}
        size='large'
        alt='logo'
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = LogoDef;
        }}
      />
      <PName>{infoData?.name}</PName>
      <Type>Компания прошла модерацию</Type>
      <Button
        buttonStyle={{
          bgcolor: '#eff0fd',
          color: '#606EEA',
        }}
        width={{
          maxwidth: 280,
        }}
        onClick={() => history.push('/info/about')}
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
          bgcolor: width > 600 ? 'white' : '#eff0fd',
          color: '#606EEA',
          weight: 500,
        }}
        margin={{
          laptop: '20px 0 30px',
        }}
        onClick={() => history.push('/support')}
      >
        {t('supportcall')}
        <HeadPhoneIcon />
      </Button>

      <WrapLang mobile={true}>
        <LangSelect border='1px solid #F0F0F0' />
      </WrapLang>

      <Link href='/privacy-policy' target='_blank'>
        {t('policy', { policy: 'Политика' })}
      </Link>
      <Link href='/terms-and-conditions' target='_blank'>
        {t('conditions')}
      </Link>
      <Button
        buttonStyle={{
          bgcolor: width > 600 ? 'white' : '#eff0fd',
          color: width > 600 ? '#223367' : '#606EEA',
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
                bgcolor: width > 600 ? 'white' : '#eff0fd',
                color: width > 600 ? '#223367' : '#606EEA',
                weight: 500,
              }}
              margin={{
                laptop: '0 30px 0 0',
                mobile: '0 10px 0 0',
              }}
              onClick={() => {
                setOpen(false);
              }}
              startIcon={width > 600 ? <CloseIcon /> : null}
              endIcon={width < 600 ? <CloseIcon /> : null}
            >
              {t('cancel')}
            </Button>
            <Button
              buttonStyle={{
                color: 'white',
                bgcolor: '#606EEA',
              }}
              onClick={() => {
                setOpen(false);
                setModal(false);
                localStorage.removeItem('companyId');
                localStorage.removeItem('companyToken');
                history.push('/partner/company');
                dispatch(setCompanyInfo({}));
                socket.disconnect();
                dispatch(setInfoData({ ...initialState?.data }));
              }}
              endIcon={<LogOutWhiteIcon />}
            >
              {t('logout')}
            </Button>
          </ModalWrap>
        </ModelContent>
      </Modal>
    </Content>
  );

  return (
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
            type='search'
            placeholder={t('search')}
            width={{
              minwidth: 50,
              maxwidth: 390,
            }}
            IconStart={<SearchIcon />}
          />
        </WrapInput>
        <Wrap onClick={() => history.push('/finances/suggestions')}>
          <DepositIcon />
          <Title>
            {`${t('deposit')}:`}
            <Text>
              {`${numberWithNew({
                number: accountsBalance,
                defaultValue: 0,
              })} UZS`}
            </Text>
          </Title>
        </Wrap>
        <Wrap onClick={() => history.push('/finances/suggestions')}>
          <ShieldIcon />
          <Title>
            {`${t('limit')}:`}
            <Text>
              {`${numberWithNew({
                number: accountsLimit,
                defaultValue: 0,
              })} UZS`}
            </Text>
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
        {width > 600 ? (
          <Popover
            click={
              <Button
                buttonStyle={{
                  bgcolor: 'transparent',
                }}
              >
                <Img
                  src={infoData?.logo === '' ? LogoDef : infoData?.logo}
                  size='small'
                  alt='logo'
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = LogoDef;
                  }}
                />
                <WrapPop>
                  <Name fontSize={16}>{infoData?.name}</Name>
                  <TextCompany>{t('myCompany')}</TextCompany>
                </WrapPop>
                <ArrowIcon marginLeft={true} />
              </Button>
            }
            openBgColor='rgba(96, 110, 234, 0.1)'
            radius={14}
            popoverStyle={{ marginTop: '20px' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          >
            {logocontent}
          </Popover>
        ) : (
          <>
            <Button
              buttonStyle={{
                bgcolor: 'transparent',
              }}
              onClick={() => {
                setModal(true);
              }}
            >
              <Img
                src={infoData?.logo === '' ? LogoDef : infoData?.logo}
                size='small'
                alt='logo'
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = LogoDef;
                }}
              />
              <WrapPop>
                <Name fontSize={16}>{infoData?.name}</Name>
                <TextCompany>{t('myCompany')}</TextCompany>
              </WrapPop>
              <ArrowIcon marginLeft={true} />
            </Button>
            <FullModal open={modal}>
              {
                <WrapClose>
                  <WrapperIcon>
                    <IconButton onClick={() => setModal(false)}>
                      <Close1Icon />
                    </IconButton>
                  </WrapperIcon>
                  {logocontent}
                </WrapClose>
              }
            </FullModal>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Header;

import { useEffect, useState } from 'react';
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
import { setSocket } from 'services/redux/Slices/feedback';
import { SOCKET_EVENT } from 'services/constants/chat';
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
  PName,
} from './style';
import { setInfoData, initialState } from 'services/redux/Slices/info/info';
import useSupportChat from 'pages/CompanyPages/feedback/hooks/useSupportChat';

const io = require('socket.io-client');

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const companyToken = localStorage.getItem('companyToken');
  const companyId = localStorage.getItem('companyId');
  useLayout({ id: companyId });
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const infoData = useAppSelector((state) => state.info.data);
  const socket = useAppSelector((state) => state.feedbackPost.socket);

  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });

  const { resChatSupportHistory } = useSupportChat();

  const fill =
    (infoData?.filled && infoData?.filledAddress) ||
    (regFilled?.filled && regFilled?.filledAddress);

  useEffect(() => {
    if (fill) {
      const socket = io(
        `${process.env.REACT_APP_WEBSOCKET_URL}/nsp_staff_svdfv8732f5rycf76f8732rvuy23cfi77c3u6fr2387frv8237vfidu23vf2vdd7324df4`,
        {
          path: '/',
          auth: {
            token: `Bearer ${companyToken}`,
          },
        }
      );

      socket.on(SOCKET_EVENT.CHAT_MODERATOR_TO_PARTNER, function (data: any) {
        resChatSupportHistory.refetch();
      });

      socket.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, function (data: any) {
        console.log(data, 'p');
      });
      dispatch(setSocket(socket));
    }
  }, [
    infoData?.filled,
    infoData?.filledAddress,
    regFilled?.filled,
    regFilled?.filledAddress,
  ]);

  return (
    <>
      {fill ? (
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
                <PName fontSize={18}>{infoData?.name}</PName>
                <Type>Компания прошла модерацию</Type>
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
                          socket.disconnect();
                          dispatch(setInfoData({ ...initialState?.data }));
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
      ) : (
        <Wrarning>
          <WranningIcon />
          {t('newcompanywarning')}
        </Wrarning>
      )}
    </>
  );
};

export default Header;

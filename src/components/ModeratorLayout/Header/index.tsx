import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import Button from '../../Custom/Buttons/Button';
import { useHistory } from 'react-router';
import Modal from '../../Custom/Modal';
import LogoDef from 'assets/icons/SideBar/logodefault.png';
import { IconButton } from '@material-ui/core';

import Logo from 'assets/icons/SideBar/logo.png';
import { setCompanyInfo } from 'services/redux/Slices/partnerSlice';
import { setInfoData, initialState } from 'services/redux/Slices/info/info';

import useWindowWidth from 'services/hooks/useWindowWidth';
import FullModal from 'components/Custom/FullModal';
import {
  Container,
  SearchIcon,
  ArrowIcon,
  Content,
  Img,
  LogOutIcon,
  Name,
  TextCompany,
  WrapPop,
  ModelContent,
  ModelTitle,
  LogOutWhiteIcon,
  CloseIcon,
  ModalWrap,
  WrapLogo,
  TitleLogo,
  LogoIcon,
  Close1Icon,
  WrapClose,
  WrapperIcon,
  Box1,
} from './style';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { width } = useWindowWidth();
  const [modal, setModal] = useState(false);

  const history = useHistory();
  const [open, setOpen] = useState(false);

  const infoData = useAppSelector((state) => state.info.data);

  const logocontent = (
    <Content>
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
                localStorage.clear();
                history.push('/admin');
                dispatch(setCompanyInfo({}));
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
        <TitleLogo>DIS-COUNT (Moderator)</TitleLogo>
      </WrapLogo>
      <Box1>
        <IconButton>
          <SearchIcon mobile={true} />
        </IconButton>
        {width > 600 ? (
          logocontent
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
      </Box1>
    </Container>
  );
};

export default Header;

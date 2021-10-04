import React, { useState } from 'react';
import About from './About';
import Photos from './Photos';
import Address from './Address';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import Title from '../../../components/Custom/Title';
import Modal from '../../../components/Custom/Modal';
import Button from '../../../components/Custom/NButton';
import NavBar from '../../../components/Custom/NavBar';
import {
  Container,
  ModelContent,
  ModalWrap,
  ModelTitle,
  LogOutIcon,
  CloseIcon,
  Warn,
  WrapNav,
  WrapButton,
} from './style';
import { useRouteMatch } from 'react-router-dom';
import { useAppSelector } from '../../../services/redux/hooks';

interface IInfoRoute {
  path: string;
  text: string;
}

const Infopage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const infoPageSlice = useAppSelector((state) => state.infoSlice.addressAdd);
  const [open, setOpen] = useState(false);

  const items: IInfoRoute[] = [
    { path: '/info', text: t('aboutCompany') },
    { path: '/info/address', text: t('address') },
    { path: '/info/photos', text: t('photos') },
  ];
  let match = useRouteMatch();

  return (
    <Container
      bgcolor={
        match.path === '/info' || !infoPageSlice ? 'white' : 'transparent'
      }
    >
      <Title>{t('info')}</Title>
      <WrapNav>
        <NavBar list={items} margin='20px 0' />
        <WrapButton>
          <Button
            buttonStyle={{
              color: '#223367',
              bgcolor: 'transparent',
              weight: 500,
            }}
            onClick={() => setOpen(true)}
          >
            {t('logout')}
            <LogOutIcon color='#223367' />
          </Button>
        </WrapButton>
      </WrapNav>
      <Modal onClose={(v: boolean) => setOpen(v)} open={open}>
        <ModelContent>
          <ModelTitle>{t('sureleave')}</ModelTitle>
          <Warn>{t('warningcompanyinfo')}</Warn>
          <ModalWrap>
            <Button
              buttonStyle={{
                color: '#223367',
                bgcolor: 'white',
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
                bgcolor: '#FF5E68',
                weight: 500,
              }}
              onClick={() => {
                setOpen(true);
                localStorage.removeItem('companyId');
                localStorage.removeItem('companyToken');
                history.push('/partner/company');
              }}
            >
              {t('logout')}
              <LogOutIcon />
            </Button>
          </ModalWrap>
        </ModelContent>
      </Modal>
      <Switch>
        <Route exact path={'/info'}>
          <About />
        </Route>
        <Route exact path={`/info/address`}>
          <Address />
        </Route>
        <Route exact path={`/info/photos`}>
          <Photos />
        </Route>
      </Switch>
    </Container>
  );
};

export default Infopage;

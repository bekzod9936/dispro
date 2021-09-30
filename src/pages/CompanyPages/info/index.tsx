import React, { useState } from 'react';
import About from './About';
import Photos from './Photos';
import Address from './Address';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import Title from '../../../components/Custom/Title';
import Modal from '../../../components/Custom/Modal';
import Button from '../../../components/Custom/Button';
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

interface IInfoRoute {
  path: string;
  text: string;
}

const Infopage = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const items: IInfoRoute[] = [
    { path: '/info', text: t('aboutCompany') },
    { path: '/info/address', text: t('address') },
    { path: '/info/photos', text: t('photos') },
  ];

  return (
    <Container>
      <Title>{t('info')}</Title>
      <WrapNav>
        <NavBar list={items} margin='20px 0' />
        <WrapButton>
          <Button
            tcolor='#223367'
            bgcolor='transparent'
            onClick={() => setOpen(true)}
            weight='500'
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
              tcolor='#223367'
              bgcolor='white'
              onClick={() => setOpen(false)}
              margin='0 30px 0 0'
              height='50px'
              fontSize={{ max: 17, min: 14 }}
              weight='500'
            >
              <CloseIcon />
              {t('cancel')}
            </Button>
            <Button
              tcolor='white'
              bgcolor='#FF5E68'
              onClick={() => {
                setOpen(true);
                localStorage.removeItem('companyId');
                localStorage.removeItem('companyToken');
                history.push('/partner/company');
              }}
              minWidth={100}
              minHeight={40}
              maxHeight={50}
              maxWidth={140}
              fontSize={{ max: 17, min: 14 }}
              weight='500'
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

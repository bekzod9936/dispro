import { Suspense, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import Title from 'components/Custom/Title';
import Modal from 'components/Custom/Modal';
import Button from 'components/Custom/Button';
import NavBar from 'components/Custom/NavBar';
import { useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setCompanyInfo } from 'services/redux/Slices/partnerSlice';
import useInfoRoute from './routers';
import Spinner from 'components/Custom/Spinner';
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

const Infopage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const infoPageSlice = useAppSelector((state) => state.infoSlice.addressAdd);
  const [open, setOpen] = useState(false);
  const { menuItems } = useInfoRoute();

  const infoData = useAppSelector((state) => state.info.data);
  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });
  const fill =
    (infoData?.filled && infoData?.filledAddress) ||
    (regFilled?.filled && regFilled?.filledAddress);

  let match = useRouteMatch();

  return (
    <Container
      bgcolor={
        match.path === '/info' || !infoPageSlice ? 'white' : 'transparent'
      }
    >
      <Title>{t('info')}</Title>
      <WrapNav>
        <NavBar list={menuItems} margin='20px 0' />
        {fill ? null : (
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
        )}
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
                dispatch(setCompanyInfo({}));
              }}
            >
              {t('logout')}
              <LogOutIcon />
            </Button>
          </ModalWrap>
        </ModelContent>
      </Modal>
      <Switch>
        <Suspense fallback={<Spinner />}>
          {menuItems.map((item) => {
            return <Route exact path={item.path} component={item.component} />;
          })}
        </Suspense>
      </Switch>
    </Container>
  );
};

export default Infopage;

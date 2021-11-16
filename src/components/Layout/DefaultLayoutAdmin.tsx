import { memo, Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Logo from 'assets/icons/SideBar/logo.png';
import { device } from 'styles/device';
import Header from './Header';
import Spinner from '../Custom/Spinner';
import { useSideBarStyle } from './styles/SideBarStyle';
import MenuList from './MenuList';
import useLayout from './useLayout';
import { useAppSelector } from 'services/redux/hooks';
import { useTranslation } from 'react-i18next';
import {
  Container,
  MenuIcon,
  LogoIcon,
  Content,
  Title,
  DesktopDrawer,
  MobileDrawer,
  MobileHeader,
  WrapperPage,
  WrapLogo,
  WrapMenu,
  Wrarning,
  WranningIcon,
  ButtonIcon,
} from './style';

export interface IDefaultLayout {
  children: any;
}

const DefaultLayoutAdmin: React.FC<IDefaultLayout> = ({ children }) => {
  const { t } = useTranslation();
  const classes = useSideBarStyle();
  const companyId = localStorage.getItem('companyId');
  const { resHeader } = useLayout({ id: companyId });
  const infoData = useAppSelector((state) => state.info.data);

  const [width, setWidth] = useState(window.innerWidth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(width <= 1000 ? false : true);

  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });

  const fill =
    (infoData?.filled && infoData?.filledAddress) ||
    (regFilled?.filled && regFilled?.filledAddress);

  const handleDrawerOpen = () => {
    if (width <= parseInt(device.mobile, 10)) {
      setMobileOpen(!mobileOpen);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      if (window.innerWidth <= parseInt(device.planshet, 10)) {
        setOpen(false);
      } else {
        setMobileOpen(false);
        setOpen(true);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setMobileOpen(open);
  };

  const HeaderList = () => {
    return (
      <>
        <WrapLogo>
          <LogoIcon src={Logo} alt='logo' />
          <Title>DIS-COUNT</Title>
        </WrapLogo>
        <ButtonIcon className='sidebar' onClick={handleDrawerClose}>
          <MenuIcon />
        </ButtonIcon>
      </>
    );
  };

  if (resHeader.isLoading) {
    return <Spinner height='100vh' />;
  }

  return (
    <Container>
      <div className={classes.root}>
        <CssBaseline />
        <MobileDrawer
          anchor='left'
          open={mobileOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          style={{
            pointerEvents: fill ? 'auto' : 'none',
            opacity: fill ? 1 : 0.4,
          }}
        >
          <div
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <MobileHeader>
              <HeaderList />
            </MobileHeader>
            <MenuList />
          </div>
        </MobileDrawer>
        <AppBar
          style={{
            padding: width > 1000 && !fill ? '0 15px' : '0',
          }}
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          {!fill && width < 1000 ? (
            <Wrarning>
              <WranningIcon />
              {t('newcompanywarning')}
            </Wrarning>
          ) : (
            <Toolbar>
              {!fill && width > 1000 ? null : (
                <WrapMenu>
                  <ButtonIcon
                    color='inherit'
                    aria-label='open drawer'
                    onClick={handleDrawerOpen}
                    edge='start'
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open,
                    })}
                  >
                    <MenuIcon />
                  </ButtonIcon>
                </WrapMenu>
              )}
              {fill ? (
                <Header />
              ) : (
                <Wrarning>
                  <WranningIcon />
                  {t('newcompanywarning')}
                </Wrarning>
              )}
            </Toolbar>
          )}
        </AppBar>
        <DesktopDrawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          style={{
            pointerEvents: fill ? 'auto' : 'none',
            opacity: fill ? 1 : 0.4,
          }}
        >
          <div className={classes.toolbar}>
            <HeaderList />
          </div>
          <MenuList />
        </DesktopDrawer>
        <WrapperPage>
          <div className={classes.toolbar} />
          <Suspense fallback={<Spinner />}>
            <Content>{children}</Content>
          </Suspense>
        </WrapperPage>
      </div>
    </Container>
  );
};

export default memo(DefaultLayoutAdmin);

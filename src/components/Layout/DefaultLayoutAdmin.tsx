import { memo, Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../../assets/icons/SideBar/logo.png';
import { device } from '../../styles/device';
import Header from './Header';
import Spinner from '../Custom/Spinner';
import { useSideBarStyle } from './styles/SideBarStyle';
import MenuList from './MenuList';
import Cookies from 'js-cookie';
import useLayout from './useLayout';
import io from 'socket.io-client';
import { SOCKET_EVENT } from 'services/constants/chat';
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
} from './style';
import { setSocket } from 'services/redux/Slices/feedback';
import { useAppDispatch } from 'services/redux/hooks';

export interface IDefaultLayout {
  children: any;
}

const companyToken = localStorage.getItem('companyToken');

const DefaultLayoutAdmin: React.FC<IDefaultLayout> = ({ children }) => {
  const classes = useSideBarStyle();

  const dispatch = useAppDispatch();

  const { resHeader, headerData } = useLayout();

  const [width, setWidth] = useState(window.innerWidth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(width <= 600 ? false : true);

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
    if (
      Cookies.get('companyState') !== 'new' &&
      headerData.filled &&
      headerData.filledAddress
    ) {
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
        console.log(data, 'm');
      });

      socket.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, function (data: any) {
        console.log(data, 'p');
      });
      dispatch(setSocket(socket));
    }
  }, [
    Cookies.get('companyState'),
    headerData.filled,
    headerData.filledAddress,
  ]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      if (window.innerWidth <= parseInt(device.mobile, 10)) {
        setOpen(false);
      } else {
        setMobileOpen(false);
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
        <IconButton onClick={handleDrawerClose}>
          <MenuIcon />
        </IconButton>
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
            pointerEvents:
              Cookies.get('compnayState') === 'new' || !headerData.filled
                ? 'none'
                : 'auto',
            opacity:
              Cookies.get('compnayState') === 'new' || !headerData.filled
                ? 0.4
                : 1,
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
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <WrapMenu>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
            </WrapMenu>
            <Header />
          </Toolbar>
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
            pointerEvents:
              Cookies.get('compnayState') === 'new' ||
              !headerData.filled ||
              !headerData.filledAddress
                ? 'none'
                : 'auto',
            opacity:
              Cookies.get('compnayState') === 'new' ||
              !headerData.filled ||
              !headerData.filledAddress
                ? 0.4
                : 1,
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
